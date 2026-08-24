import { NextResponse } from 'next/server';
import { verifyUser } from '@/lib/authService';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'hong-hong-mock-secret-key-please-change-in-production'
);

async function generateToken(userId: number, username: string): Promise<string> {
  return await new SignJWT({ sub: userId.toString(), username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: '用户名和密码不能为空' },
        { status: 400 }
      );
    }

    const user = await verifyUser(username, password);
    const token = await generateToken(user.id, user.username);

    return NextResponse.json({
      success: true,
      user: { id: user.id, username: user.username },
      token,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '登录失败';
    console.error('[Login error]', message);
    return NextResponse.json(
      { error: message },
      { status: 401 }
    );
  }
}
