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
  type SendEmailDiagnosis,
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
  let diag: SendEmailDiagnosis | null = null;
  let err: unknown = null;
  const t0 = performance.now();
  try {
    diag = await sendWelcomeEmail(to);
  } catch (caught) {
    err = caught;
  }
  const elapsed = performance.now() - t0;

  push('SEND_RESULT', {
    diagnosis: diag,
    wrapperElapsedMs: Math.round(elapsed),
    wrapperCaught: err ? sanitizeSecrets(err) : null,
  });

  const ok = diag?.ok === true;

  // 根据 Resend 错误类型给出中文修复建议
  let hint = '';
  const reErr = diag?.resendError;
  if (!ok) {
    if (diag?.skippedReason) {
      hint = `skippedReason=${diag.skippedReason}，未发起 Resend 请求。`;
    } else if (reErr) {
      const msg = (reErr.message || '').toLowerCase();
      if (/domain.*not.*verified|verified.*domain|must be from a verified/.test(msg)) {
        hint = '🔴 Resend 报错：发件域名未验证。请登录 Resend → Domains → lihilihi.site → 按提示添加 3 条 TXT/MX/CNAME DNS 记录到 Cloudflare/DNSPod，直到页面显示 VERIFIED。未验证域名前只能发到你注册 Resend 时使用的那个邮箱，其他邮箱一律被拒。';
      } else if (/invalid.*from|from.*address|from_address|sender.*identity/.test(msg)) {
        hint = '🔴 Resend 报错：from 字段格式非法。检查 RESEND_FROM_EMAIL 是否是合法邮箱格式，以及域名是否已验证，不允许使用 gmail.com/qq.com/outlook.com 等公共邮箱做 from。';
      } else if (/unauthorized|401|api.*key|invalid.*key/.test(msg) || reErr.statusCode === 401) {
        hint = '🔴 Resend 报错：API Key 非法/过期。到 Resend → API Keys 重新生成一个 key，更新到 EdgeOne 环境变量 RESEND_API_KEY，重新部署。';
      } else if (/quota|rate.*limit|429|daily.*limit|exceeded/.test(msg) || reErr.statusCode === 429) {
        hint = '🟡 Resend 报错：限流 / 免费额度用完。Resend 免费计划每天 100 封，升级付费或等次日。';
      } else if (/forbidden|403|account.*suspended/.test(msg) || reErr.statusCode === 403) {
        hint = '🔴 Resend 报错：账号被封或 API Key 无权限（403）。到 Resend 后台看 Notifications。';
      } else {
        hint = `🟠 Resend 返回具体错误（下方有完整 JSON）：name=${reErr.name || '-'} code=${reErr.code || '-'} statusCode=${reErr.statusCode || '-'} message=${reErr.message || '-'}`;
      }
    } else if (diag?.exception) {
      hint = '🔴 sendWelcomeEmail 内部发生异常（理论不该），看 exception 字段堆栈。';
    }
  }

  return NextResponse.json({
    ok,
    summary: ok
      ? '✅ Resend 已接受发送请求。若收件箱没收到：1) 去垃圾邮件箱找（标题：欢迎来挑战 哄哄模拟器 🎀，发件人：哄哄模拟器 <Bowen@lihilihi.site>）2) 打开 https://resend.com/emails 查看这封邮件的 Delivery Status（是否 bounced / rejected / delivered）3) 若 bouned 且显示"Domain lihilihi.site not verified"→ 去 Resend Domains 验证 DNS 记录。'
      : '❌ 邮件未成功发送。重点看下方 diagnosis.resendError.name/message/statusCode/code 具体字段，或下面的中文 hint 修复建议。',
    hint,
    steps,
  });
}
