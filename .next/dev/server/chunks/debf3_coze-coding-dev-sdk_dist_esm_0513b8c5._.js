module.exports = [
"[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/rslib-runtime.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__webpack_require__",
    ()=>__webpack_require__
]);
var e = {}, _ = {};
function __webpack_require__(r) {
    var a = _[r];
    if (void 0 !== a) return a.exports;
    var o = _[r] = {
        id: r,
        loaded: !1,
        exports: {}
    };
    return e[r].call(o.exports, o, o.exports, __webpack_require__), o.loaded = !0, o.exports;
}
__webpack_require__.m = e, __webpack_require__.add = function(e) {
    Object.assign(__webpack_require__.m, e);
}, __webpack_require__.n = (e)=>{
    var _ = e && e.__esModule ? ()=>e.default : ()=>e;
    return __webpack_require__.d(_, {
        a: _
    }), _;
}, __webpack_require__.d = (e, _)=>{
    for(var r in _)__webpack_require__.o(_, r) && !__webpack_require__.o(e, r) && Object.defineProperty(e, r, {
        enumerable: !0,
        get: _[r]
    });
}, __webpack_require__.o = (e, _)=>Object.prototype.hasOwnProperty.call(e, _), __webpack_require__.r = (e)=>{
    "u" > typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
    }), Object.defineProperty(e, "__esModule", {
        value: !0
    });
}, __webpack_require__.nmd = (e)=>(e.paths = [], e.children || (e.children = []), e);
;
}),
"[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/1~461.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
;
}),
"[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/1~462.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getSSOTokenFilepath",
    ()=>getSSOTokenFilepath,
    "getSSOTokenFromFile",
    ()=>getSSOTokenFromFile,
    "tokenIntercept",
    ()=>_
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$rslib$2d$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/rslib-runtime.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/131.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$1$7e$461$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/1~461.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
let r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$rslib$2d$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__webpack_require__"])("crypto"), S = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$rslib$2d$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__webpack_require__"])("path"), getSSOTokenFilepath = (e)=>{
    let o = (0, r.createHash)("sha1").update(e).digest("hex");
    return (0, S.join)((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getHomeDir"])(), ".aws", "sso", "cache", `${o}.json`);
}, _ = {}, getSSOTokenFromFile = async (e)=>{
    if (_[e]) return _[e];
    let t = getSSOTokenFilepath(e);
    return JSON.parse(await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["readFile"])(t, "utf8"));
};
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/1~666.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "externalDataInterceptor",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/131.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$1$7e$462$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/1~462.mjs [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$1$7e$462$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$1$7e$462$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
let t = {
    getFileRecord: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fileIntercept"],
    interceptFile (r, t) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fileIntercept"][r] = Promise.resolve(t);
    },
    getTokenRecord: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$1$7e$462$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tokenIntercept"],
    interceptToken (e, t) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$1$7e$462$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tokenIntercept"][e] = t;
    }
};
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/1~622.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "fromTokenFile",
    ()=>fromTokenFile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$rslib$2d$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/rslib-runtime.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/131.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$1$7e$666$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/1~666.mjs [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$1$7e$666$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$1$7e$666$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
let t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$rslib$2d$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__webpack_require__"])("fs"), r = "AWS_WEB_IDENTITY_TOKEN_FILE", fromTokenFile = (e = {})=>async (l)=>{
        let s;
        e.logger?.debug("@aws-sdk/credential-provider-web-identity - fromTokenFile");
        let _ = e?.webIdentityTokenFile ?? process.env[r], d = e?.roleArn ?? process.env.AWS_ROLE_ARN, a = e?.roleSessionName ?? process.env.AWS_ROLE_SESSION_NAME;
        if (!_ || !d) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CredentialsProviderError"]("Web identity configuration not specified", {
            logger: e.logger
        });
        let g = await (s = {
            ...e,
            webIdentityToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$1$7e$666$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["externalDataInterceptor"]?.getTokenRecord?.()[_] ?? (0, t.readFileSync)(_, {
                encoding: "ascii"
            }),
            roleArn: d,
            roleSessionName: a
        }, async (e)=>{
            s.logger?.debug("@aws-sdk/credential-provider-web-identity - fromWebToken");
            let { roleArn: o, roleSessionName: i, webIdentityToken: n, providerId: t, policyArns: r, policy: l, durationSeconds: _ } = s, { roleAssumerWithWebIdentity: d } = s;
            if (!d) {
                let { getDefaultRoleAssumerWithWebIdentity: o } = await __turbopack_context__.A("[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/1~410.mjs [app-route] (ecmascript, async loader)").then((e)=>({
                        getDefaultRoleAssumerWithWebIdentity: e.defaultRoleAssumers_getDefaultRoleAssumerWithWebIdentity
                    }));
                d = o({
                    ...s.clientConfig,
                    credentialProviderLogger: s.logger,
                    parentClientConfig: {
                        ...e?.callerClientConfig,
                        ...s.parentClientConfig
                    }
                }, s.clientPlugins);
            }
            return d({
                RoleArn: o,
                RoleSessionName: i ?? `aws-sdk-js-session-${Date.now()}`,
                WebIdentityToken: n,
                ProviderId: t,
                PolicyArns: r,
                Policy: l,
                DurationSeconds: _
            });
        })(l);
        return _ === process.env[r] && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setCredentialFeature"])(g, "CREDENTIALS_ENV_VARS_STS_WEB_ID_TOKEN", "h"), g;
    };
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=debf3_coze-coding-dev-sdk_dist_esm_0513b8c5._.js.map