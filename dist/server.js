"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/lib/utils.ts
var utils_exports = {};
__export(utils_exports, {
  assertCozeEnv: () => assertCozeEnv,
  cleanTextForSpeech: () => cleanTextForSpeech,
  cn: () => cn,
  formatDateFull: () => formatDateFull,
  formatDateShort: () => formatDateShort,
  safeLogError: () => safeLogError,
  sanitizeSecrets: () => sanitizeSecrets
});
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}
function cleanTextForSpeech(text2) {
  return text2.replace(/（[^）]*）/g, "").replace(/\([^)]*\)/g, "").replace(/\[[^\]]*\]/g, "").replace(/[「」『』]/g, "").trim();
}
function formatDateShort(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}
function formatDateFull(dateStr) {
  return new Date(dateStr).toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function sanitizeSecrets(input) {
  if (input === null || input === void 0) return String(input);
  if (typeof input !== "string") {
    try {
      return sanitizeSecrets(
        JSON.stringify(input, (_k, v) => {
          if (v && typeof v === "object" && v.type === "Buffer") return "[Buffer]";
          return v;
        }, 2)
      );
    } catch {
      return String(input);
    }
  }
  let s = input;
  s = s.replace(JWT_RE, "[JWT ***]");
  s = s.replace(BEARER_RE, (_m, scheme) => `${scheme} ***`);
  s = s.replace(LONG_B64_RE, (m) => {
    return m.length <= 4 ? m : `${m.slice(0, 3)}***${m.slice(-3)}`;
  });
  s = s.replace(SECRET_QUERY_RE, (_m, prefix) => `${prefix}***`);
  s = s.replace(SECRET_JSON_FIELD_RE, (_m, k, _v, end) => `${k}***${end}`);
  s = s.replace(SECRET_KV_RE, (_m, k) => `${k}=***`);
  return s;
}
function safeLogError(callerName, err) {
  const e = err;
  const messageParts = [];
  messageParts.push(`[${callerName}] \u274C ${e?.name ?? "Error"}: ${e?.message ?? String(err)}`);
  if (typeof e?.statusCode === "number") messageParts.push(`  statusCode=${e.statusCode}`);
  if (e?.code !== void 0 && e.code !== null) messageParts.push(`  code=${String(e.code)}`);
  if (e?.cause) messageParts.push(`  cause=${sanitizeSecrets(e.cause)}`);
  if (e?.response) messageParts.push(`  response=${sanitizeSecrets(e.response)}`);
  if (e?.stack) {
    const lines = e.stack.split("\n").slice(0, 5).join("\n");
    messageParts.push(`  stack=${sanitizeSecrets(lines)}`);
  }
  const finalLine = sanitizeSecrets(messageParts.join("\n"));
  console.error(finalLine);
}
function assertCozeEnv(callerName) {
  const required = [
    "COZE_WORKLOAD_IDENTITY_API_KEY",
    "COZE_INTEGRATION_BASE_URL",
    "COZE_INTEGRATION_MODEL_BASE_URL"
  ];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length === 0) return true;
  console.error(
    `[${callerName}] \u26A0\uFE0F \u7F3A\u5C11 coze SDK \u5FC5\u9700\u7684\u73AF\u5883\u53D8\u91CF\uFF1A${missing.join(", ")}\u3002\u8BF7\u5728\u90E8\u7F72\u5E73\u53F0\uFF08EdgeOne Pages / Vercel\uFF09\u7684\u300C\u73AF\u5883\u53D8\u91CF\u300D\u8BBE\u7F6E\u4E2D\u6DFB\u52A0\u4EE5\u4E0A\u53D8\u91CF\uFF0C\u5426\u5219 AI \u529F\u80FD\u4F1A\u6301\u7EED\u8D70\u9ED8\u8BA4\u56DE\u590D\u7684\u964D\u7EA7\u903B\u8F91\u3002`
  );
  return false;
}
var import_clsx, import_tailwind_merge, SECRET_FIELD_NAMES, JWT_RE, BEARER_RE, LONG_B64_RE, SECRET_QUERY_RE, SECRET_JSON_FIELD_RE, SECRET_KV_RE;
var init_utils = __esm({
  "src/lib/utils.ts"() {
    "use strict";
    import_clsx = require("clsx");
    import_tailwind_merge = require("tailwind-merge");
    SECRET_FIELD_NAMES = /* @__PURE__ */ new Set([
      "authorization",
      "auth",
      "api-key",
      "apikey",
      "api_key",
      "x-api-key",
      "x-auth-token",
      "x-coze-token",
      "token",
      "secret",
      "password",
      "passwd",
      "pwd",
      "cookie",
      "set-cookie",
      "jwt",
      "database_url",
      "connectionstring",
      "connection_string"
    ]);
    JWT_RE = /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g;
    BEARER_RE = /\b(Bearer|Basic|Token)\s+[A-Za-z0-9._\-+/=]{16,}/gi;
    LONG_B64_RE = /[A-Za-z0-9+/]{40,}={0,2}/g;
    SECRET_QUERY_RE = /([?&](?:token|secret|password|passwd|pwd|apikey|api_key|authorization|auth|jwt)=)([^&]+)/gi;
    SECRET_JSON_FIELD_RE = new RegExp(
      `(["'](?:${Array.from(SECRET_FIELD_NAMES).join("|")})["']\\s*:\\s*["'])([^"'\\\\]*(?:\\\\.[^"'\\\\]*)*)(["'])`,
      "gi"
    );
    SECRET_KV_RE = /\b(apiKey|api_key|apikey|token|secret|password|passwd|pwd|authorization|auth|jwt)\s*[:=]\s*("[^"]*"|'[^']*'|\S+)/gi;
  }
});

