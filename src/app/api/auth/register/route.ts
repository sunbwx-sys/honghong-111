import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/authService';
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

// 校验 Cloudflare Turnstile 人机验证 token
async function verifyTurnstile(token: string, remoteip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error('[Turnstile] TURNSTILE_SECRET_KEY 未配置');
    return false;
  }
  try {
    const formData = new URLSearchParams();
    formData.append('secret', secret);
    formData.append('response', token);
    if (remoteip) formData.append('remoteip', remoteip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error('[Turnstile] 校验异常:', err);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { username, password, turnstileToken } = await request.json();

    // 人机验证
    if (!turnstileToken) {
      return NextResponse.json({ error: '请先完成人机验证' }, { status: 400 });
    }
    const forwarded = request.headers.get('x-forwarded-for');
    const remoteip = forwarded ? forwarded.split(',')[0] : undefined;
    const ok = await verifyTurnstile(turnstileToken, remoteip);
    if (!ok) {
      return NextResponse.json({ error: '人机验证失败，请重试' }, { status: 400 });
    }

    // 简单校验
    if (!username || !password) {
      return NextResponse.json(
        { error: '用户名和密码不能为空' },
        { status: 400 }
      );
    }
    if (username.length < 3) {
      return NextResponse.json(
        { error: '用户名至少 3 个字符' },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: '密码至少 6 个字符' },
        { status: 400 }
      );
    }

    const user = await registerUser(username, password);
    const token = await generateToken(user.id, user.username);

    return NextResponse.json({
      success: true,
      user: { id: user.id, username: user.username },
      token,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '注册失败';
    console.error('[Register error]', message);
    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}
