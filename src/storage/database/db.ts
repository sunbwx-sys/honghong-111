import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres, { type Sql } from 'postgres';
import 'dotenv/config';
import { safeLogError, sanitizeSecrets } from '@/lib/utils';
import * as Schema from './shared/schema';

// re-export schema tables 方便外部调用时不需要 import 两份
export { Schema };

let _client: Sql | null = null;
let _db: PostgresJsDatabase<typeof Schema> | null = null;
let _initPromise: Promise<void> | null = null;
let _lastInitError: Error | null = null;

/**
 * 打印 DATABASE_URL 的友好摘要（不泄漏密码）。
 */
export function describeDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) return '[未设置]';
  try {
    const u = new URL(url);
    if (u.password) u.password = '***';
    return sanitizeSecrets(u.toString());
  } catch {
    return sanitizeSecrets(url);
  }
}

/**
 * 创建 postgres.js 客户端（纯 JS，零 native 依赖）。
 *
 * 使用 `postgres` 包（作者 porsager，最新 v3）的原因：
 *   之前用的 `pg` 包在 EdgeOne Pages（腾讯云 Turbopack 构建）上会被声明成
 *   hash 名的 external 模块（如 `pg-fcd9a938146891af` /
 *   `drizzle-orm-9cc018771e89c319/node-postgres`），
 *   运行时在 Node 20 环境里找不到这些 hash 包 → 直接 ERR_MODULE_NOT_FOUND → 500。
 *
 *   postgres 包是纯 JavaScript 实现（没有任何 native 扩展 / 可选依赖），
 *   用 Node.js 自带的 net/tls 完成 TCP 通信，彻底绕开这类 hash 命名问题。
 */
export function createClient(): Sql {
  if (_client) return _client;

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
    `[DB] 正在创建 postgres.js 客户端（纯 JS），目标：${describeDatabaseUrl()}`,
  );

  try {
    // postgres.js 的 ssl 默认是 'prefer'，对 Neon/Supabase/Railway 等托管 PG
    // 需要强制 'require'，对本地开发（localhost）会自动降级为不加密。
    // 这里用一个简单的启发式判断：URL 含 localhost/127.0.1/本地私有网段时不强制 SSL。
    const url = process.env.DATABASE_URL;
    const hostMatch = url.match(/@([^:/?]+)/);
    const host = hostMatch ? hostMatch[1] : '';
    const isLocalHost = /^(localhost|127\.0\.0\.1|10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[01])\.)/.test(host);
    const ssl = isLocalHost ? 'prefer' : 'require';

    const client = postgres(url, {
      ssl,
      max: 5,
      idle_timeout: 15,
      connect_timeout: 10,
      // postgres.js 默认使用 UTC 时区，兼容 drizzle-orm
      transform: {
        undefined: null,
      },
    });

    _client = client;
    _lastInitError = null;
    console.log(`[DB] ✅ postgres.js 客户端创建成功（ssl=${ssl}，host=${host}）`);
    return client;
  } catch (err) {
    safeLogError('createClient (postgres.js)', err);
    _lastInitError = err instanceof Error ? err : new Error(String(err));
    throw _lastInitError;
  }
}

export function getClient(): Sql {
  return _client ?? createClient();
}

export function getDb(): PostgresJsDatabase<typeof Schema> {
  if (_db) return _db;
  _db = drizzle(getClient(), { schema: Schema });
  return _db;
}

/** 导出默认 db，兼容现有代码 `import { db } from '@/storage/database/db'` 的用法。 */
export const db = new Proxy<PostgresJsDatabase<typeof Schema>>({} as any, {
  get(_target, prop) {
    const realDb = getDb();
    return (realDb as any)[prop];
  },
});

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
  seeded: number;
  error?: { name: string; message: string; code?: string };
}

/**
 * 在应用启动或 /api/healthcheck 被调用时跑一次：
 *   1. SELECT 1 验证连通性
 *   2. 执行 CREATE TABLE IF NOT EXISTS 保证表存在
 *   3. 如果 blog_posts 表为空，写入内置 3 篇示例文章
 *
 * 幂等：调用多次也不会重复创建/重复插入。
 */
export async function ensureDbReady(force = false): Promise<DbReadyReport> {
  if (!force && _initPromise) {
    // 上一次初始化仍在进行：等待它；上一次已结束则直接返回"已就绪"
    try {
      await _initPromise;
    } catch {
      // 上一次初始化失败，让下面的逻辑重新跑
    }
    if (_lastInitError) {
      // 上一次初始化失败，强制重跑
    } else {
      return { ok: true, migrated: true, seeded: 0 };
    }
  }

  const doIt = (async () => {
    const report: DbReadyReport = { ok: false, migrated: false, seeded: 0 };
    try {
      const client = createClient();

      // 1) 连通性：SELECT 1
      const rows = (await client`SELECT 1 AS ok`) as { ok: unknown }[];
      console.log('[DB] ✅ SELECT 1 连通性检查通过');
      if (!rows.length || rows[0].ok === undefined) {
        throw new Error('SELECT 1 没有返回值');
      }

      // 2) 建表（CREATE TABLE IF NOT EXISTS）
      for (const sql of CREATE_TABLES_SQL) {
        await client.unsafe(sql);
      }
      report.migrated = true;
      console.log('[DB] ✅ 建表检查完成（所有表已存在）');

      // 3) Seed：blog_posts 为空时，写入内置 3 篇示例
      const countRows = (await client`SELECT COUNT(*)::integer AS cnt FROM blog_posts`) as { cnt: number }[];
      const count = Number(countRows[0]?.cnt ?? 0);
      if (count === 0) {
        const seedData = await import('@/data/blogPosts').then((m) => m.blogPosts);
        console.log(`[DB] blog_posts 表为空，写入 ${seedData.length} 篇内置示例文章`);
        for (const p of seedData) {
          const dateValue: string | null = p.date ?? null;
          await client`
            INSERT INTO blog_posts (title, summary, content, slug, created_at)
            VALUES (${p.title}, ${p.summary}, ${p.content}, ${p.slug},
                    COALESCE(${dateValue}::timestamptz, NOW()))
            ON CONFLICT (slug) DO NOTHING
          `;
        }
        report.seeded = seedData.length;
        await client`INSERT INTO health_check DEFAULT VALUES`;
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
    }
  })();

  _initPromise = doIt.then(() => undefined).catch(() => undefined);
  return doIt;
}

export function getLastDbInitError(): Error | null {
  return _lastInitError;
}