// src/storage/database/shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  blogPosts: () => blogPosts,
  gameRecords: () => gameRecords,
  healthCheck: () => healthCheck,
  users: () => users
});
var import_pg_core, healthCheck, blogPosts, users, gameRecords;
var init_schema = __esm({
  "src/storage/database/shared/schema.ts"() {
    "use strict";
    import_pg_core = require("drizzle-orm/pg-core");
    healthCheck = (0, import_pg_core.pgTable)("health_check", {
      id: (0, import_pg_core.serial)().notNull(),
      updatedAt: (0, import_pg_core.timestamp)("updated_at", { withTimezone: true, mode: "string" }).defaultNow()
    });
    blogPosts = (0, import_pg_core.pgTable)(
      "blog_posts",
      {
        id: (0, import_pg_core.serial)("id").primaryKey(),
        title: (0, import_pg_core.varchar)("title", { length: 200 }).notNull(),
        summary: (0, import_pg_core.varchar)("summary", { length: 500 }).notNull(),
        content: (0, import_pg_core.text)("content").notNull(),
        slug: (0, import_pg_core.varchar)("slug", { length: 200 }).notNull().unique(),
        created_at: (0, import_pg_core.timestamp)("created_at", { withTimezone: true }).defaultNow().notNull()
      },
      (table) => [
        (0, import_pg_core.index)("blog_posts_slug_idx").on(table.slug),
        (0, import_pg_core.index)("blog_posts_created_at_idx").on(table.created_at)
      ]
    );
    users = (0, import_pg_core.pgTable)(
      "users",
      {
        id: (0, import_pg_core.serial)("id").primaryKey(),
        username: (0, import_pg_core.varchar)("username", { length: 50 }).notNull().unique(),
        password: (0, import_pg_core.varchar)("password", { length: 255 }).notNull(),
        created_at: (0, import_pg_core.timestamp)("created_at", { withTimezone: true }).defaultNow().notNull()
      },
      (table) => [
        (0, import_pg_core.index)("users_username_idx").on(table.username)
      ]
    );
    gameRecords = (0, import_pg_core.pgTable)(
      "game_records",
      {
        id: (0, import_pg_core.serial)("id").primaryKey(),
        user_id: (0, import_pg_core.serial)("user_id").notNull(),
        scenario: (0, import_pg_core.varchar)("scenario", { length: 200 }).notNull(),
        final_score: (0, import_pg_core.integer)("final_score").notNull(),
        result: (0, import_pg_core.varchar)("result", { length: 20 }).notNull(),
        // 'win' | 'lose'
        played_at: (0, import_pg_core.timestamp)("played_at", { withTimezone: true }).defaultNow().notNull()
      },
      (table) => [
        (0, import_pg_core.index)("game_records_user_id_idx").on(table.user_id),
        (0, import_pg_core.index)("game_records_played_at_idx").on(table.played_at)
      ]
    );
  }
});

