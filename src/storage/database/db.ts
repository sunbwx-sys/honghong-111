import { drizzle } from 'drizzle-orm/node-postgres';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { Pool, type PoolClient } from 'pg';
import 'dotenv/config';
import { safeLogError, sanitizeSecrets } from '@/lib/utils';
import * as Schema from './shared/schema';

// re-export schema tables 方便外部调用时不需要 import 两份
export { Schema };

let _pool: Pool | null = null;
let _db: PostgresJsDatabase<typeof Schema> | null = null;
let _initPromise: Promise<void> | null = null;
let _lastInitError: Error | null = null;

/**
 * 打印 DATABASE_URL 的友好摘要（不泄漏密码）。
 *   postgresql://user:password@host:port/db  →  postgresql://user:***@host:port/db
 *   未配置 →  "[未设置]"
 */
export function describeDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) return '[未设置]';
  try {
    // 用 URL 解析比正则更安全
    const u = new URL(url);
    // password 可能含特殊字符，但 URL.password 会转码，所以只 mask 掉
    if (u.password) u.password = '***';
    // 如果没有 password（aws rds / neon 等带 ?sslmode= 的形式），保留原样
    return sanitizeSecrets(u.toString());
  } catch {
    // 解析失败时走兜底正则脱敏
    return sanitizeSecrets(url);
  }
}

/**
 * 惰性创建 Pool。
 * 旧版 db.ts 在模块顶层同步抛 `throw new Error('DATABASE_URL 未设置')` ——
 * 这会导致在 Serverless Function 冷启动阶段就直接 500，连 try/catch
 * 和错误日志都走不到，排障非常痛苦。
 *
 * 现在改成：在第一次调用 getPool() / getDb() 时才真正创建，失败时写入
 * 结构化日志（含完整 err.code / err.message），方便在 EdgeOne / Vercel 的
 * 日志面板里一眼看出是「未配置 env」「DNS 解析失败」「TLS 握手失败」
 * 「pg_hba 拒绝」「max_connections 用尽」等具体原因。
 */
export function createPool(): Pool {
  if (_pool) return _pool;

  if (!process.env.DATABASE_URL) {
    const msg =
      '[DB] ❌ DATABASE_URL 环境变量未配置。' +
      '请在部署平台（EdgeOne Pages / Vercel）的「环境变量」设置中添加 DATABASE_URL，' +
      '并重新部署。数据库未连接时，Blog 将使用内置示例文章兜底，排行榜/登录注册功能不可用。';
    console.error(msg);
    _lastInitError = new Error('DATABASE_URL 未设置');
    throw _lastInitError;
  }

  console.log(
    `[DB] 正在创建连接池，目标：${describeDatabaseUrl()}`,
  );

  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 5, // Serverless 环境下不要贪大，5 够用了
      idleTimeoutMillis: 15000,
      connectionTimeoutMillis: 10000,
    });

    // 监听底层错误（例如后端连接断掉），统一走安全日志
    pool.on('error', (err) => {
      // 只看 pg 的 error 常用字段，避免 axios 风格 header 带秘密
      safeLogError('DB Pool error', {
        name: err.name,
        message: err.message,
        code: (err as any).code,
        routine: (err as any).routine,
      });
    });

    _pool = pool;
    _lastInitError = null;
    console.log('[DB] ✅ 连接池创建成功（尚未实际连接，首次查询时建立）');
    return pool;
  } catch (err) {
    safeLogError('createPool', err);
    _lastInitError = err instanceof Error ? err : new Error(String(err));
    throw _lastInitError;
  }
}

export function getPool(): Pool {
  return _pool ?? createPool();
}

export function getDb(): PostgresJsDatabase<typeof Schema> {
  if (_db) return _db;
  _db = drizzle(getPool());
  return _db;
}

/** 导出默认 db，兼容现有代码 `import { db } from '@/storage/database/db'` 的用法。 */
export const db = new Proxy<PostgresJsDatabase<typeof Schema>>({} as any, {
  get(_target, prop) {
    const realDb = getDb();
    return (realDb as any)[prop];
  },
});

export { _pool as __poolInternalForTest };

