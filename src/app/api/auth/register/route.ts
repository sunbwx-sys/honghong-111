import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/authService';
import { SignJWT } from 'jose';
import { safeLogError, sanitizeSecrets } from '@/lib/utils';
import { sendWelcomeEmail } from '@/lib/emailService';

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
    // 用 sanitizeSecrets 确保不会把 formData 的 secret 打出来
    console.error('[Turnstile] 校验异常:', sanitizeSecrets(err));
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

    // ⚠️ 发欢迎邮件（仅当用户名是邮箱时才发送）
    // —— 关键安全策略：fire-and-forget（不 await），邮件发送失败绝对不影响注册
    //    且 sendWelcomeEmail 内部已经 try/catch 吸收了所有异常，双保险
    void (async () => {
      try {
        await sendWelcomeEmail(user.username);
      } catch (err) {
        // 第三层兜底：理论上永远不会进入这里（sendWelcomeEmail 自己就全 catch 了）
        safeLogError('[Register] 欢迎邮件异步流程异常（已吞）', err);
      }
    })();

    return NextResponse.json({
      success: true,
      user: { id: user.id, username: user.username },
      token,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '注册失败';
    safeLogError('POST /api/auth/register', error);
    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}
