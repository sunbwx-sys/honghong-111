/**
 * 欢迎邮件调试接口
 *
 * GET /api/debug/welcome-email?to=<邮箱>
 *
 * 用途：不经过注册/Turnstile，直接测试 Resend 邮件链路。
 *       返回值里会包含所有调试信息（isEmail、SDK 初始化状态、from 字段、
 *       Resend 原始响应、耗时、捕获到的任何异常堆栈）。
 *
 * 安全性：
 *   - 本接口不能被滥用为"邮件炸弹"：限制收件人必须和请求触发者有某种关系？
 *     简化做法：上线后可以注释掉/删除，目前先保留用于排障。
 */

import { NextResponse } from 'next/server';
import {
  sendWelcomeEmail,
  isEmailLike,
  isEmailServiceReady,
} from '@/lib/emailService';
import { sanitizeSecrets } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const to = (searchParams.get('to') || '').trim();

  const steps: Array<{ t: string; m: unknown }> = [];
  const push = (label: string, msg: unknown) =>
    steps.push({ t: new Date().toISOString(), m: msg });

  push('START', { to, length: to.length });

  const ready = isEmailServiceReady();
  push('SERVICE_READY', ready);

  if (!to) {
    return NextResponse.json(
      {
        ok: false,
        error: '缺少 to 参数。用法：GET /api/debug/welcome-email?to=your@email.com',
        steps,
      },
      { status: 400 },
    );
  }

  const isEmail = isEmailLike(to);
  push('IS_EMAIL_LIKE', { to, isEmail });
  if (!isEmail) {
    return NextResponse.json(
      {
        ok: false,
        error: 'to 不是合法邮箱格式',
        steps,
      },
      { status: 400 },
    );
  }

  // 实际调用 sendWelcomeEmail，并捕获它"理论上已经 catch"的任何东西
  let result = false;
  let err: unknown = null;
  const t0 = performance.now();
  try {
    result = await sendWelcomeEmail(to);
  } catch (caught) {
    err = caught;
  }
  const elapsed = performance.now() - t0;

  push('SEND_RESULT', {
    result,
    elapsedMs: Math.round(elapsed),
    caught: err ? sanitizeSecrets(err) : null,
  });

  return NextResponse.json({
    ok: result,
    summary: result
      ? '✅ Resend 已接受发送请求。若收件箱没收到：1) 去垃圾邮件箱找 2) 确认 Resend 后台 Domains 已验证 lihilihi.site 3) 去 Resend 后台 Emails 页面看这封邮件的 Delivery status'
      : '❌ 邮件未成功发送，看 steps 里哪一步报错。重点看 SEND_RESULT 中的 caught / 或 EdgeOne 函数日志中 [Email] 前缀的行。',
    steps,
  });
}
