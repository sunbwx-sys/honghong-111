module.exports = [
"[project]/src/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$2$2e$6$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tailwind-merge@2.6.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$2$2e$6$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
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
"[project]/src/components/ui/glowing-effect.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GlowingEffect",
    ()=>GlowingEffect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.28.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.28.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$40$13$2e$1$2e$1_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/motion@13.1.1_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/motion/dist/es/react.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$13$2e$1$2e$1_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$template$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@13.1.1_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/framer-motion/dist/es/value/use-motion-template.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$13$2e$1$2e$1_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@13.1.1_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$13$2e$1$2e$1_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/framer-motion@13.1.1_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function GlowingEffect({ blur = 0, inactiveZone = 0.7, proximity = 0, spread = 20, variant = 'default', glow = false, className, disabled = true, movementDuration = 2, borderWidth = 1 }) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [opacityVal, setOpacityVal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const mouseX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$13$2e$1$2e$1_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(-1000);
    const mouseY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$13$2e$1$2e$1_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(-1000);
    const springConfig = {
        stiffness: Math.max(1, 100 - movementDuration * 30),
        damping: 15,
        mass: 0.5
    };
    const springX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$13$2e$1$2e$1_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(mouseX, springConfig);
    const springY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$13$2e$1$2e$1_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(mouseY, springConfig);
    const colorStops = variant === 'white' ? 'white, transparent' : variant === 'pink' ? '#ec4899, #a855f7, #f472b6, #3b82f6, transparent' : '#a78bfa, #ec4899, #a855f7, #3b82f6, transparent';
    const background = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$13$2e$1$2e$1_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$template$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionTemplate"]`radial-gradient(${spread * 5}px at ${springX}px ${springY}px, ${colorStops})`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (glow) {
            setOpacityVal(1);
            return;
        }
        const parent = containerRef.current?.parentElement;
        if (!parent || disabled) return;
        const handleMouseMove = (e)=>{
            const rect = parent.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const isNear = x >= -proximity && x <= rect.width + proximity && y >= -proximity && y <= rect.height + proximity;
            if (isNear) {
                mouseX.set(x);
                mouseY.set(y);
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const distFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
                const maxDist = Math.sqrt(centerX ** 2 + centerY ** 2);
                const ratio = distFromCenter / maxDist;
                setOpacityVal(ratio >= inactiveZone ? 1 : 0);
            } else {
                setOpacityVal(0);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return ()=>window.removeEventListener('mousemove', handleMouseMove);
    }, [
        glow,
        disabled,
        proximity,
        inactiveZone,
        mouseX,
        mouseY
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$motion$40$13$2e$1$2e$1_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
        ref: containerRef,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('pointer-events-none absolute -inset-px rounded-[inherit]', className),
        style: {
            background,
            opacity: opacityVal,
            filter: blur ? `blur(${blur}px)` : undefined,
            WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            WebkitMaskComposite: 'xor',
            mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            maskComposite: 'exclude',
            padding: borderWidth,
            transition: 'opacity 0.3s ease'
        }
    }, void 0, false, {
        fileName: "[project]/src/components/ui/glowing-effect.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_4834305c._.js.map