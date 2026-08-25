module.exports = [
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/lib/utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$2$2e$6$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tailwind-merge@2.6.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-rsc] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$2$2e$6$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clsx"])(inputs));
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
"[project]/src/storage/database/shared/schema.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "blogPosts",
    ()=>blogPosts,
    "gameRecords",
    ()=>gameRecords,
    "healthCheck",
    ()=>healthCheck,
    "users",
    ()=>users
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__ = __turbopack_context__.i("[externals]/drizzle-orm/pg-core [external] (drizzle-orm/pg-core, esm_import, [project]/node_modules/.pnpm/drizzle-orm@0.45.1_@types+pg@8.16.0_pg@8.17.2/node_modules/drizzle-orm)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const healthCheck = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["pgTable"])("health_check", {
    id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["serial"])().notNull(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["timestamp"])("updated_at", {
        withTimezone: true,
        mode: 'string'
    }).defaultNow()
});
const blogPosts = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["pgTable"])("blog_posts", {
    id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["serial"])("id").primaryKey(),
    title: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["varchar"])("title", {
        length: 200
    }).notNull(),
    summary: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["varchar"])("summary", {
        length: 500
    }).notNull(),
    content: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["text"])("content").notNull(),
    slug: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["varchar"])("slug", {
        length: 200
    }).notNull().unique(),
    created_at: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["timestamp"])("created_at", {
        withTimezone: true
    }).defaultNow().notNull()
}, (table)=>[
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["index"])("blog_posts_slug_idx").on(table.slug),
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["index"])("blog_posts_created_at_idx").on(table.created_at)
    ]);
const users = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["pgTable"])("users", {
    id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["serial"])("id").primaryKey(),
    username: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["varchar"])("username", {
        length: 50
    }).notNull().unique(),
    password: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["varchar"])("password", {
        length: 255
    }).notNull(),
    created_at: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["timestamp"])("created_at", {
        withTimezone: true
    }).defaultNow().notNull()
}, (table)=>[
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["index"])("users_username_idx").on(table.username)
    ]);
