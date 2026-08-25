module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assertCozeEnv",
    ()=>assertCozeEnv,
    "cleanTextForSpeech",
    ()=>cleanTextForSpeech,
    "cn",
    ()=>cn,
    "formatDateFull",
    ()=>formatDateFull,
    "formatDateShort",
    ()=>formatDateShort,
    "safeLogError",
    ()=>safeLogError,
    "sanitizeSecrets",
    ()=>sanitizeSecrets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$2$2e$6$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tailwind-merge@2.6.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-route] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$2$2e$6$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function cleanTextForSpeech(text) {
    return text.replace(/（[^）]*）/g, '').replace(/\([^)]*\)/g, '').replace(/\[[^\]]*\]/g, '').replace(/[「」『』]/g, '').trim();
}
function formatDateShort(dateStr) {
    const d = new Date(dateStr);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}
function formatDateFull(dateStr) {
    return new Date(dateStr).toLocaleString('zh-CN', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
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
 */ const SECRET_FIELD_NAMES = new Set([
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
    'connection_string'
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
const SECRET_JSON_FIELD_RE = new RegExp(`(["'](?:${Array.from(SECRET_FIELD_NAMES).join('|')})["']\\s*:\\s*["'])([^"'\\\\]*(?:\\\\.[^"'\\\\]*)*)(["'])`, 'gi');
// 匹配形如 key=VALUE 且 key 是敏感名字的 kv
const SECRET_KV_RE = /\b(apiKey|api_key|apikey|token|secret|password|passwd|pwd|authorization|auth|jwt)\s*[:=]\s*("[^"]*"|'[^']*'|\S+)/gi;
function sanitizeSecrets(input) {
    if (input === null || input === undefined) return String(input);
    if (typeof input !== 'string') {
        try {
            // 先 JSON.stringify（安全的），再对字符串做正则脱敏
            return sanitizeSecrets(JSON.stringify(input, (_k, v)=>{
                // 对 Buffer/Uint8Array 避免展开成大对象
                if (v && typeof v === 'object' && v.type === 'Buffer') return '[Buffer]';
                return v;
            }, 2));
        } catch  {
            return String(input);
        }
    }
    let s = input;
    s = s.replace(JWT_RE, '[JWT ***]');
    s = s.replace(BEARER_RE, (_m, scheme)=>`${scheme} ***`);
    s = s.replace(LONG_B64_RE, (m)=>{
        // 如果看起来像普通英文单词就跳过（但 base64 不会含空格，且长度 ≥40 基本不是单词）
        return m.length <= 4 ? m : `${m.slice(0, 3)}***${m.slice(-3)}`;
    });
    s = s.replace(SECRET_QUERY_RE, (_m, prefix)=>`${prefix}***`);
    s = s.replace(SECRET_JSON_FIELD_RE, (_m, k, _v, end)=>`${k}***${end}`);
    s = s.replace(SECRET_KV_RE, (_m, k)=>`${k}=***`);
    return s;
}
function safeLogError(callerName, err) {
    const e = err;
    const messageParts = [];
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
function assertCozeEnv(callerName) {
    const required = [
        'COZE_WORKLOAD_IDENTITY_API_KEY',
        'COZE_INTEGRATION_BASE_URL',
        'COZE_INTEGRATION_MODEL_BASE_URL'
    ];
    const missing = required.filter((k)=>!process.env[k]);
    if (missing.length === 0) return true;
    console.error(`[${callerName}] ⚠️ 缺少 coze SDK 必需的环境变量：${missing.join(', ')}。` + '请在部署平台（EdgeOne Pages / Vercel）的「环境变量」设置中添加以上变量，' + '否则 AI 功能会持续走默认回复的降级逻辑。');
    return false;
}
}),
"[project]/src/app/api/tts/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "maxDuration",
    ()=>maxDuration,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.28.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-route] (ecmascript)");
;
;
const runtime = 'nodejs';
const maxDuration = 15; // Vercel Serverless Function 最大执行时长，EdgeOne 会忽略此字段
async function POST(request) {
    try {
        const body = await request.json();
        const { text, speaker, uid } = body;
        if (!text || !speaker || !uid) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Missing required parameters: text, speaker, uid'
            }, {
                status: 400
            });
        }
        const cleanText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cleanTextForSpeech"])(text);
        if (!cleanText) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Text is empty after cleaning'
            }, {
                status: 400
            });
        }
        // ⚠️ 环境变量预检（写入 server 日志）
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["assertCozeEnv"])('POST /api/tts');
        // ⚠️ 动态 import coze SDK，避免模块加载阶段抛异常导致平台层返回 500
        const { TTSClient, Config, HeaderUtils } = await __turbopack_context__.A("[externals]/coze-coding-dev-sdk [external] (coze-coding-dev-sdk, esm_import, [project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk, async loader)");
        const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
        const config = new Config({
            timeout: 15000
        });
        const client = new TTSClient(config, customHeaders);
        const response = await client.synthesize({
            uid,
            text: cleanText,
            speaker,
            audioFormat: 'mp3'
        });
        const result = {
            audioUri: response.audioUri,
            audioSize: response.audioSize
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
    } catch (error) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeLogError"])('POST /api/tts', error);
        // ⚠️ 语音生成失败不影响游戏，返回空结果
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'TTS generation failed',
            audioUri: '',
            audioSize: 0
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5cc5b165._.js.map