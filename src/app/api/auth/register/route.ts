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

    // ⚠️ 发送欢迎邮件（用户名是邮箱时才发）
    // —— 关键：Serverless/EdgeOne 环境下 response 返回后进程会被立即冷冻，
    //    绝对不能 fire-and-forget（void），否则邮件根本来不及发出。
    //    这里用 Promise.race + 6 秒超时兜底：Resend 一般 300–800ms 返回，
    //    就算网络异常也最多等 6 秒，不会拖垮注册体验；任何错误都被内部吞掉，仍继续成功返回。
    const emailTimeoutMs = 6000;
    try {
      await Promise.race([
        sendWelcomeEmail(user.username),
        new Promise<boolean>((resolve) =>
          setTimeout(() => {
            console.log(
              `[Register] 欢迎邮件发送超过 ${emailTimeoutMs}ms，放弃等待直接返回注册成功（邮件可能仍在后台投递）`,
            );
            resolve(false);
          }, emailTimeoutMs),
        ),
      ]);
    } catch (err) {
      // 最外层理论不会到这里（sendWelcomeEmail 内部已经 catch 完了），但再兜一层更保险
      safeLogError('[Register] 等待欢迎邮件时外层异常（已吞，不影响注册）', err);
    }

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