// src/data/blogPosts.ts
var blogPosts_exports = {};
__export(blogPosts_exports, {
  blogPosts: () => blogPosts2,
  getAllPosts: () => getAllPosts,
  getPostBySlug: () => getPostBySlug
});
function getPostBySlug(slug) {
  return blogPosts2.find((post) => post.slug === slug);
}
function getAllPosts() {
  return blogPosts2;
}
var blogPosts2;
var init_blogPosts = __esm({
  "src/data/blogPosts.ts"() {
    "use strict";
    blogPosts2 = [
      {
        slug: "golden-30-minutes",
        title: "\u5435\u67B6\u4E4B\u540E\u7684\u9EC4\u91D1 30 \u5206\u949F",
        summary: "\u5435\u67B6\u4E86\u600E\u4E48\u529E\uFF1F\u522B\u6025\u7740\u9053\u6B49\u4E5F\u522B\u6025\u7740\u51B7\u6218\uFF0C\u5148\u641E\u61C2\u8FD9 30 \u5206\u949F\u91CC\u5BF9\u65B9\u8111\u5B50\u91CC\u5728\u60F3\u4EC0\u4E48\u2026\u2026",
        readTime: 4,
        date: "2025-01-15",
        content: `\u5435\u67B6\u521A\u7ED3\u675F\u7684\u90A3 30 \u5206\u949F\uFF0C\u582A\u79F0\u604B\u7231\u5173\u7CFB\u91CC\u6700\u5371\u9669\u7684"\u96F7\u533A\u65F6\u6BB5"\u3002

\u4F60\u4EE5\u4E3A\u5435\u5B8C\u5C31\u5B8C\u4E8B\u4E86\uFF1F\u5927\u9519\u7279\u9519\u3002\u771F\u6B63\u51B3\u5B9A\u8FD9\u573A\u5435\u67B6\u662F"\u8D8A\u5435\u8D8A\u4EB2"\u8FD8\u662F"\u611F\u60C5\u88C2\u75D5"\u7684\uFF0C\u6070\u6070\u662F\u8FD9\u534A\u5C0F\u65F6\u3002

\u5148\u8BF4\u7537\u751F\u7248\u96F7\u533A\uFF1A\u5435\u5B8C\u4F60\u89C9\u5F97"\u597D\u4E86\uFF0C\u8BB2\u6E05\u695A\u4E86\uFF0C\u7FFB\u7BC7\u4E86"\uFF0C\u5F80\u6C99\u53D1\u4E0A\u4E00\u762B\u5F00\u59CB\u5237\u624B\u673A\u3002\u800C\u5979\u5462\uFF1F\u5750\u5728\u90A3\u8D8A\u60F3\u8D8A\u6C14\uFF1A\u4ED6\u5C45\u7136\u8FD9\u4E48\u5FEB\u5C31\u6CA1\u4E8B\u4E86\uFF1F\u4ED6\u6839\u672C\u4E0D\u5728\u4E4E\uFF01\u4ED6\u751A\u81F3\u6CA1\u6709\u96BE\u8FC7\uFF01

\u518D\u8BF4\u5973\u751F\u7248\u96F7\u533A\uFF1A\u5435\u5B8C\u4F60\u5F00\u542F"\u51B7\u6218\u6A21\u5F0F"\uFF0C\u4ED6\u8FC7\u6765\u54C4\u4F60\u4F60\u5C31\u7529\u4E00\u53E5"\u522B\u78B0\u6211"\u3002\u7B49\u4ED6\u771F\u7684\u4E0D\u78B0\u4E86\uFF0C\u4F60\u53C8\u5F00\u59CB\u8111\u8865\uFF1A\u770B\u5427\uFF0C\u6211\u5C31\u8BF4\u4ED6\u4E0D\u7231\u6211\uFF01

\u6240\u4EE5\u8FD9 30 \u5206\u949F\u5230\u5E95\u8BE5\u5E72\u561B\uFF1F

\u7B2C\u4E00\uFF0C\u522B\u6D88\u5931\u3002\u54EA\u6015\u4F60\u5C31\u5750\u5728\u65C1\u8FB9\u4EC0\u4E48\u90FD\u4E0D\u8BF4\uFF0C\u4E5F\u6BD4"\u6211\u53BB\u51B7\u9759\u4E00\u4E0B"\u5F3A\u3002\u7269\u7406\u4E0A\u7684\u5728\u573A\uFF0C\u5BF9\u60C5\u7EEA\u4E2D\u7684\u4EBA\u6765\u8BF4\u662F\u4E00\u79CD"\u6211\u8FD8\u5728"\u7684\u627F\u8BFA\u3002

\u7B2C\u4E8C\uFF0C\u522B\u7FFB\u65E7\u8D26\u3002\u7FFB\u65E7\u8D26 = \u706B\u4E0A\u6D47\u6CB9\u3002\u4F60\u7FFB\u4E00\u6B21\uFF0C\u5BF9\u65B9\u5C31\u5728\u5FC3\u91CC\u7ED9\u4F60\u8BB0\u4E00\u6B21\u3002

\u7B2C\u4E09\uFF0C\u7ED9\u4E2A\u53F0\u9636\u3002\u4E00\u676F\u6E29\u6C34\u3001\u4E00\u5F20\u7EB8\u5DFE\u3001\u4E00\u4E2A\u8F7B\u8F7B\u7684\u89E6\u78B0\u2026\u2026\u8FD9\u4E9B\u5C0F\u52A8\u4F5C\u6BD4\u957F\u7BC7\u5927\u8BBA\u6709\u7528 100 \u500D\u3002

\u7B2C\u56DB\uFF0C\u522B\u8BB2\u9053\u7406\u3002\u60C5\u7EEA\u8FD8\u5728\u7684\u65F6\u5019\uFF0C\u9053\u7406\u662F\u8FDB\u4E0D\u53BB\u7684\u3002\u5148\u5904\u7406\u60C5\u7EEA\uFF0C\u518D\u5904\u7406\u4E8B\u60C5\u3002\u987A\u5E8F\u641E\u53CD\u4E86\uFF0C\u4F60\u8BF4\u518D\u591A\u90FD\u662F\u706B\u4E0A\u6D47\u6CB9\u3002

\u8BB0\u4F4F\uFF1A30 \u5206\u949F\u4E4B\u5185\uFF0C\u60C5\u7EEA\u8FD8\u5728\u9AD8\u4F4D\u3002\u8FD9\u4E2A\u65F6\u5019\u62FC\u7684\u4E0D\u662F\u9053\u7406\uFF0C\u662F\u6001\u5EA6\u3002\u6001\u5EA6\u5230\u4F4D\u4E86\uFF0C\u540E\u9762\u4EC0\u4E48\u90FD\u597D\u8BF4\u3002\u6001\u5EA6\u4E0D\u5230\u4F4D\uFF0C\u540E\u9762\u7684\u6BCF\u4E00\u53E5"\u6211\u9519\u4E86"\u90FD\u4F1A\u53D8\u6210"\u6211\u9519\u4E86\u884C\u4E86\u5427"\u3002`
      },
      {
        slug: "you-are-right",
        title: "\u4E3A\u4EC0\u4E48\u300C\u4F60\u8BF4\u5F97\u5BF9\u300D\u662F\u6700\u70C2\u7684\u56DE\u590D",
        summary: '\u4E09\u4E2A\u5B57\uFF0C\u80FD\u628A\u672C\u6765\u5FEB\u597D\u7684\u5929\u804A\u5D29\u3002\u5B83\u5230\u5E95\u6709\u4EC0\u4E48\u9B54\u529B\uFF1F\u8BA9\u6211\u4EEC\u4E00\u8D77\u62C6\u89E3\u8FD9\u53E5"\u6577\u884D\u4E4B\u738B"\u3002',
        readTime: 3,
        date: "2025-01-12",
        content: `"\u4F60\u8BF4\u5F97\u5BF9\u3002"

\u542C\u5230\u8FD9\u56DB\u4E2A\u5B57\u7684\u65F6\u5019\uFF0C\u4F60\u662F\u4EC0\u4E48\u611F\u89C9\uFF1F

\u662F\u89C9\u5F97"\u54C7\u4ED6\u7EC8\u4E8E\u88AB\u6211\u8BF4\u670D\u4E86"\uFF1F\u8FD8\u662F\u89C9\u5F97"\u4ED6\u6839\u672C\u6CA1\u5728\u542C\uFF0C\u53EA\u662F\u60F3\u5FEB\u70B9\u7ED3\u675F\u5BF9\u8BDD"\uFF1F

\u5982\u679C\u4F60\u8C08\u8FC7\u604B\u7231\uFF0C\u5927\u6982\u7387\u662F\u540E\u8005\u3002

"\u4F60\u8BF4\u5F97\u5BF9"\u4E4B\u6240\u4EE5\u6740\u4F24\u529B\u5DE8\u5927\uFF0C\u662F\u56E0\u4E3A\u5B83\u8868\u9762\u4E0A\u662F"\u8BA4\u8F93"\uFF0C\u5B9E\u9645\u4E0A\u662F"\u61D2\u5F97\u8DDF\u4F60\u4E89"\u3002\u7FFB\u8BD1\u8FC7\u6765\u5C31\u662F\uFF1A\u6211\u4E0D\u60F3\u804A\u4E86\uFF0C\u4F60\u8BF4\u5565\u5C31\u662F\u5565\u5427\u3002

\u66F4\u624E\u5FC3\u7684\u662F\uFF0C\u8BF4\u8FD9\u53E5\u8BDD\u7684\u4EBA\u5F80\u5F80\u8FD8\u89C9\u5F97\u81EA\u5DF1\u7279\u522B"\u6210\u719F\u7279\u522B\u6709\u667A\u6167"\u2014\u2014\u6211\u90FD\u8BA9\u7740\u5979\u4E86\uFF0C\u6211\u90FD\u4E0D\u8DDF\u5979\u4E89\u4E86\uFF0C\u5979\u600E\u4E48\u8FD8\u751F\u6C14\uFF1F

\u670B\u53CB\uFF0C\u8BA9\u6211\u6765\u544A\u8BC9\u4F60\u4E3A\u4EC0\u4E48\uFF1A\u56E0\u4E3A\u4F60"\u8BA9"\u7684\u59FF\u52BF\u4E0D\u5BF9\u3002

\u4F60\u4EE5\u4E3A\u4F60\u662F"\u8C26\u8BA9"\uFF0C\u5728\u5BF9\u65B9\u770B\u6765\u4F60\u662F"\u6577\u884D"\u3002\u4F60\u4EE5\u4E3A\u4F60\u662F"\u5927\u5EA6"\uFF0C\u5728\u5BF9\u65B9\u770B\u6765\u4F60\u662F"\u51B7\u6F20"\u3002\u4F60\u4EE5\u4E3A\u4F60\u662F"\u7ED3\u675F\u77DB\u76FE"\uFF0C\u5728\u5BF9\u65B9\u770B\u6765\u4F60\u662F"\u62D2\u7EDD\u6C9F\u901A"\u3002

\u90A3\u6B63\u786E\u7684\u59FF\u52BF\u662F\u4EC0\u4E48\uFF1F

\u7B2C\u4E00\u6B65\uFF1A\u5171\u60C5\u3002"\u6211\u7406\u89E3\u4F60\u4E3A\u4EC0\u4E48\u4F1A\u8FD9\u4E48\u60F3\u3002"\u2014\u2014\u5148\u63A5\u4F4F\u60C5\u7EEA\u3002

\u7B2C\u4E8C\u6B65\uFF1A\u786E\u8BA4\u3002"\u4F60\u8BF4\u7684\u8FD9\u70B9\u786E\u5B9E\u662F\u6211\u6CA1\u8003\u8651\u5230\u3002"\u2014\u2014\u627F\u8BA4\u5408\u7406\u7684\u90E8\u5206\u3002

\u7B2C\u4E09\u6B65\uFF1A\u8868\u8FBE\u3002"\u4F46\u6211\u5F53\u65F6\u7684\u60F3\u6CD5\u662F\u2026\u2026"\u2014\u2014\u518D\u8BF4\u51FA\u4F60\u7684\u89C6\u89D2\u3002

\u7B80\u5355\u5427\uFF1F\u4F46\u5F88\u591A\u4EBA\u5C31\u662F\u5B81\u613F\u8BF4\u4E00\u53E5"\u4F60\u8BF4\u5F97\u5BF9"\u7136\u540E\u51B7\u6218\u4E09\u5929\uFF0C\u4E5F\u4E0D\u613F\u610F\u82B1 30 \u79D2\u8BF4\u8FD9\u4E09\u53E5\u8BDD\u3002

\u4E3A\u4EC0\u4E48\uFF1F\u56E0\u4E3A"\u4F60\u8BF4\u5F97\u5BF9"\u662F\u6700\u7701\u529B\u7684\u3002\u5B83\u4E0D\u9700\u8981\u4F60\u771F\u7684\u53BB\u7406\u89E3\u5BF9\u65B9\uFF0C\u53EA\u9700\u8981\u4F60\u6446\u51FA\u4E00\u4E2A"\u6211\u8D62\u4E86\u4F46\u6211\u8BA9\u7740\u4F60"\u7684\u59FF\u6001\u3002

\u4F46\u611F\u60C5\u91CC\uFF0C\u6700\u7701\u529B\u7684\u8DEF\uFF0C\u5F80\u5F80\u662F\u6700\u8FDC\u7684\u8DEF\u3002

\u4E0B\u6B21\u60F3\u8131\u53E3\u800C\u51FA"\u4F60\u8BF4\u5F97\u5BF9"\u7684\u65F6\u5019\uFF0C\u505C\u4E0B\u6765\u95EE\u95EE\u81EA\u5DF1\uFF1A\u6211\u662F\u771F\u7684\u8BA4\u540C\u4E86\uFF0C\u8FD8\u662F\u53EA\u662F\u60F3\u5FEB\u70B9\u7ED3\u675F\uFF1F

\u5982\u679C\u662F\u540E\u8005\u2014\u2014\u522B\u5077\u61D2\u3002\u8BA4\u771F\u8BF4\u51E0\u53E5\uFF0C\u6BD4\u4EC0\u4E48\u90FD\u5F3A\u3002`
      },
      {
        slug: "apology-guide",
        title: "\u9053\u6B49\u7684\u6B63\u786E\u6253\u5F00\u65B9\u5F0F",
        summary: '"\u6211\u9519\u4E86"\u4E09\u4E2A\u5B57\u8BF4\u51FA\u6765\u5BB9\u6613\uFF0C\u4F46\u7BA1\u7528\u5417\uFF1F\u6559\u4F60\u4E00\u5957\u9053\u6B49\u516C\u5F0F\uFF0C\u8BA9 TA \u4E00\u79D2\u5FC3\u8F6F\u3002',
        readTime: 5,
        date: "2025-01-10",
        content: `"\u5BF9\u4E0D\u8D77\u3002"
"\u6211\u9519\u4E86\u3002"
"\u4E0B\u6B21\u4E0D\u4F1A\u4E86\u3002"

\u8FD9\u4E09\u53E5\u8BDD\uFF0C\u662F\u4E0D\u662F\u4F60\u9053\u6B49\u7684\u5168\u90E8\u5BB6\u5F53\uFF1F

\u5982\u679C\u662F\uFF0C\u90A3\u4F60\u5927\u6982\u7387\u4F53\u9A8C\u8FC7\u2014\u2014\u9053\u6B49\u4E86\uFF0C\u4F46\u5BF9\u65B9\u597D\u50CF\u66F4\u751F\u6C14\u4E86\u3002

\u4E3A\u4EC0\u4E48\uFF1F\u56E0\u4E3A\u8FD9\u4E09\u53E5\u8BDD\uFF0C\u672C\u8D28\u4E0A\u90FD\u662F\u5728\u4E3A"\u4F60\u81EA\u5DF1"\u670D\u52A1\uFF1A\u4F60\u8BF4\u5B8C\u4E86\uFF0C\u5FC3\u91CC\u8212\u670D\u4E86\uFF0C\u89C9\u5F97"\u6211\u90FD\u9053\u6B49\u4E86\u4F60\u8FD8\u60F3\u600E\u6837"\u3002

\u4F46\u5BF9\u65B9\u5728\u4E4E\u7684\u6839\u672C\u4E0D\u662F\u4F60\u9053\u4E0D\u9053\u6B49\uFF0C\u662F\u4F60\u77E5\u4E0D\u77E5\u9053\u81EA\u5DF1\u9519\u5728\u54EA\u4E86\u3002

\u4ECA\u5929\u6559\u4F60\u4E00\u5957\u4E07\u80FD\u9053\u6B49\u516C\u5F0F\uFF0C\u8BB0\u597D\u4E86\uFF1A

\u7B2C\u4E00\u6B65\uFF1A\u8BF4\u5177\u4F53\u9519\u8BEF\u3002
\u4E0D\u8981\u8BF4"\u6211\u9519\u4E86"\uFF0C\u8981\u8BF4"\u6211\u4E0D\u5E94\u8BE5\u5FD8\u8BB0\u6211\u4EEC\u7684\u7EAA\u5FF5\u65E5\u8FD8\u8DD1\u53BB\u8DDF\u670B\u53CB\u6253\u7403\uFF0C\u8BA9\u4F60\u4E00\u4E2A\u4EBA\u7B49\u4E86\u4E00\u6574\u5929"\u3002\u2014\u2014\u8D8A\u5177\u4F53\u8D8A\u597D\uFF0C\u8BF4\u660E\u4F60\u771F\u7684\u53CD\u601D\u4E86\u3002

\u7B2C\u4E8C\u6B65\uFF1A\u8BF4\u5BF9\u65B9\u7684\u611F\u53D7\u3002
"\u6362\u4F5C\u662F\u6211\uFF0C\u6211\u4E5F\u4F1A\u7279\u522B\u5931\u671B\u7279\u522B\u59D4\u5C48\u3002"\u2014\u2014\u5171\u60C5\uFF0C\u8BA9\u5BF9\u65B9\u89C9\u5F97"\u4F60\u61C2\u6211"\u3002\u8FD9\u4E00\u6B65\u662F\u9053\u6B49\u7684\u7075\u9B42\uFF0C\u6CA1\u6709\u8FD9\u4E00\u6B65\uFF0C\u524D\u9762\u7684\u90FD\u662F\u7A7A\u8BDD\u3002

\u7B2C\u4E09\u6B65\uFF1A\u8BF4\u4F60\u7684\u5F25\u8865\u65B9\u6848\u3002
"\u6211\u5DF2\u7ECF\u8BA2\u597D\u4E86\u4F60\u6700\u60F3\u53BB\u7684\u90A3\u5BB6\u9910\u5385\uFF0C\u5468\u672B\u6211\u4EEC\u8865\u8FC7\u7EAA\u5FF5\u65E5\u597D\u4E0D\u597D\uFF1F"\u2014\u2014\u884C\u52A8\u6BD4\u8BED\u8A00\u6709\u8BF4\u670D\u529B\u3002

\u7B2C\u56DB\u6B65\uFF1A\u8BF4\u4EE5\u540E\u600E\u4E48\u6539\u3002
"\u6211\u5DF2\u7ECF\u5728\u65E5\u5386\u4E0A\u6807\u597D\u4E86\u6240\u6709\u91CD\u8981\u7684\u65E5\u5B50\uFF0C\u63D0\u524D\u4E00\u5468\u4F1A\u63D0\u9192\u81EA\u5DF1\u3002"\u2014\u2014\u7ED9\u5BF9\u65B9\u5B89\u5168\u611F\uFF0C\u8BC1\u660E\u8FD9\u4E0D\u662F\u6700\u540E\u4E00\u6B21\u3002

\u5C31\u8FD9\u56DB\u6B65\uFF0C\u6BD4\u4F60\u8BF4\u4E00\u767E\u53E5"\u6211\u9519\u4E86"\u90FD\u7BA1\u7528\u3002

\u518D\u8BF4\u8BF4\u9053\u6B49\u7684\u51E0\u5927\u96F7\u533A\uFF1A

\u274C "\u6211\u9519\u4E86\u884C\u4E86\u5427"\u2014\u2014\u8FD9\u4E0D\u662F\u9053\u6B49\uFF0C\u8FD9\u662F\u6311\u8845\u3002
\u274C "\u90FD\u602A\u6211\u597D\u4E0D\u597D"\u2014\u2014\u4E00\u542C\u5C31\u662F\u4E0D\u60C5\u613F\u3002
\u274C "\u4F60\u600E\u4E48\u8FD8\u5728\u751F\u6C14"\u2014\u2014\u628A\u9505\u7529\u56DE\u5BF9\u65B9\u8EAB\u4E0A\u3002
\u274C "\u6211\u90FD\u9053\u6B49\u4E86\u4F60\u8FD8\u60F3\u600E\u6837"\u2014\u2014\u9053\u5FB7\u7ED1\u67B6\uFF0C\u6700\u6700\u6700\u5FCC\u8BB3\u3002

\u6700\u540E\u8BF4\u4E00\u53E5\uFF1A\u9053\u6B49\u4E0D\u662F\u8BA4\u8F93\uFF0C\u662F\u73CD\u60DC\u3002
\u4F60\u613F\u610F\u4F4E\u4E0B\u5934\uFF0C\u4E0D\u662F\u56E0\u4E3A\u4F60\u77EE\u4E86\uFF0C\u662F\u56E0\u4E3A\u4F60\u89C9\u5F97\u8FD9\u6BB5\u611F\u60C5\u6BD4\u4F60\u7684\u9762\u5B50\u91CD\u8981\u3002

\u8FD9\u624D\u662F\u9053\u6B49\u771F\u6B63\u7684\u610F\u4E49\u3002`
      }
    ];
  }
});