const gameRecords = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["pgTable"])("game_records", {
    id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["serial"])("id").primaryKey(),
    user_id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["serial"])("user_id").notNull(),
    scenario: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["varchar"])("scenario", {
        length: 200
    }).notNull(),
    final_score: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["integer"])("final_score").notNull(),
    result: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["varchar"])("result", {
        length: 20
    }).notNull(),
    played_at: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["timestamp"])("played_at", {
        withTimezone: true
    }).defaultNow().notNull()
}, (table)=>[
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["index"])("game_records_user_id_idx").on(table.user_id),
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$pg$2d$core__$5b$external$5d$__$28$drizzle$2d$orm$2f$pg$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["index"])("game_records_played_at_idx").on(table.played_at)
    ]);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/storage/database/db.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "__poolInternalForTest",
    ()=>_pool,
    "createPool",
    ()=>createPool,
    "db",
    ()=>db,
    "describeDatabaseUrl",
    ()=>describeDatabaseUrl,
    "ensureDbReady",
    ()=>ensureDbReady,
    "getDb",
    ()=>getDb,
    "getLastDbInitError",
    ()=>getLastDbInitError,
    "getPool",
    ()=>getPool
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$node$2d$postgres__$5b$external$5d$__$28$drizzle$2d$orm$2f$node$2d$postgres$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__ = __turbopack_context__.i("[externals]/drizzle-orm/node-postgres [external] (drizzle-orm/node-postgres, esm_import, [project]/node_modules/.pnpm/drizzle-orm@0.45.1_@types+pg@8.16.0_pg@8.17.2/node_modules/drizzle-orm)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pg$40$8$2e$17$2e$2$2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/.pnpm/pg@8.17.2/node_modules/pg)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$dotenv$40$17$2e$2$2e$3$2f$node_modules$2f$dotenv$2f$config$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/dotenv@17.2.3/node_modules/dotenv/config.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/storage/database/shared/schema.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$node$2d$postgres__$5b$external$5d$__$28$drizzle$2d$orm$2f$node$2d$postgres$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pg$40$8$2e$17$2e$2$2f$node_modules$2f$pg$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$node$2d$postgres__$5b$external$5d$__$28$drizzle$2d$orm$2f$node$2d$postgres$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pg$40$8$2e$17$2e$2$2f$node_modules$2f$pg$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
let _pool = null;
let _db = null;
let _initPromise = null;
let _lastInitError = null;
function describeDatabaseUrl() {
    const url = process.env.DATABASE_URL;
    if (!url) return '[未设置]';
    try {
        // 用 URL 解析比正则更安全
        const u = new URL(url);
        // password 可能含特殊字符，但 URL.password 会转码，所以只 mask 掉
        if (u.password) u.password = '***';
        // 如果没有 password（aws rds / neon 等带 ?sslmode= 的形式），保留原样
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sanitizeSecrets"])(u.toString());
    } catch  {
        // 解析失败时走兜底正则脱敏
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sanitizeSecrets"])(url);
    }
}
function createPool() {
    if (_pool) return _pool;
    if (!process.env.DATABASE_URL) {
        const msg = '[DB] ❌ DATABASE_URL 环境变量未配置。' + '请在部署平台（EdgeOne Pages / Vercel）的「环境变量」设置中添加 DATABASE_URL，' + '并重新部署。数据库未连接时，Blog 将使用内置示例文章兜底，排行榜/登录注册功能不可用。';
        console.error(msg);
        _lastInitError = new Error('DATABASE_URL 未设置');
        throw _lastInitError;
    }
    console.log(`[DB] 正在创建连接池，目标：${describeDatabaseUrl()}`);
    try {
        const pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$pg$40$8$2e$17$2e$2$2f$node_modules$2f$pg$29$__["Pool"]({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            },
            max: 5,
            idleTimeoutMillis: 15000,
            connectionTimeoutMillis: 10000
        });
        // 监听底层错误（例如后端连接断掉），统一走安全日志
        pool.on('error', (err)=>{
            // 只看 pg 的 error 常用字段，避免 axios 风格 header 带秘密
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["safeLogError"])('DB Pool error', {
                name: err.name,
                message: err.message,
                code: err.code,
                routine: err.routine
            });
        });
        _pool = pool;
        _lastInitError = null;
        console.log('[DB] ✅ 连接池创建成功（尚未实际连接，首次查询时建立）');
        return pool;
    } catch (err) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["safeLogError"])('createPool', err);
        _lastInitError = err instanceof Error ? err : new Error(String(err));
        throw _lastInitError;
    }
}
function getPool() {
    return _pool ?? createPool();
}
function getDb() {
    if (_db) return _db;
    _db = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm$2f$node$2d$postgres__$5b$external$5d$__$28$drizzle$2d$orm$2f$node$2d$postgres$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["drizzle"])(getPool());
    return _db;
}
const db = new Proxy({}, {
    get (_target, prop) {
        const realDb = getDb();
        return realDb[prop];
    }
});
;
// ---------------------------------------------------------------------------
// 建表 & 初始化种子数据：ensureDbReady()
// ---------------------------------------------------------------------------
const CREATE_TABLES_SQL = [
    `CREATE TABLE IF NOT EXISTS health_check (
    id SERIAL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`,
    `CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    summary VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
    `CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug)`,
    `CREATE INDEX IF NOT EXISTS blog_posts_created_at_idx ON blog_posts(created_at)`,
    `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
    `CREATE INDEX IF NOT EXISTS users_username_idx ON users(username)`,
    `CREATE TABLE IF NOT EXISTS game_records (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    scenario VARCHAR(200) NOT NULL,
    final_score INTEGER NOT NULL,
    result VARCHAR(20) NOT NULL,
    played_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
    `CREATE INDEX IF NOT EXISTS game_records_user_id_idx ON game_records(user_id)`,
    `CREATE INDEX IF NOT EXISTS game_records_played_at_idx ON game_records(played_at)`
];
async function ensureDbReady(force = false) {
    // 非 force 模式下，同一进程只做一次
    if (!force && _initPromise) return _initPromise.then(()=>({
            ok: true,
            migrated: true,
            seeded: 0
        }));
    const doIt = (async ()=>{
        let client = null;
        const report = {
            ok: false,
            migrated: false,
            seeded: 0
        };
        try {
            const pool = createPool();
            // 1) 连通性：SELECT 1
            client = await pool.connect();
            await client.query('SELECT 1 AS ok');
            console.log('[DB] ✅ SELECT 1 连通性检查通过');
            // 2) 建表（CREATE TABLE IF NOT EXISTS）
            for (const sql of CREATE_TABLES_SQL){
                await client.query(sql);
            }
            report.migrated = true;
            console.log('[DB] ✅ 建表检查完成（所有表已存在）');
            // 3) Seed：blog_posts 为空时，写入内置 3 篇示例
            const { rows } = await client.query('SELECT COUNT(*)::integer AS cnt FROM blog_posts');
            const count = Number(rows[0]?.cnt ?? 0);
            if (count === 0) {
                const seedData = await __turbopack_context__.A("[project]/src/data/blogPosts.ts [app-rsc] (ecmascript, async loader)").then((m)=>m.blogPosts);
                console.log(`[DB] blog_posts 表为空，写入 ${seedData.length} 篇内置示例文章`);
                for (const p of seedData){
                    await client.query(`INSERT INTO blog_posts (title, summary, content, slug, created_at)
             VALUES ($1, $2, $3, $4, COALESCE($5::timestamptz, NOW()))
             ON CONFLICT (slug) DO NOTHING`, [
                        p.title,
                        p.summary,
                        p.content,
                        p.slug,
                        p.date
                    ]);
                }
                report.seeded = seedData.length;
                // 写入 health_check 表留个印记
                await client.query('INSERT INTO health_check DEFAULT VALUES');
            } else {
                console.log(`[DB] blog_posts 已有 ${count} 篇文章，跳过 seed`);
            }
            report.ok = true;
            _lastInitError = null;
            console.log('[DB] ✅ ensureDbReady 完成，数据库就绪');
            return report;
        } catch (err) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["safeLogError"])('ensureDbReady', err);
            _lastInitError = err instanceof Error ? err : new Error(String(err));
            report.ok = false;
            report.error = {
                name: err?.name ?? 'Error',
                message: err?.message ?? String(err),
                code: err?.code
            };
            return report;
        } finally{
            if (client) try {
                client.release();
            } catch  {}
        }
    })();
    _initPromise = doIt.then(()=>undefined).catch(()=>undefined);
    return doIt;
}
function getLastDbInitError() {
    return _lastInitError;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/blogService.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "createPost",
    ()=>createPost,
    "getAllPosts",
    ()=>getAllPosts,
    "getPostBySlug",
    ()=>getPostBySlug,
    "slugExists",
    ()=>slugExists
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/storage/database/db.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/storage/database/shared/schema.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm__$5b$external$5d$__$28$drizzle$2d$orm$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__ = __turbopack_context__.i("[externals]/drizzle-orm [external] (drizzle-orm, esm_import, [project]/node_modules/.pnpm/drizzle-orm@0.45.1_@types+pg@8.16.0_pg@8.17.2/node_modules/drizzle-orm)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm__$5b$external$5d$__$28$drizzle$2d$orm$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm__$5b$external$5d$__$28$drizzle$2d$orm$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function recordToPost(record) {
    const wordCount = record.content.length;
    const readTime = Math.max(1, Math.ceil(wordCount / 300));
    const date = record.created_at.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return {
        id: record.id,
        slug: record.slug,
        title: record.title,
        summary: record.summary,
        content: record.content,
        date,
        readTime
    };
}
function builtInToPost(b, idx) {
    return {
        id: idx + 1,
        slug: b.slug,
        title: b.title,
        summary: b.summary,
        content: b.content,
        date: b.date,
        readTime: b.readTime,
        fallback: true
    };
}
async function getAllPosts() {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ensureDbReady"])();
        const rows = await (await __turbopack_context__.A("[project]/src/storage/database/db.ts [app-rsc] (ecmascript, async loader)")).db.select({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"].id,
            title: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"].title,
            summary: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"].summary,
            content: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"].content,
            slug: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"].slug,
            created_at: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"].created_at
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"]).orderBy((0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm__$5b$external$5d$__$28$drizzle$2d$orm$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"].created_at));
        if (rows.length === 0) {
            console.log('[blogService] DB 查询返回 0 篇，使用内置示例文章兜底');
            const builtIn = await __turbopack_context__.A("[project]/src/data/blogPosts.ts [app-rsc] (ecmascript, async loader)").then((m)=>m.blogPosts);
            return builtIn.map(builtInToPost);
        }
        return rows.map(recordToPost);
    } catch (err) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["safeLogError"])('blogService.getAllPosts (DB不可用，降级到内置示例)', err);
        const lastErr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLastDbInitError"])();
        console.log(`[blogService] 使用内置文章兜底。最近 DB 初始化错误：${lastErr ? lastErr.message : '无记录'}`);
        const builtIn = await __turbopack_context__.A("[project]/src/data/blogPosts.ts [app-rsc] (ecmascript, async loader)").then((m)=>m.blogPosts);
        return builtIn.map(builtInToPost);
    }
}
async function getPostBySlug(slug) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ensureDbReady"])();
        const rows = await (await __turbopack_context__.A("[project]/src/storage/database/db.ts [app-rsc] (ecmascript, async loader)")).db.select({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"].id,
            title: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"].title,
            summary: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"].summary,
            content: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"].content,
            slug: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"].slug,
            created_at: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"].created_at
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"]).where((0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm__$5b$external$5d$__$28$drizzle$2d$orm$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"].slug, slug)).limit(1);
        if (rows.length > 0) return recordToPost(rows[0]);
    } catch (err) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["safeLogError"])('blogService.getPostBySlug', err);
    // fallthrough 到内置文章查找
    }
    // DB 查不到（或 DB 不可用）→ 找内置
    const builtIn = await __turbopack_context__.A("[project]/src/data/blogPosts.ts [app-rsc] (ecmascript, async loader)").then((m)=>m.blogPosts);
    const found = builtIn.find((b)=>b.slug === slug);
    if (!found) return null;
    return builtInToPost(found, builtIn.indexOf(found));
}
async function createPost(post) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ensureDbReady"])();
    const { db } = await __turbopack_context__.A("[project]/src/storage/database/db.ts [app-rsc] (ecmascript, async loader)");
    const inserted = await db.insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"]).values(post).returning();
    if (inserted.length === 0) throw new Error('创建文章失败');
    return recordToPost(inserted[0]);
}
async function slugExists(slug) {
    // 先查内置（保证内置 slug 永远被认为存在，避免有人把 golden-30-minutes 之类又写一遍）
    const builtIn = await __turbopack_context__.A("[project]/src/data/blogPosts.ts [app-rsc] (ecmascript, async loader)").then((m)=>m.blogPosts);
    if (builtIn.some((b)=>b.slug === slug)) return true;
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ensureDbReady"])();
        const { db } = await __turbopack_context__.A("[project]/src/storage/database/db.ts [app-rsc] (ecmascript, async loader)");
        const rows = await db.select({
            count: __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm__$5b$external$5d$__$28$drizzle$2d$orm$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["sql"]`count(*)`.as('cnt')
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"]).where((0, __TURBOPACK__imported__module__$5b$externals$5d2f$drizzle$2d$orm__$5b$external$5d$__$28$drizzle$2d$orm$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$1_$40$types$2b$pg$40$8$2e$16$2e$0_pg$40$8$2e$17$2e$2$2f$node_modules$2f$drizzle$2d$orm$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$storage$2f$database$2f$shared$2f$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"].slug, slug)).limit(1);
        return (rows[0]?.count ?? 0) > 0;
    } catch (err) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["safeLogError"])('blogService.slugExists (DB异常，按内置结果返回)', err);
        return builtIn.some((b)=>b.slug === slug);
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/components/ui/glowing-effect.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GlowingEffect",
    ()=>GlowingEffect
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.28.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const GlowingEffect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call GlowingEffect() from the server but GlowingEffect is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/glowing-effect.tsx <module evaluation>", "GlowingEffect");
}),
"[project]/src/components/ui/glowing-effect.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GlowingEffect",
    ()=>GlowingEffect
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.28.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const GlowingEffect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call GlowingEffect() from the server but GlowingEffect is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/glowing-effect.tsx", "GlowingEffect");
}),
"[project]/src/components/ui/glowing-effect.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$glowing$2d$effect$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/glowing-effect.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$glowing$2d$effect$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/ui/glowing-effect.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$glowing$2d$effect$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/blog/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>BlogPage,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.28.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.28.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$468$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.468.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-rsc] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$468$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.468.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/clock.js [app-rsc] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$468$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.468.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/book-open.js [app-rsc] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$468$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.468.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-rsc] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$blogService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/blogService.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$glowing$2d$effect$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/glowing-effect.tsx [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$blogService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$blogService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const revalidate = 60;
async function BlogPage() {
    const posts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$blogService$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllPosts"])();
    const colors = [
        'from-pink-400 to-rose-500',
        'from-purple-400 to-pink-500',
        'from-blue-400 to-purple-500'
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-3xl mx-auto px-4 py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$468$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/src/app/blog/page.tsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this),
                        "返回首页"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/blog/page.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent",
                            children: "💕 恋爱攻略"
                        }, void 0, false, {
                            fileName: "[project]/src/app/blog/page.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500",
                            children: "学点小技巧，让感情更甜蜜"
                        }, void 0, false, {
                            fileName: "[project]/src/app/blog/page.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/blog/page.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this),
                posts.some((p)=>p.fallback) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3 flex items-start gap-3 shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-shrink-0 mt-0.5 text-amber-500",
                            children: "💡"
                        }, void 0, false, {
                            fileName: "[project]/src/app/blog/page.tsx",
                            lineNumber: 39,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-amber-800 leading-relaxed",
                            children: [
                                "当前展示的是内置示例文章（数据库暂未连接或还没有正式内容）。 部署完成后系统会自动把示例写入数据库，之后文章都会从数据库读取。 如果你是网站管理员：",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "list-disc ml-5 mt-1 space-y-0.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                "确认 ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono",
                                                    children: "DATABASE_URL"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/blog/page.tsx",
                                                    lineNumber: 45,
                                                    columnNumber: 24
                                                }, this),
                                                " 已在平台后台配置"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/blog/page.tsx",
                                            lineNumber: 45,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                "访问一下 ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/api/healthcheck",
                                                    className: "underline hover:text-amber-900",
                                                    children: "/api/healthcheck"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/blog/page.tsx",
                                                    lineNumber: 46,
                                                    columnNumber: 26
                                                }, this),
                                                " 查看自动诊断结果"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/blog/page.tsx",
                                            lineNumber: 46,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: "重新构建部署以让配置生效"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/blog/page.tsx",
                                            lineNumber: 47,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/blog/page.tsx",
                                    lineNumber: 44,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/blog/page.tsx",
                            lineNumber: 40,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/blog/page.tsx",
                    lineNumber: 38,
                    columnNumber: 11
                }, this),
                posts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-16 text-gray-400",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$468$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                            className: "w-12 h-12 mx-auto mb-3 opacity-40"
                        }, void 0, false, {
                            fileName: "[project]/src/app/blog/page.tsx",
                            lineNumber: 55,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "暂无攻略，稍后再来看看吧～"
                        }, void 0, false, {
                            fileName: "[project]/src/app/blog/page.tsx",
                            lineNumber: 56,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/blog/page.tsx",
                    lineNumber: 54,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-5",
                    children: posts.map((post, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: `/blog/${post.slug}`,
                            className: "block group",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-pink-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$glowing$2d$effect$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GlowingEffect"], {
                                        spread: 40,
                                        glow: false,
                                        disabled: false,
                                        proximity: 64,
                                        inactiveZone: 0.01,
                                        borderWidth: 3,
                                        variant: "pink"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/blog/page.tsx",
                                        lineNumber: 68,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative flex gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `w-20 h-20 rounded-xl bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center flex-shrink-0 shadow-md`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$468$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                    className: "w-8 h-8 text-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/blog/page.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/blog/page.tsx",
                                                lineNumber: 70,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap items-center gap-2 mb-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                className: "text-lg font-bold text-gray-800 group-hover:text-pink-600 transition-colors",
                                                                children: post.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/blog/page.tsx",
                                                                lineNumber: 79,
                                                                columnNumber: 23
                                                            }, this),
                                                            post.fallback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "inline-flex items-center rounded-full bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 font-medium border border-amber-200",
                                                                children: "示例"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/blog/page.tsx",
                                                                lineNumber: 83,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/blog/page.tsx",
                                                        lineNumber: 78,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-500 text-sm line-clamp-2 mb-3",
                                                        children: post.summary
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/blog/page.tsx",
                                                        lineNumber: 88,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-4 text-xs text-gray-400",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "flex items-center gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$468$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                        className: "w-3 h-3"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/blog/page.tsx",
                                                                        lineNumber: 93,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    post.readTime,
                                                                    " 分钟阅读"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/blog/page.tsx",
                                                                lineNumber: 92,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "bg-pink-50 text-pink-500 px-2 py-0.5 rounded-full",
                                                                children: "恋爱技巧"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/blog/page.tsx",
                                                                lineNumber: 96,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/blog/page.tsx",
                                                        lineNumber: 91,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/blog/page.tsx",
                                                lineNumber: 77,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/blog/page.tsx",
                                        lineNumber: 69,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/blog/page.tsx",
                                lineNumber: 67,
                                columnNumber: 15
                            }, this)
                        }, post.id, false, {
                            fileName: "[project]/src/app/blog/page.tsx",
                            lineNumber: 62,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/blog/page.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-10 text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center gap-2 text-gray-400 text-sm bg-white/50 px-4 py-2 rounded-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$468$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/page.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this),
                            "更多攻略持续更新中…"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/blog/page.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/blog/page.tsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/blog/page.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/blog/page.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/app/blog/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/blog/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5093bb91._.js.map