// ---------------------------------------------------------------------------
// 建表 & 初始化种子数据：ensureDbReady()
// ---------------------------------------------------------------------------

const CREATE_TABLES_SQL = [
  `CREATE TABLE IF NOT EXISTS health_check (
    id SERIAL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    summary VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug)`,
  `CREATE INDEX IF NOT EXISTS blog_posts_created_at_idx ON blog_posts(created_at)`,
  `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS users_username_idx ON users(username)`,
  `CREATE TABLE IF NOT EXISTS game_records (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    scenario VARCHAR(200) NOT NULL,
    final_score INTEGER NOT NULL,
    result VARCHAR(20) NOT NULL,
    played_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS game_records_user_id_idx ON game_records(user_id)`,
  `CREATE INDEX IF NOT EXISTS game_records_played_at_idx ON game_records(played_at)`,
];

export interface DbReadyReport {
  ok: boolean;
  migrated: boolean;
  seeded: number; // 本次新写入了多少条 seed blog
  error?: { name: string; message: string; code?: string };
}

/**
 * 在应用启动或 /api/healthcheck 被调用时跑一次：
 *   1. SELECT 1 验证连通性
 *   2. 执行 CREATE TABLE IF NOT EXISTS 保证表存在（不需要用户手动跑 migrate）
 *   3. 如果 blog_posts 表为空，写入内置 3 篇示例文章（src/data/blogPosts.ts）
 *
 * 幂等：调用多次也不会重复创建/重复插入。
 */
export async function ensureDbReady(force = false): Promise<DbReadyReport> {
  // 非 force 模式下，同一进程只做一次
  if (!force && _initPromise) return _initPromise.then(() => ({ ok: true, migrated: true, seeded: 0 }));

  const doIt = (async () => {
    let client: PoolClient | null = null;
    const report: DbReadyReport = { ok: false, migrated: false, seeded: 0 };

    try {
      const pool = createPool();

      // 1) 连通性：SELECT 1
      client = await pool.connect();
      await client.query('SELECT 1 AS ok');
      console.log('[DB] ✅ SELECT 1 连通性检查通过');

      // 2) 建表（CREATE TABLE IF NOT EXISTS）
      for (const sql of CREATE_TABLES_SQL) {
        await client.query(sql);
      }
      report.migrated = true;
      console.log('[DB] ✅ 建表检查完成（所有表已存在）');

      // 3) Seed：blog_posts 为空时，写入内置 3 篇示例
      const { rows } = await client.query('SELECT COUNT(*)::integer AS cnt FROM blog_posts');
      const count = Number(rows[0]?.cnt ?? 0);
      if (count === 0) {
        const seedData = await import('@/data/blogPosts').then((m) => m.blogPosts);
        console.log(`[DB] blog_posts 表为空，写入 ${seedData.length} 篇内置示例文章`);
        for (const p of seedData) {
          await client.query(
            `INSERT INTO blog_posts (title, summary, content, slug, created_at)
             VALUES ($1, $2, $3, $4, COALESCE($5::timestamptz, NOW()))
             ON CONFLICT (slug) DO NOTHING`,
            [p.title, p.summary, p.content, p.slug, p.date],
          );
        }
        report.seeded = seedData.length;
        // 写入 health_check 表留个印记
        await client.query('INSERT INTO health_check DEFAULT VALUES');
      } else {
        console.log(`[DB] blog_posts 已有 ${count} 篇文章，跳过 seed`);
      }

      report.ok = true;
      _lastInitError = null;
      console.log('[DB] ✅ ensureDbReady 完成，数据库就绪');
      return report;
    } catch (err) {
      safeLogError('ensureDbReady', err);
      _lastInitError = err instanceof Error ? err : new Error(String(err));
      report.ok = false;
      report.error = {
        name: (err as any)?.name ?? 'Error',
        message: (err as any)?.message ?? String(err),
        code: (err as any)?.code,
      };
      return report;
    } finally {
      if (client) try { client.release(); } catch { /* ignore */ }
    }
  })();

  _initPromise = doIt.then(() => undefined).catch(() => undefined);
  return doIt;
}

/** 最近一次初始化错误，供 API 兜底时用。 */
export function getLastDbInitError(): Error | null {
  return _lastInitError;
}