// src/storage/database/db.ts
var db_exports = {};
__export(db_exports, {
  Schema: () => schema_exports,
  __poolInternalForTest: () => _pool,
  createPool: () => createPool,
  db: () => db,
  describeDatabaseUrl: () => describeDatabaseUrl,
  ensureDbReady: () => ensureDbReady,
  getDb: () => getDb,
  getLastDbInitError: () => getLastDbInitError,
  getPool: () => getPool
});
function describeDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) return "[\u672A\u8BBE\u7F6E]";
  try {
    const u = new URL(url);
    if (u.password) u.password = "***";
    return sanitizeSecrets(u.toString());
  } catch {
    return sanitizeSecrets(url);
  }
}
function createPool() {
  if (_pool) return _pool;
  if (!process.env.DATABASE_URL) {
    const msg = "[DB] \u274C DATABASE_URL \u73AF\u5883\u53D8\u91CF\u672A\u914D\u7F6E\u3002\u8BF7\u5728\u90E8\u7F72\u5E73\u53F0\uFF08EdgeOne Pages / Vercel\uFF09\u7684\u300C\u73AF\u5883\u53D8\u91CF\u300D\u8BBE\u7F6E\u4E2D\u6DFB\u52A0 DATABASE_URL\uFF0C\u5E76\u91CD\u65B0\u90E8\u7F72\u3002\u6570\u636E\u5E93\u672A\u8FDE\u63A5\u65F6\uFF0CBlog \u5C06\u4F7F\u7528\u5185\u7F6E\u793A\u4F8B\u6587\u7AE0\u515C\u5E95\uFF0C\u6392\u884C\u699C/\u767B\u5F55\u6CE8\u518C\u529F\u80FD\u4E0D\u53EF\u7528\u3002";
    console.error(msg);
    _lastInitError = new Error("DATABASE_URL \u672A\u8BBE\u7F6E");
    throw _lastInitError;
  }
  console.log(
    `[DB] \u6B63\u5728\u521B\u5EFA\u8FDE\u63A5\u6C60\uFF0C\u76EE\u6807\uFF1A${describeDatabaseUrl()}`
  );
  try {
    const pool = new import_pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      },
      max: 5,
      // Serverless 环境下不要贪大，5 够用了
      idleTimeoutMillis: 15e3,
      connectionTimeoutMillis: 1e4
    });
    pool.on("error", (err) => {
      safeLogError("DB Pool error", {
        name: err.name,
        message: err.message,
        code: err.code,
        routine: err.routine
      });
    });
    _pool = pool;
    _lastInitError = null;
    console.log("[DB] \u2705 \u8FDE\u63A5\u6C60\u521B\u5EFA\u6210\u529F\uFF08\u5C1A\u672A\u5B9E\u9645\u8FDE\u63A5\uFF0C\u9996\u6B21\u67E5\u8BE2\u65F6\u5EFA\u7ACB\uFF09");
    return pool;
  } catch (err) {
    safeLogError("createPool", err);
    _lastInitError = err instanceof Error ? err : new Error(String(err));
    throw _lastInitError;
  }
}
function getPool() {
  return _pool ?? createPool();
}
function getDb() {
  if (_db) return _db;
  _db = (0, import_node_postgres.drizzle)(getPool());
  return _db;
}
async function ensureDbReady(force = false) {
  if (!force && _initPromise) return _initPromise.then(() => ({ ok: true, migrated: true, seeded: 0 }));
  const doIt = (async () => {
    let client = null;
    const report = { ok: false, migrated: false, seeded: 0 };
    try {
      const pool = createPool();
      client = await pool.connect();
      await client.query("SELECT 1 AS ok");
      console.log("[DB] \u2705 SELECT 1 \u8FDE\u901A\u6027\u68C0\u67E5\u901A\u8FC7");
      for (const sql of CREATE_TABLES_SQL) {
        await client.query(sql);
      }
      report.migrated = true;
      console.log("[DB] \u2705 \u5EFA\u8868\u68C0\u67E5\u5B8C\u6210\uFF08\u6240\u6709\u8868\u5DF2\u5B58\u5728\uFF09");
      const { rows } = await client.query("SELECT COUNT(*)::integer AS cnt FROM blog_posts");
      const count = Number(rows[0]?.cnt ?? 0);
      if (count === 0) {
        const seedData = await Promise.resolve().then(() => (init_blogPosts(), blogPosts_exports)).then((m) => m.blogPosts);
        console.log(`[DB] blog_posts \u8868\u4E3A\u7A7A\uFF0C\u5199\u5165 ${seedData.length} \u7BC7\u5185\u7F6E\u793A\u4F8B\u6587\u7AE0`);
        for (const p of seedData) {
          await client.query(
            `INSERT INTO blog_posts (title, summary, content, slug, created_at)
             VALUES ($1, $2, $3, $4, COALESCE($5::timestamptz, NOW()))
             ON CONFLICT (slug) DO NOTHING`,
            [p.title, p.summary, p.content, p.slug, p.date]
          );
        }
        report.seeded = seedData.length;
        await client.query("INSERT INTO health_check DEFAULT VALUES");
      } else {
        console.log(`[DB] blog_posts \u5DF2\u6709 ${count} \u7BC7\u6587\u7AE0\uFF0C\u8DF3\u8FC7 seed`);
      }
      report.ok = true;
      _lastInitError = null;
      console.log("[DB] \u2705 ensureDbReady \u5B8C\u6210\uFF0C\u6570\u636E\u5E93\u5C31\u7EEA");
      return report;
    } catch (err) {
      safeLogError("ensureDbReady", err);
      _lastInitError = err instanceof Error ? err : new Error(String(err));
      report.ok = false;
      report.error = {
        name: err?.name ?? "Error",
        message: err?.message ?? String(err),
        code: err?.code
      };
      return report;
    } finally {
      if (client) try {
        client.release();
      } catch {
      }
    }
  })();
  _initPromise = doIt.then(() => void 0).catch(() => void 0);
  return doIt;
}
function getLastDbInitError() {
  return _lastInitError;
}
var import_node_postgres, import_pg, import_config, _pool, _db, _initPromise, _lastInitError, db, CREATE_TABLES_SQL;
var init_db = __esm({
  "src/storage/database/db.ts"() {
    "use strict";
    import_node_postgres = require("drizzle-orm/node-postgres");
    import_pg = require("pg");
    import_config = require("dotenv/config");
    init_utils();
    init_schema();
    _pool = null;
    _db = null;
    _initPromise = null;
    _lastInitError = null;
    db = new Proxy({}, {
      get(_target, prop) {
        const realDb = getDb();
        return realDb[prop];
      }
    });
    CREATE_TABLES_SQL = [
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
  }
});

// src/server.ts
var import_http = require("http");
var import_url = require("url");
var import_next = __toESM(require("next"));
init_utils();
var dev = process.env.NODE_ENV !== "production";
var hostname = process.env.HOSTNAME || "0.0.0.0";
var port = parseInt(process.env.PORT || "5000", 10);
var app = (0, import_next.default)({ dev, hostname, port });
var handle = app.getRequestHandler();
app.prepare().then(async () => {
  try {
    console.log("---[ \u542F\u52A8\u81EA\u68C0\uFF1ADATABASE ] ---");
    const { ensureDbReady: ensureDbReady2, describeDatabaseUrl: describeDatabaseUrl2 } = await Promise.resolve().then(() => (init_db(), db_exports)).catch((err) => {
      safeLogError("\u52A8\u6001 import \u6570\u636E\u5E93\u6A21\u5757\u5931\u8D25\uFF08\u5927\u6982\u7387 pg \u672A\u6B63\u786E\u6253\u5305\u8FDB runtime\uFF09", err);
      throw err;
    });
    console.log(`  DATABASE_URL \u914D\u7F6E\uFF1A${describeDatabaseUrl2()}`);
    const r = await ensureDbReady2(true);
    if (r.ok) {
      console.log("  \u2705 \u6570\u636E\u5E93\u5C31\u7EEA\u3002migrated=", r.migrated, "seeded=", r.seeded);
    } else {
      console.log(
        "  \u26A0\uFE0F \u6570\u636E\u5E93\u672A\u5C31\u7EEA\uFF08\u8BE6\u89C1\u540E\u7EED\u9519\u8BEF\u65E5\u5FD7\uFF09\u3002Blog \u5C06\u4F7F\u7528\u5185\u7F6E\u793A\u4F8B\u6587\u7AE0\u515C\u5E95\uFF0C\u767B\u5F55\u6CE8\u518C\u4E0D\u53EF\u7528\u3002\u9519\u8BEF\uFF1A",
        r.error
      );
    }
  } catch (err) {
    safeLogError("server prepare DB \u6574\u4F53\u5931\u8D25\uFF08DB \u6A21\u5757\u4E0D\u53EF\u7528\uFF09", err);
    console.log(
      "  \u26A0\uFE0F DB \u81EA\u68C0\u5B8C\u5168\u8DF3\u8FC7\u3002Blog \u4F7F\u7528\u5185\u7F6E\u793A\u4F8B\u515C\u5E95\uFF0C\u767B\u5F55\u6CE8\u518C\u6392\u884C\u699C\u4E0D\u53EF\u7528\uFF1BAI \u4E3B\u6E38\u620F\u529F\u80FD\u6B63\u5E38\u53EF\u7528\u3002"
    );
  }
  try {
    console.log("---[ \u542F\u52A8\u81EA\u68C0\uFF1ACOZE SDK \u73AF\u5883\u53D8\u91CF ] ---");
    const { assertCozeEnv: assertCozeEnv2 } = await Promise.resolve().then(() => (init_utils(), utils_exports));
    const ok = assertCozeEnv2("server-prepare");
    console.log(
      ok ? "  \u2705 \u4E09\u4E2A COZE_* \u53D8\u91CF\u90FD\u5DF2\u914D\u7F6E\u3002" : "  \u26A0\uFE0F \u7F3A\u5C11 COZE \u53D8\u91CF\uFF0CAI \u529F\u80FD\u4F1A\u8D70\u9ED8\u8BA4\u56DE\u590D\u964D\u7EA7\u3002"
    );
  } catch (err) {
    safeLogError("server prepare COZE", err);
  }
  console.log("---[ \u81EA\u68C0\u7ED3\u675F\uFF0C\u542F\u52A8 HTTP server ] ---");
  const server = (0, import_http.createServer)(async (req, res) => {
    try {
      const parsedUrl = (0, import_url.parse)(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      safeLogError(`HTTP handler ${req.url}`, err);
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("\u670D\u52A1\u5668\u9047\u5230\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\uFF08\u8BE6\u7EC6\u9519\u8BEF\u5DF2\u5199\u5165\u65E5\u5FD7\uFF09\u3002");
    }
  });
  server.once("error", (err) => {
    safeLogError("HTTP server startup", err);
    process.exit(1);
  });
  server.listen(port, hostname, () => {
    console.log(
      `> Server listening at http://${hostname}:${port} as ${dev ? "development" : process.env.NODE_ENV}`
    );
  });
});
