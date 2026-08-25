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
"[project]/src/types/game.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// 性别
__turbopack_context__.s([
    "INITIAL_AFFECTION",
    ()=>INITIAL_AFFECTION,
    "MAX_AFFECTION",
    ()=>MAX_AFFECTION,
    "MAX_ROUNDS",
    ()=>MAX_ROUNDS,
    "MIN_AFFECTION",
    ()=>MIN_AFFECTION,
    "SCENARIO_POOL",
    ()=>SCENARIO_POOL,
    "VOICE_CONFIG",
    ()=>VOICE_CONFIG,
    "WIN_AFFECTION",
    ()=>WIN_AFFECTION,
    "getRandomScenarios",
    ()=>getRandomScenarios
]);
const INITIAL_AFFECTION = 20;
const MAX_AFFECTION = 100;
const MIN_AFFECTION = -50;
const WIN_AFFECTION = 80;
const MAX_ROUNDS = 10;
const VOICE_CONFIG = {
    'gentle-female': {
        speaker: 'zh_female_xiaohe_uranus_bigtts',
        label: '温柔女声',
        gender: 'female'
    },
    'cool-female': {
        speaker: 'zh_female_vv_uranus_bigtts',
        label: '霸道御姐',
        gender: 'female'
    },
    'cute-female': {
        speaker: 'saturn_zh_female_keainvsheng_tob',
        label: '可爱软妹',
        gender: 'female'
    },
    'deep-male': {
        speaker: 'zh_male_m191_uranus_bigtts',
        label: '低沉男声',
        gender: 'male'
    },
    'gentle-male': {
        speaker: 'zh_male_taocheng_uranus_bigtts',
        label: '温柔男声',
        gender: 'male'
    }
};
const SCENARIO_POOL = [
    {
        id: 'anniversary',
        title: '忘记纪念日',
        description: '今天是你们在一起三周年，你完全忘了...'
    },
    {
        id: 'late-night',
        title: '深夜不回消息',
        description: '你昨晚打游戏到凌晨三点，对方发了十几条消息你都没回...'
    },
    {
        id: 'flirty-chat',
        title: '被发现和异性聊天',
        description: '对方看到你和异性朋友的暧昧聊天记录...'
    },
    {
        id: 'lost-cat',
        title: '把对方的猫弄丢了',
        description: '你帮对方照顾猫的时候，猫跑丢了...'
    },
    {
        id: 'public-joke',
        title: '当众让对方没面子',
        description: '你在朋友聚会上开了一个过分的玩笑...'
    },
    {
        id: 'forgot-birthday',
        title: '忘了对方生日',
        description: '对方盼了好久的生日，你居然连一句生日快乐都没说...'
    },
    {
        id: 'stood-up',
        title: '约会放鸽子',
        description: '你答应了一起吃饭结果临时爽约，对方等了两个小时...'
    },
    {
        id: 'phone-game',
        title: '约会一直玩手机',
        description: '好不容易出来约会，你全程低头打游戏不理对方...'
    },
    {
        id: 'lying',
        title: '被发现撒谎',
        description: '你说在加班其实在跟朋友喝酒，被对方撞见了...'
    },
    {
        id: 'forgot-promise',
        title: '答应的事没做到',
        description: '你说过要陪对方去看演唱会结果忘了买票...'
    },
    {
        id: 'ex-comparison',
        title: '拿对方和前任比',
        description: '你不小心说了"我以前对象就不会这样"...'
    },
    {
        id: 'gift-mess',
        title: '送了个糟糕的礼物',
        description: '情人节你送了对方一个非常敷衍的礼物...'
    }
];
function getRandomScenarios(n = 3) {
    const shuffled = [
        ...SCENARIO_POOL
    ].sort(()=>Math.random() - 0.5);
    return shuffled.slice(0, n);
}
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
"[project]/src/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$game$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/game.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-route] (ecmascript)");
;
;
;
const runtime = 'nodejs';
const maxDuration = 30; // Vercel Serverless Function 最大执行时长，EdgeOne 会忽略此字段
// ⚠️ 降级默认回复，网络错误时使用
function getFallbackResponse(affection, step, isGameOver, won) {
    if (isGameOver) {
        if (won) {
            return {
                partnerMessage: '（脸微微泛红）好吧...这次就原谅你了。但你要保证下次不许再这样了！',
                options: []
            };
        }
        return {
            partnerMessage: '我不想再跟你说了，我们都冷静一下吧...',
            options: []
        };
    }
    const defaultOptions = [
        {
            id: '1',
            content: '对不起，我知道错了',
            score: 10
        },
        {
            id: '2',
            content: '我给你买你最喜欢吃的蛋糕好不好',
            score: 15
        },
        {
            id: '3',
            content: '哎呀不就是这点小事吗',
            score: -15
        },
        {
            id: '4',
            content: '你能不能别这么无理取闹',
            score: -25
        },
        {
            id: '5',
            content: '我错了还不行吗（敷衍）',
            score: -10
        },
        {
            id: '6',
            content: '这不是很正常的事吗',
            score: -20
        }
    ];
    if (affection < 0) {
        return {
            partnerMessage: '（冷笑）你还知道来找我？我以为你根本不在乎呢。',
            options: defaultOptions
        };
    }
    if (affection < 30) {
        return {
            partnerMessage: '哼，我现在不想跟你说话，你自己好好想想吧。',
            options: defaultOptions
        };
    }
    if (affection < 60) {
        return {
            partnerMessage: '（撇了撇嘴）你说的是真的吗？我才不信呢...',
            options: defaultOptions
        };
    }
    return {
        partnerMessage: '（小声）唔...那你下次不许再这样了哦...',
        options: defaultOptions
    };
}
function getEmotionDescription(affection) {
    if (affection < 0) return '非常生气，冷暴力或激烈质问的语气';
    if (affection < 30) return '还在生气，但愿意听对方说话的语气';
    if (affection < 60) return '开始软化，嘴上生气但语气缓和';
    if (affection < 80) return '快被哄好了，可能撒娇或小声说"哼"';
    return '已经原谅了，但还要对方保证不再犯';
}
function getPartnerNoun(gender) {
    return gender === 'female' ? '女朋友' : '男朋友';
}
function getPartnerPronoun(gender) {
    return gender === 'female' ? '她' : '他';
}
async function POST(request) {
    try {
        const body = await request.json();
        const { gender, scenario, messages, affection, step, isGameOver, won } = body;
        // ⚠️ 环境变量预检 —— 若缺配置写 server 日志，直接走降级，不用再抛 SDK 错误
        const envReady = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["assertCozeEnv"])('POST /api/chat');
        // ⚠️ 动态 import coze SDK，避免在模块加载阶段（平台运行时不兼容）抛异常
        // 导致外层 try/catch 捕获不到、直接返回平台层 500 纯文本错误
        const { LLMClient, Config, HeaderUtils } = await __turbopack_context__.A("[externals]/coze-coding-dev-sdk [external] (coze-coding-dev-sdk, esm_import, [project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk, async loader)");
        const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
        const config = new Config({
            timeout: 30000
        });
        const client = new LLMClient(config, customHeaders);
        const partnerNoun = getPartnerNoun(gender);
        const partnerPronoun = getPartnerPronoun(gender);
        const emotion = getEmotionDescription(affection);
        // ⚠️ 关键实现要点：对话历史必须包含所有消息
        const chatHistory = messages.map((msg)=>({
                role: msg.role === 'partner' ? 'assistant' : 'user',
                content: msg.content
            }));
        let systemPrompt = '';
        if (isGameOver) {
            // 游戏结束时的回复
            if (won) {
                systemPrompt = `你是一个正在被哄好的${partnerNoun}。
场景：${scenario}
当前状态：你已经被对方哄好了，心情转晴，但还有点小傲娇。
请用${emotion}的语气，说一句甜蜜又有点小傲娇的结束对白。
不要加任何解释或说明，只输出对白内容。
长度：20-40字。`;
            } else {
                systemPrompt = `你是一个非常失望的${partnerNoun}。
场景：${scenario}
当前状态：对方没能哄好你，你非常失望和难过，决定结束这段对话。
请用${emotion}的语气，说一句绝情又带着悲伤的结束对白。
不要加任何解释或说明，只输出对白内容。
长度：20-40字。`;
            }
            const response = await client.invoke([
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: '请回复：'
                }
            ], {
                temperature: 0.9,
                model: 'doubao-seed-2-0-lite-260215'
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                partnerMessage: response.content.trim(),
                options: []
            });
        }
        // 游戏进行中的回复
        systemPrompt = `你是一个正在生气的${partnerNoun}。
场景：${scenario}
当前好感度：${affection}（范围-50到100，初始20，80以上算被哄好）
当前情绪：${emotion}
当前轮次：第 ${step} 轮 / 共 ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$game$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAX_ROUNDS"]} 轮

你的任务：
1. 根据当前情绪回复对方的话，回复要符合${partnerPronoun}的身份和情绪状态
2. 回复长度控制在30-80字之间
3. 可以用括号加入少量动作/表情描述，如（撇过头）（眼眶微红）等
4. 每次回复后，生成6个玩家可以选择的回应选项

6个选项的要求（非常重要）：
- 2个加分选项（+5到+20分）：真诚道歉、具体弥补方案、提起共同回忆等
- 4个减分选项（-5到-30分）：
  - 1-2个普通减分：敷衍、转移话题、找借口
  - 2-3个奇葩搞笑选项：离谱到好笑的程度，比如"要不你也气我一次扯平"这种
- 选项顺序要随机打乱
- 不要在选项中标注哪个是加分哪个是减分
- 每个选项要简短，15字以内

请严格按照以下JSON格式输出，不要有任何其他内容：
{
  "partnerMessage": "你的回复内容",
  "options": [
    {"id": "1", "content": "选项内容1", "score": 10},
    {"id": "2", "content": "选项内容2", "score": -15},
    ...共6个选项
  ]
}

注意：
- 对话要连贯，和之前的内容衔接
- 不要重复之前出现过的话题或选项
- 语气要自然，像真实情侣吵架后的对话
- 奇葩选项要真的很好笑，让人想分享给朋友`;
        const messagesForLLM = [
            {
                role: 'system',
                content: systemPrompt
            },
            ...chatHistory
        ];
        // 确保至少有一条 user 消息
        if (chatHistory.length === 0 || chatHistory[chatHistory.length - 1].role !== 'user') {
            messagesForLLM.push({
                role: 'user',
                content: step === 1 ? '（对方刚开口，等待你的第一反应）' : '...'
            });
        }
        const response = await client.invoke(messagesForLLM, {
            temperature: 1.0,
            model: 'doubao-seed-2-0-lite-260215'
        });
        // 解析 JSON 响应
        let result;
        try {
            // 尝试从响应中提取 JSON
            const jsonMatch = response.content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                result = {
                    partnerMessage: parsed.partnerMessage || '',
                    options: Array.isArray(parsed.options) ? parsed.options.slice(0, 6) : []
                };
            } else {
                throw new Error('No JSON found');
            }
            // 验证选项数量
            if (result.options.length < 6) {
                throw new Error('Not enough options');
            }
        } catch (parseError) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeLogError"])('POST /api/chat (parse LLM)', parseError);
            console.error('[POST /api/chat] Raw response preview:', (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeSecrets"])(response.content));
            result = getFallbackResponse(affection, step, isGameOver, won);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
    } catch (error) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeLogError"])('POST /api/chat', error);
        // 降级返回默认值
        const fallback = getFallbackResponse(50, 1, false, false);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$28$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(fallback);
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4c8e587b._.js.map