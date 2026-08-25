/**
 * 邮件服务（服务端专用，不要在客户端组件/代码中 import）
 *
 * 依赖：resend SDK
 * 环境变量：
 *   - RESEND_API_KEY        Resend API Key（必需）
 *   - RESEND_FROM_EMAIL     发件人地址（选填，默认 onboarding@resend.dev，
 *                           这是 Resend 测试域名，只能发到你自己的 Resend 注册邮箱；
 *                           生产环境请配置已验证的自定义域名，如 no-reply@lihilihi.site）
 *   - RESEND_FROM_NAME      发件人显示名（选填，默认「哄哄模拟器」）
 *
 * 设计原则：
 *   - 所有对外函数**永不抛错**：内部用 try/catch 包到最小粒度，失败只打日志，返回 boolean。
 *   - 不拖慢调用方：注册接口可以选择 fire-and-forget（不 await），用户不等待邮件发送完成才看到注册成功。
 */

import { Resend } from 'resend';
import { safeLogError, sanitizeSecrets } from '@/lib/utils';

let resendClient: Resend | null = null;

function getResend(): Resend | null {
  if (resendClient) return resendClient;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // 未配置时不报错，返回 null，让上层走"跳过邮件"分支
    return null;
  }
  try {
    resendClient = new Resend(apiKey);
  } catch (err) {
    safeLogError('Resend client 初始化失败', err);
    resendClient = null;
  }
  return resendClient;
}

/** 检查字符串是否是邮箱格式（宽松校验，避免误判） */
export function isEmailLike(s: string): boolean {
  if (!s || typeof s !== 'string') return false;
  // 不做极度严格的 RFC 校验，只要有且仅有一个 @，
  // @ 两边都有内容，域名部分有点即可
  const trimmed = s.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return false;
  return true;
}

/** 去除字符串首尾的半角/全角引号、空白、斜引号，避免用户在环境变量里粘贴出格式问题 */
function stripQuotesAndTrim(s: string | undefined | null): string {
  if (!s) return '';
  let out = s.trim();
  // 重复剥离，直到首尾不再是引号类字符
  let prev: string;
  do {
    prev = out;
    out = out.replace(/^[\s"'`'"]+|[\s"'`'"]+$/g, '');
  } while (out !== prev);
  return out;
}

function resolveFromFields(): { fromName: string; fromAddr: string; from: string } {
  const rawName = stripQuotesAndTrim(process.env.RESEND_FROM_NAME);
  const rawAddr = stripQuotesAndTrim(process.env.RESEND_FROM_EMAIL);
  const fromName = rawName || '哄哄模拟器';
  const fromAddr = rawAddr || 'onboarding@resend.dev';
  // RFC 5322: 当 display name 包含非 ASCII 字符（"哄哄模拟器"是中文）时，Resend 会自动处理 MIME encoded-word，
  // 我们这里不需要额外转义，只要保证没有多余引号就行。
  const from = `${fromName} <${fromAddr}>`;
  return { fromName, fromAddr, from };
}

/**
 * 发送"注册成功欢迎邮件"。
 *
 * ⚠️ 重要：Serverless（Vercel / EdgeOne / Netlify Functions）环境下，
 * HTTP 响应返回后进程立刻会被冷冻/销毁，fire-and-forget（不 await）的任务
 * 大概率来不及执行 → 邮件根本不会发。**请调用方务必 await 本函数后再 return 响应！**
 * 为了不阻塞用户体验太久，调用方可用 Promise.race 加一个 6-8 秒的超时兜底。
 *
 * @returns true 表示发送请求成功（不保证对方一定收到，Resend 异步投递），
 *          false 表示被跳过 / 未配置 / 发送失败，都属于"非致命错误"。
 *          本函数**永远不会 throw**。
 */
export async function sendWelcomeEmail(username: string): Promise<boolean> {
  const startTimeMs = Date.now();
  try {
    if (!isEmailLike(username)) {
      // 用户名不是邮箱 → 静默跳过
      return false;
    }

    const email = username.trim();
    const resend = getResend();
    if (!resend) {
      // 没配 RESEND_API_KEY → 静默跳过（本地开发 / 未配置时不骚扰日志）
      // 仍然用 info 级别让管理员可追踪
      console.log('[Email] RESEND_API_KEY 未配置，跳过欢迎邮件发送 →', email);
      return false;
    }

    const { fromName, fromAddr, from } = resolveFromFields();

    const subject = '欢迎来挑战 哄哄模拟器 🎀';
    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif;padding:32px;max-width:560px;margin:0 auto;background:linear-gradient(135deg,#ffeaf4 0%,#f4eeff 100%);border-radius:16px;">
        <div style="font-size:28px;font-weight:700;color:#db2777;margin-bottom:16px;">哄哄模拟器 🎀</div>
        <div style="font-size:16px;line-height:1.75;color:#444;">
          <p style="margin:0 0 12px 0;">亲爱的 <strong style="color:#db2777;">${escapeHtml(email)}</strong> 你好，</p>
          <p style="margin:0 0 12px 0;">欢迎你来挑战 💖</p>
          <p style="margin:0 0 20px 0;">你能 <strong>十轮</strong> 哄好生气的对象吗？</p>
          <div style="background:rgba(255,255,255,0.7);padding:14px 16px;border-radius:10px;color:#6b7280;font-size:14px;">
            💡 小提示：有 2 个加分选项和 4 个坑，别选到奇葩选项哦～
          </div>
        </div>
      </div>
    `.trim();
    const text = `亲爱的 ${email} 你好，欢迎你来挑战，你能十轮哄好生气的对象吗？`;

    console.log(
      `[Email] 开始发送欢迎邮件 → to=${email}  from="${fromName}" <${fromAddr}>`,
    );

    const resp = await resend.emails.send({
      from,
      to: [email],
      subject,
      text,
      html,
    });

    // Resend SDK 返回对象：{ data: { id: string } } 或 { error: {...} }
    if ((resp as { error?: unknown }).error) {
      const elapsed = Date.now() - startTimeMs;
      safeLogError(
        `[Email] Resend 返回错误（${elapsed}ms） → ${email}`,
        sanitizeSecrets((resp as { error: unknown }).error),
      );
      return false;
    }
    const id = (resp as { data?: { id?: string } }).data?.id;
    const elapsed = Date.now() - startTimeMs;
    console.log(
      `[Email] 欢迎邮件已提交 Resend（${elapsed}ms） → ${email}  id=${id || 'unknown'}`,
    );
    return true;
  } catch (err) {
    const elapsed = Date.now() - startTimeMs;
    // 最高级兜底：任何异常都不能向上抛（保证注册不被影响）
    safeLogError(
      `[Email] sendWelcomeEmail 异常（${elapsed}ms，已吞掉，不影响注册）`,
      err,
    );
    return false;
  }
}

/** 检查 Resend 当前是否可用（有 API key + SDK 初始化成功），用于健康检查 */
export function isEmailServiceReady(): {
  configured: boolean;
  fromAddress: string;
  fromName: string;
  fromEmail: string;
} {
  const client = getResend();
  const { fromName, fromAddr, from } = resolveFromFields();
  return {
    configured: client !== null,
    fromAddress: from,
    fromName,
    fromEmail: fromAddr,
  };
}

// 简单 HTML escape，避免用户邮箱注入 HTML 标签
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
