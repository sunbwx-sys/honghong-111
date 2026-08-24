import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 清理文本中的括号/动作描述/特殊标点，只保留要说的话（用于 TTS 前预处理） */
export function cleanTextForSpeech(text: string): string {
  return text
    .replace(/（[^）]*）/g, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/[「」『』]/g, '')
    .trim();
}

/** 格式化游戏时间：输出 2024/08/22 形式（精简列表用） */
export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

/** 格式化游戏时间：输出 08/22 14:30 形式（详细记录用） */
export function formatDateFull(dateStr: string): string {
  return new Date(dateStr).toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * 对字符串做敏感信息脱敏：
 *   - Authorization: Bearer xxxx → Authorization: Bearer ***（mask 掉 jwt/base64/长 hex key）
 *   - 独立出现的长 base64/hex/JWT → 只保留前后缀
 *   - "apiKey": "xxx" / "password": "xxx" 等字段 → 值打码
 *   - 长随机字符串（≥ 32 字符且由 base64/hex/JWT 字符组成）→ 脱敏
 *
 * 用于把 error / response 对象转字符串输出到日志前先做一层清洗，
 * 避免 coze SDK 的 axios error 中 config.headers.Authorization 等
 * 敏感内容被原样写进平台函数日志（EdgeOne 日志面板 / Vercel Logs）。
 */
const SECRET_FIELD_NAMES = new Set([
  'authorization',
  'auth',
  'api-key',
  'apikey',
  'api_key',
  'x-api-key',
  'x-auth-token',
  'x-coze-token',
  'token',
  'secret',
  'password',
  'passwd',
  'pwd',
  'cookie',
  'set-cookie',
  'jwt',
  'database_url',
  'connectionstring',
  'connection_string',
]);

// 匹配 jwt：三段 base64url 用 . 连接
const JWT_RE = /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g;
// 匹配 Bearer <token> / Basic <token> 等带前缀的凭证
const BEARER_RE = /\b(Bearer|Basic|Token)\s+[A-Za-z0-9._\-+/=]{16,}/gi;
// 匹配像 MkFwSXl...== 这种 base64 长串（典型 api key），长度 ≥ 40
const LONG_B64_RE = /[A-Za-z0-9+/]{40,}={0,2}/g;
// 匹配 URL 里的 user:pass@host 或 query 含 token/password/secret=xxx
const SECRET_QUERY_RE = /([?&](?:token|secret|password|passwd|pwd|apikey|api_key|authorization|auth|jwt)=)([^&]+)/gi;
// 匹配形如 "Authorization":"Bearer xxx" / "apiKey":"xxx" 的 JSON 片段
const SECRET_JSON_FIELD_RE = new RegExp(
  `(["'](?:${Array.from(SECRET_FIELD_NAMES).join('|')})["']\\s*:\\s*["'])([^"'\\\\]*(?:\\\\.[^"'\\\\]*)*)(["'])`,
  'gi',
);
// 匹配形如 key=VALUE 且 key 是敏感名字的 kv
const SECRET_KV_RE = /\b(apiKey|api_key|apikey|token|secret|password|passwd|pwd|authorization|auth|jwt)\s*[:=]\s*("[^"]*"|'[^']*'|\S+)/gi;

export function sanitizeSecrets(input: unknown): string {
  if (input === null || input === undefined) return String(input);
  if (typeof input !== 'string') {
    try {
      // 先 JSON.stringify（安全的），再对字符串做正则脱敏
      return sanitizeSecrets(
        JSON.stringify(input, (_k, v) => {
          // 对 Buffer/Uint8Array 避免展开成大对象
          if (v && typeof v === 'object' && v.type === 'Buffer') return '[Buffer]';
          return v;
        }, 2)
      );
    } catch {
      return String(input);
    }
  }

  let s = input;
  s = s.replace(JWT_RE, '[JWT ***]');
  s = s.replace(BEARER_RE, (_m, scheme) => `${scheme} ***`);
  s = s.replace(LONG_B64_RE, (m) => {
    // 如果看起来像普通英文单词就跳过（但 base64 不会含空格，且长度 ≥40 基本不是单词）
    return m.length <= 4 ? m : `${m.slice(0, 3)}***${m.slice(-3)}`;
  });
  s = s.replace(SECRET_QUERY_RE, (_m, prefix) => `${prefix}***`);
  s = s.replace(SECRET_JSON_FIELD_RE, (_m, k, _v, end) => `${k}***${end}`);
  s = s.replace(SECRET_KV_RE, (_m, k) => `${k}=***`);
  return s;
}

/**
 * 安全地记录服务端错误日志。
 *
 * - 统一前缀 `[${caller}] ❌`，在 EdgeOne / Vercel 日志面板里一搜就找到
 * - 输出结构化字段：name / message / statusCode / code / cause / stack 摘要
 * - 所有字段在打印前都过 sanitizeSecrets 脱敏，保证没有任何 key/token 被写进日志
 *
 * ⚠️ 这是函数日志（server-side），不会返回到前端。
 */
export function safeLogError(callerName: string, err: unknown): void {
  const e = err as Error & {
    statusCode?: number;
    code?: string | number;
    cause?: unknown;
    response?: unknown;
  };

  const messageParts: string[] = [];
  messageParts.push(`[${callerName}] ❌ ${e?.name ?? 'Error'}: ${e?.message ?? String(err)}`);
  if (typeof e?.statusCode === 'number') messageParts.push(`  statusCode=${e.statusCode}`);
  if (e?.code !== undefined && e.code !== null) messageParts.push(`  code=${String(e.code)}`);
  if (e?.cause) messageParts.push(`  cause=${sanitizeSecrets(e.cause)}`);
  if (e?.response) messageParts.push(`  response=${sanitizeSecrets(e.response)}`);
  if (e?.stack) {
    // 只取 stack 前 5 行，避免日志太长
    const lines = e.stack.split('\n').slice(0, 5).join('\n');
    messageParts.push(`  stack=${sanitizeSecrets(lines)}`);
  }
  // 兜底：如果 message 本身里可能含有敏感内容，也再脱敏一次
  const finalLine = sanitizeSecrets(messageParts.join('\n'));
  console.error(finalLine);
}

/**
 * ⚠️ 检查 coze-coding-dev-sdk 所需的环境变量是否配置。
 *
 * 本地开发（pnpm run dev）时 Next.js 会自动加载 .env.local，所以没问题。
 * 但部署到 EdgeOne / Vercel 等平台时，必须在平台的「环境变量」设置里手动添加：
 *   - COZE_WORKLOAD_IDENTITY_API_KEY
 *   - COZE_INTEGRATION_BASE_URL
 *   - COZE_INTEGRATION_MODEL_BASE_URL
 *
 * 若未配置，SDK 会抛 "API key is required"，被我们的 try/catch 吞掉
 * 后直接走 fallback，表现为「每句回复都是默认台词、永远不调 AI」。
 *
 * 此函数在每次 handler 里调用一次，把缺失情况写入 server 日志，
 * 便于用户到 EdgeOne Pages / Vercel 的函数日志中排查。
 *
 * @returns true = 所有必需变量都已配置，可以放心调 SDK
 */
export function assertCozeEnv(callerName: string): boolean {
  const required: Array<keyof NodeJS.ProcessEnv> = [
    'COZE_WORKLOAD_IDENTITY_API_KEY',
    'COZE_INTEGRATION_BASE_URL',
    'COZE_INTEGRATION_MODEL_BASE_URL',
  ];

  const missing = required.filter((k) => !process.env[k]);
  if (missing.length === 0) return true;

  console.error(
    `[${callerName}] ⚠️ 缺少 coze SDK 必需的环境变量：${missing.join(', ')}。` +
      '请在部署平台（EdgeOne Pages / Vercel）的「环境变量」设置中添加以上变量，' +
      '否则 AI 功能会持续走默认回复的降级逻辑。',
  );
  return false;
}
