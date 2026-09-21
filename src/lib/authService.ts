import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { jwtVerify } from 'jose';
import { users as usersTable } from '@/storage/database/shared/schema';
import { safeLogError } from '@/lib/utils';
import { ensureDbReady, describeDatabaseUrl } from '@/storage/database/db';

const SALT_ROUNDS = 10;

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'hong-hong-mock-secret-key-please-change-in-production'
);

export interface SafeUser {
  id: number;
  username: string;
  created_at: string;
}

function toSafeUser(record: { id: number; username: string; password: string; created_at: Date | string }): SafeUser {
  return {
    id: record.id,
    username: record.username,
    created_at: typeof record.created_at === 'string' ? record.created_at : record.created_at.toISOString(),
  };
}

async function getDb() {
  await ensureDbReady();
  const mod = await import('@/storage/database/db');
  return mod.db;
}

function userFriendlyDbError(inner: unknown): Error {
  // DATABASE_URL 空
  if (inner instanceof Error && /DATABASE_URL.*未设置/i.test(inner.message)) {
    return new Error(
      '系统数据库未配置（缺少 DATABASE_URL 环境变量），请先在部署平台后台添加该变量并重新部署后，再使用登录注册功能。',
    );
  }
  // 常见 PostgreSQL 连接错误：DNS 失败、TLS 失败、连接拒绝等
  const code = (inner as any)?.code;
  if (typeof code === 'string') {
    const pgErrors: Record<string, string> = {
      ENOTFOUND: '数据库域名解析失败（ENOTFOUND），请检查 DATABASE_URL 是否写对，以及部署平台是否能联网访问该地址。',
      ETIMEDOUT: '数据库连接超时（ETIMEDOUT），可能网络不通或数据库白名单未放开部署平台出口 IP。',
      ECONNREFUSED: '数据库连接被拒绝（ECONNREFUSED），请确认数据库端口、host 是否正确。',
      ECONNRESET: '数据库连接被重置（ECONNRESET），通常是网络不稳定或 SSL 握手失败。',
      '08P01': 'PostgreSQL 协议错误（08P01），通常是连接串格式/SSL 配置不正确。',
      '28P01': '数据库用户名或密码错误（28P01）。',
      '3D000': '指定的数据库名不存在（3D000）。',
      '42P01': '表不存在（42P01）——请先访问一次 /api/healthcheck 自动建表。',
      '23505': '唯一键冲突（23505）。',
    };
    if (pgErrors[code]) return new Error(pgErrors[code] + `（当前配置：${describeDatabaseUrl()}）`);
  }
  if (inner instanceof Error) return inner;
  return new Error(String(inner));
}

/** 注册新用户 */
export async function registerUser(username: string, password: string): Promise<SafeUser> {
  const db = await getDb();
  try {
    // 检查用户名是否已存在
    const existing = await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.username, username)).limit(1);
    if (existing.length > 0) throw new Error('用户名已被占用');

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const inserted = await db.insert(usersTable).values({ username, password: hashedPassword }).returning();
    if (inserted.length === 0) throw new Error('注册失败，请重试');

    return toSafeUser(inserted[0]);
  } catch (err) {
    safeLogError('authService.registerUser', err);
    throw userFriendlyDbError(err);
  }
}

/** 验证登录 */
export async function verifyUser(username: string, password: string): Promise<SafeUser> {
  const db = await getDb();
  try {
    const found = await db.select().from(usersTable).where(eq(usersTable.username, username)).limit(1);
    if (found.length === 0) throw new Error('用户名或密码错误');

    const user = found[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('用户名或密码错误');

    return toSafeUser(user);
  } catch (err) {
    safeLogError('authService.verifyUser', err);
    throw userFriendlyDbError(err);
  }
}

/** 根据 id 获取用户 */
export async function getUserById(id: number): Promise<SafeUser | null> {
  try {
    const db = await getDb();
    const found = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
    if (found.length === 0) return null;
    return toSafeUser(found[0]);
  } catch (err) {
    safeLogError('authService.getUserById', err);
    // 此函数被 /api/auth/me 频繁调用，DB 不可用时返回 null 让前端显示未登录即可
    return null;
  }
}

/** 从请求的 Authorization header 中提取并验证用户 */
export async function getUserFromToken(request: Request): Promise<SafeUser | null> {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.slice(7);
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = parseInt(payload.sub as string, 10);

    if (!userId) return null;

    return await getUserById(userId);
  } catch {
    return null;
  }
}
