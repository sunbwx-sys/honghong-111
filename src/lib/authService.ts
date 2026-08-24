import bcrypt from 'bcryptjs';
import { db } from '@/storage/database/db';
import { users } from '@/storage/database/shared/schema';
import { eq } from 'drizzle-orm';
import { jwtVerify } from 'jose';

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

/** 注册新用户 */
export async function registerUser(username: string, password: string): Promise<SafeUser> {
  // 检查用户名是否已存在
  const existing = await db.select({ id: users.id }).from(users).where(eq(users.username, username)).limit(1);
  if (existing.length > 0) throw new Error('用户名已被占用');

  // 密码哈希
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // 插入用户
  const inserted = await db.insert(users).values({ username, password: hashedPassword }).returning();
  if (inserted.length === 0) throw new Error('注册失败，请重试');

  return toSafeUser(inserted[0]);
}

/** 验证登录 */
export async function verifyUser(username: string, password: string): Promise<SafeUser> {
  const found = await db.select().from(users).where(eq(users.username, username)).limit(1);
  if (found.length === 0) throw new Error('用户名或密码错误');

  const user = found[0];
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('用户名或密码错误');

  return toSafeUser(user);
}

/** 根据 id 获取用户 */
export async function getUserById(id: number): Promise<SafeUser | null> {
  const found = await db.select().from(users).where(eq(users.id, id)).limit(1);
  if (found.length === 0) return null;
  return toSafeUser(found[0]);
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
