import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/authService';
import { SignJWT } from 'jose';
import { safeLogError, sanitizeSecrets } from '@/lib/utils';
import { sendWelcomeEmail, isEmailLike } from '@/lib/emailService';

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
    const isEmail = isEmailLike(user.username);
    // 🔍 强诊断日志（用 console.error 避免某些平台只采集 stderr）。EdgeOne 搜 REGISTER-EMAIL 必命中。
    console.error(
      `[REGISTER-EMAIL-STEP-1-BRANCH] userId=${user.id} username=${JSON.stringify(
        user.username,
      )} isEmail=${isEmail}`,
    );
    if (isEmail) {
      try {
        console.error(
          `[REGISTER-EMAIL-STEP-2-START] awaiting sendWelcomeEmail + ${emailTimeoutMs}ms timeout ...`,
        );
        type DoneRace = { kind: 'done'; diag: import('@/lib/emailService').SendEmailDiagnosis };
        type TimeoutRace = { kind: 'timeout' };
        const doneBranch: Promise<DoneRace> = (async () => {
          const diag = await sendWelcomeEmail(user.username);
          return { kind: 'done', diag } as DoneRace;
        })();
        const timeoutBranch: Promise<TimeoutRace> = new Promise((resolve) =>
          setTimeout(() => {
            console.error(
              `[REGISTER-EMAIL-STEP-3-TIMEOUT] 超过 ${emailTimeoutMs}ms 未返回，直接继续注册成功（邮件可能仍未发出）`,
            );
            resolve({ kind: 'timeout' });
          }, emailTimeoutMs),
        );
        const raceRes: DoneRace | TimeoutRace = await Promise.race([doneBranch, timeoutBranch]);
        console.error(
          `[REGISTER-EMAIL-STEP-4-RESULT] raceRes=${JSON.stringify(
            raceRes,
            (_k, v) => (typeof v === 'bigint' ? v.toString() : v),
          )}`,
        );
      } catch (err) {
        // 最外层理论不会到这里（sendWelcomeEmail 内部已经 catch 完了），但再兜一层更保险
        safeLogError('[REGISTER-EMAIL-STEP-5-EXCEPTION]（已吞，不影响注册）', err);
      }
    } else {
      console.error(`[REGISTER-EMAIL-STEP-6-SKIP] 用户名不是邮箱，跳过。`);
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
