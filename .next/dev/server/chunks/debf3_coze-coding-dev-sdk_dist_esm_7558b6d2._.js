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
"[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/1~398.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ENV_CMDS_FULL_URI",
    ()=>f,
    "ENV_CMDS_RELATIVE_URI",
    ()=>u,
    "fromContainerMetadata",
    ()=>fromContainerMetadata,
    "fromInstanceMetadata",
    ()=>fromInstanceMetadata,
    "getInstanceMetadataEndpoint",
    ()=>getInstanceMetadataEndpoint,
    "httpRequest",
    ()=>httpRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$rslib$2d$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/rslib-runtime.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/131.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$http__$5b$external$5d$__$28$http$2c$__cjs$29$__$3c$export__request__as__external_http_request$3e$__ = __turbopack_context__.i("[externals]/http [external] (http, cjs) <export request as external_http_request>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$url__$5b$external$5d$__$28$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/url [external] (url, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
var e, t, a, r;
;
;
let m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$rslib$2d$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__webpack_require__"])("buffer");
function httpRequest(e) {
    return new Promise((t, a)=>{
        let r = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$http__$5b$external$5d$__$28$http$2c$__cjs$29$__$3c$export__request__as__external_http_request$3e$__["external_http_request"])({
            method: "GET",
            ...e,
            hostname: e.hostname?.replace(/^\[(.+)\]$/, "$1")
        });
        r.on("error", (e)=>{
            a(Object.assign(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ProviderError"]("Unable to connect to instance metadata service"), e)), r.destroy();
        }), r.on("timeout", ()=>{
            a(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ProviderError"]("TimeoutError from instance metadata service")), r.destroy();
        }), r.on("response", (e)=>{
            let { statusCode: n = 400 } = e;
            (n < 200 || 300 <= n) && (a(Object.assign(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ProviderError"]("Error response received from instance metadata service"), {
                statusCode: n
            })), r.destroy());
            let o = [];
            e.on("data", (e)=>{
                o.push(e);
            }), e.on("end", ()=>{
                t(m.Buffer.concat(o)), r.destroy();
            });
        }), r.end();
    });
}
let isImdsCredentials = (e)=>!!e && "object" == typeof e && "string" == typeof e.AccessKeyId && "string" == typeof e.SecretAccessKey && "string" == typeof e.Token && "string" == typeof e.Expiration, fromImdsCredentials = (e)=>({
        accessKeyId: e.AccessKeyId,
        secretAccessKey: e.SecretAccessKey,
        sessionToken: e.Token,
        expiration: new Date(e.Expiration),
        ...e.AccountId && {
            accountId: e.AccountId
        }
    }), p = 1e3, g = 0, providerConfigFromInit = ({ maxRetries: e = g, timeout: t = p })=>({
        maxRetries: e,
        timeout: t
    }), retry = (e, t)=>{
    let a = e();
    for(let r = 0; r < t; r++)a = a.catch(e);
    return a;
}, f = "AWS_CONTAINER_CREDENTIALS_FULL_URI", u = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI", h = "AWS_CONTAINER_AUTHORIZATION_TOKEN", fromContainerMetadata = (e = {})=>{
    let { timeout: t, maxRetries: a } = providerConfigFromInit(e);
    return ()=>retry(async ()=>{
            let a = await getCmdsUri({
                logger: e.logger
            }), r = JSON.parse(await requestFromEcsImds(t, a));
            if (!isImdsCredentials(r)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CredentialsProviderError"]("Invalid response received from instance metadata service.", {
                logger: e.logger
            });
            return fromImdsCredentials(r);
        }, a);
}, requestFromEcsImds = async (e, t)=>(process.env[h] && (t.headers = {
        ...t.headers,
        Authorization: process.env[h]
    }), (await httpRequest({
        ...t,
        timeout: e
    })).toString()), I = {
    localhost: !0,
    "127.0.0.1": !0
}, v = {
    "http:": !0,
    "https:": !0
}, getCmdsUri = async ({ logger: e })=>{
    if (process.env[u]) return {
        hostname: "169.254.170.2",
        path: process.env[u]
    };
    if (process.env[f]) {
        let t = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$url__$5b$external$5d$__$28$url$2c$__cjs$29$__["parse"])(process.env[f]);
        if (!t.hostname || !(t.hostname in I)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CredentialsProviderError"](`${t.hostname} is not a valid container metadata service hostname`, {
            tryNextLink: !1,
            logger: e
        });
        if (!t.protocol || !(t.protocol in v)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CredentialsProviderError"](`${t.protocol} is not a valid container metadata service protocol`, {
            tryNextLink: !1,
            logger: e
        });
        return {
            ...t,
            port: t.port ? parseInt(t.port, 10) : void 0
        };
    }
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CredentialsProviderError"](`The container metadata credential provider cannot be used unless the ${u} or ${f} environment variable is set`, {
        tryNextLink: !1,
        logger: e
    });
};
class E extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CredentialsProviderError"] {
    tryNextLink;
    name = "InstanceMetadataV1FallbackError";
    constructor(e, t = !0){
        super(e, t), this.tryNextLink = t, Object.setPrototypeOf(this, E.prototype);
    }
}
(a = e || (e = {})).IPv4 = "http://169.254.169.254", a.IPv6 = "http://[fd00:ec2::254]";
let w = {
    environmentVariableSelector: (e)=>e.AWS_EC2_METADATA_SERVICE_ENDPOINT,
    configFileSelector: (e)=>e.ec2_metadata_service_endpoint,
    default: void 0
};
(r = t || (t = {})).IPv4 = "IPv4", r.IPv6 = "IPv6";
let _ = {
    environmentVariableSelector: (e)=>e.AWS_EC2_METADATA_SERVICE_ENDPOINT_MODE,
    configFileSelector: (e)=>e.ec2_metadata_service_endpoint_mode,
    default: t.IPv4
}, getInstanceMetadataEndpoint = async ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["dist_es_parseUrl"])(await getFromEndpointConfig() || await getFromEndpointModeConfig()), getFromEndpointConfig = async ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadConfig"])(w)(), getFromEndpointModeConfig = async ()=>{
    let a = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadConfig"])(_)();
    switch(a){
        case t.IPv4:
            return e.IPv4;
        case t.IPv6:
            return e.IPv6;
        default:
            throw Error(`Unsupported endpoint mode: ${a}. Select from ${Object.values(t)}`);
    }
}, getExtendedInstanceMetadataCredentials = (e, t)=>{
    let a = 300 + Math.floor(300 * Math.random()), r = new Date(Date.now() + 1e3 * a);
    t.warn(`Attempting credential expiration extension due to a credential service availability issue. A refresh of these credentials will be attempted after ${new Date(r)}.
For more information, please visit: https://docs.aws.amazon.com/sdkref/latest/guide/feature-static-credentials.html`);
    let n = e.originalExpiration ?? e.expiration;
    return {
        ...e,
        ...n ? {
            originalExpiration: n
        } : {},
        expiration: r
    };
}, C = "/latest/meta-data/iam/security-credentials/", y = "AWS_EC2_METADATA_V1_DISABLED", A = "ec2_metadata_v1_disabled", S = "x-aws-ec2-metadata-token", fromInstanceMetadata = (e = {})=>((e, t = {})=>{
        let a, r = t?.logger || console;
        return async ()=>{
            let t;
            try {
                (t = await e()).expiration && t.expiration.getTime() < Date.now() && (t = getExtendedInstanceMetadataCredentials(t, r));
            } catch (e) {
                if (a) r.warn("Credential renew failed: ", e), t = getExtendedInstanceMetadataCredentials(a, r);
                else throw e;
            }
            return a = t, t;
        };
    })(getInstanceMetadataProvider(e), {
        logger: e.logger
    }), getInstanceMetadataProvider = (e = {})=>{
    let t = !1, { logger: a, profile: r } = e, { timeout: n, maxRetries: i } = providerConfigFromInit(e), getCredentials = async (a, n)=>{
        if (t || n.headers?.[S] == null) {
            let t = !1, a = !1, n = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadConfig"])({
                environmentVariableSelector: (t)=>{
                    let r = t[y];
                    if (a = !!r && "false" !== r, void 0 === r) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CredentialsProviderError"](`${y} not set in env, checking config file next.`, {
                        logger: e.logger
                    });
                    return a;
                },
                configFileSelector: (e)=>{
                    let a = e[A];
                    return t = !!a && "false" !== a;
                },
                default: !1
            }, {
                profile: r
            })();
            if (e.ec2MetadataV1Disabled || n) {
                let r = [];
                throw e.ec2MetadataV1Disabled && r.push("credential provider initialization (runtime option ec2MetadataV1Disabled)"), t && r.push(`config file profile (${A})`), a && r.push(`process environment variable (${y})`), new E(`AWS EC2 Metadata v1 fallback has been blocked by AWS SDK configuration in the following: [${r.join(", ")}].`);
            }
        }
        let i = (await retry(async ()=>{
            let e;
            try {
                e = await getProfile(n);
            } catch (e) {
                throw 401 === e.statusCode && (t = !1), e;
            }
            return e;
        }, a)).trim();
        return retry(async ()=>{
            let a;
            try {
                a = await getCredentialsFromProfile(i, n, e);
            } catch (e) {
                throw 401 === e.statusCode && (t = !1), e;
            }
            return a;
        }, a);
    };
    return async ()=>{
        let e = await getInstanceMetadataEndpoint();
        if (t) return a?.debug("AWS SDK Instance Metadata", "using v1 fallback (no token fetch)"), getCredentials(i, {
            ...e,
            timeout: n
        });
        {
            let r;
            try {
                r = (await getMetadataToken({
                    ...e,
                    timeout: n
                })).toString();
            } catch (r) {
                if (r?.statusCode === 400) throw Object.assign(r, {
                    message: "EC2 Metadata token request returned error"
                });
                return ("TimeoutError" === r.message || [
                    403,
                    404,
                    405
                ].includes(r.statusCode)) && (t = !0), a?.debug("AWS SDK Instance Metadata", "using v1 fallback (initial)"), getCredentials(i, {
                    ...e,
                    timeout: n
                });
            }
            return getCredentials(i, {
                ...e,
                headers: {
                    [S]: r
                },
                timeout: n
            });
        }
    };
}, getMetadataToken = async (e)=>httpRequest({
        ...e,
        path: "/latest/api/token",
        method: "PUT",
        headers: {
            "x-aws-ec2-metadata-token-ttl-seconds": "21600"
        }
    }), getProfile = async (e)=>(await httpRequest({
        ...e,
        path: C
    })).toString(), getCredentialsFromProfile = async (e, t, a)=>{
    let r = JSON.parse((await httpRequest({
        ...t,
        path: C + e
    })).toString());
    if (!isImdsCredentials(r)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CredentialsProviderError"]("Invalid response received from instance metadata service.", {
        logger: a.logger
    });
    return fromImdsCredentials(r);
};
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=debf3_coze-coding-dev-sdk_dist_esm_7558b6d2._.js.map