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
"[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/1~489.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NoAuthSigner",
    ()=>n
]);
class n {
    async sign(n, r, s) {
        return n;
    }
}
;
}),
"[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/1~300.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "AwsRestJsonProtocol",
    ()=>E
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/131.mjs [app-route] (ecmascript) <locals>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
function jsonReviver(e, t, r) {
    if (r?.source) {
        let e = r.source;
        if ("number" == typeof t && (t > Number.MAX_SAFE_INTEGER || t < Number.MIN_SAFE_INTEGER || e !== String(t))) return e.includes(".") ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NumericValue"](e, "bigDecimal") : BigInt(e);
    }
    return t;
}
class j extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SerdeContextConfig"] {
    settings;
    constructor(e){
        super(), this.settings = e;
    }
    async read(e, t) {
        let r;
        return this._read(e, "string" == typeof t ? JSON.parse(t, jsonReviver) : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collect_stream_body_collectBody"])(t, r = this.serdeContext).then((e)=>(r?.utf8Encoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["dist_es_toUtf8_toUtf8"])(e)).then((e)=>{
            if (e.length) try {
                return JSON.parse(e);
            } catch (t) {
                throw t?.name === "SyntaxError" && Object.defineProperty(t, "$responseBodyText", {
                    value: e
                }), t;
            }
            return {};
        }));
    }
    readObject(e, t) {
        return this._read(e, t);
    }
    _read(s, n) {
        let a = null !== n && "object" == typeof n, c = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NormalizedSchema"].of(s);
        if (a) {
            if (c.isStructSchema()) {
                let e, r = c.isUnionSchema(), s = {};
                for (let [i, a] of (r && (e = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UnionSerde"](n, s)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["deserializingStructIterator"])(c, n, !!this.settings.jsonName && "jsonName"))){
                    let t = this.settings.jsonName ? a.getMergedTraits().jsonName ?? i : i;
                    r && e.mark(t), null != n[t] && (s[i] = this._read(a, n[t]));
                }
                return r && e.writeUnknown(), s;
            }
            if (Array.isArray(n) && c.isListSchema()) {
                let e = c.getValueSchema(), t = [], r = !!c.getMergedTraits().sparse;
                for (let s of n)(r || null != s) && t.push(this._read(e, s));
                return t;
            }
            if (c.isMapSchema()) {
                let e = c.getValueSchema(), t = {}, r = !!c.getMergedTraits().sparse;
                for (let [s, i] of Object.entries(n))(r || null != i) && (t[s] = this._read(e, i));
                return t;
            }
        }
        if (c.isBlobSchema() && "string" == typeof n) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromBase64"])(n);
        let l = c.getMergedTraits().mediaType;
        if (c.isStringSchema() && "string" == typeof n && l) return "application/json" === l || l.endsWith("+json") ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["lazy_json_LazyJsonString"].from(n) : n;
        if (c.isTimestampSchema() && null != n) switch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["determineTimestampFormat"])(c, this.settings)){
            case 5:
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parseRfc3339DateTimeWithOffset"])(n);
            case 6:
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parseRfc7231DateTime"])(n);
            case 7:
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parseEpochTimestamp"])(n);
            default:
                return console.warn("Missing timestamp format, parsing value with Date constructor:", n), new Date(n);
        }
        if (c.isBigIntegerSchema() && ("number" == typeof n || "string" == typeof n)) return BigInt(n);
        if (c.isBigDecimalSchema() && void 0 != n) return n instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NumericValue"] ? n : "bigDecimal" === n.type && "string" in n ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NumericValue"](n.string, n.type) : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NumericValue"](String(n), "bigDecimal");
        if (c.isNumericSchema() && "string" == typeof n) {
            switch(n){
                case "Infinity":
                    return 1 / 0;
                case "-Infinity":
                    return -1 / 0;
                case "NaN":
                    return NaN;
            }
            return n;
        }
        if (c.isDocumentSchema()) if (!a) return structuredClone(n);
        else {
            let e = Array.isArray(n) ? [] : {};
            for (let [t, r] of Object.entries(n))r instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NumericValue"] ? e[t] = r : e[t] = this._read(c, r);
            return e;
        }
        return n;
    }
}
let x = String.fromCharCode(925);
class C {
    values = new Map;
    counter = 0;
    stage = 0;
    createReplacer() {
        if (1 === this.stage) throw Error("@aws-sdk/core/protocols - JsonReplacer already created.");
        if (2 === this.stage) throw Error("@aws-sdk/core/protocols - JsonReplacer exhausted.");
        return this.stage = 1, (e, t)=>{
            if (t instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NumericValue"]) {
                let e = `${x + "nv" + this.counter++}_` + t.string;
                return this.values.set(`"${e}"`, t.string), e;
            }
            if ("bigint" == typeof t) {
                let e = t.toString(), r = `${x + "b" + this.counter++}_` + e;
                return this.values.set(`"${r}"`, e), r;
            }
            return t;
        };
    }
    replaceInJson(e) {
        if (0 === this.stage) throw Error("@aws-sdk/core/protocols - JsonReplacer not created yet.");
        if (2 === this.stage) throw Error("@aws-sdk/core/protocols - JsonReplacer exhausted.");
        if (this.stage = 2, 0 === this.counter) return e;
        for (let [t, r] of this.values)e = e.replace(t, r);
        return e;
    }
}
class N extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SerdeContextConfig"] {
    settings;
    buffer;
    useReplacer = !1;
    rootSchema;
    constructor(e){
        super(), this.settings = e;
    }
    write(e, t) {
        this.rootSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NormalizedSchema"].of(e), this.buffer = this._write(this.rootSchema, t);
    }
    writeDiscriminatedDocument(e, t) {
        this.write(e, t), "object" == typeof this.buffer && (this.buffer.__type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NormalizedSchema"].of(e).getName(!0));
    }
    flush() {
        let { rootSchema: e, useReplacer: t } = this;
        if (this.rootSchema = void 0, this.useReplacer = !1, e?.isStructSchema() || e?.isDocumentSchema()) {
            if (!t) return JSON.stringify(this.buffer);
            let e = new C;
            return e.replaceInJson(JSON.stringify(this.buffer, e.createReplacer(), 0));
        }
        return this.buffer;
    }
    _write(t, r, s) {
        let a = null !== r && "object" == typeof r, o = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NormalizedSchema"].of(t);
        if (a) {
            if (o.isStructSchema()) {
                let e = {};
                for (let [t, s] of (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["serializingStructIterator"])(o, r)){
                    let i = this._write(s, r[t], o);
                    if (void 0 !== i) {
                        let r = s.getMergedTraits().jsonName;
                        e[this.settings.jsonName ? r ?? t : t] = i;
                    }
                }
                if (o.isUnionSchema() && 0 === Object.keys(e).length) {
                    let { $unknown: t } = r;
                    if (Array.isArray(t)) {
                        let [r, s] = t;
                        e[r] = this._write(15, s);
                    }
                }
                return e;
            }
            if (Array.isArray(r) && o.isListSchema()) {
                let e = o.getValueSchema(), t = [], s = !!o.getMergedTraits().sparse;
                for (let i of r)(s || null != i) && t.push(this._write(e, i));
                return t;
            }
            if (o.isMapSchema()) {
                let e = o.getValueSchema(), t = {}, s = !!o.getMergedTraits().sparse;
                for (let [i, n] of Object.entries(r))(s || null != n) && (t[i] = this._write(e, n));
                return t;
            }
            if (r instanceof Uint8Array && (o.isBlobSchema() || o.isDocumentSchema())) return o === this.rootSchema ? r : (this.serdeContext?.base64Encoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toBase64"])(r);
            if (r instanceof Date && (o.isTimestampSchema() || o.isDocumentSchema())) switch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["determineTimestampFormat"])(o, this.settings)){
                case 5:
                    return r.toISOString().replace(".000Z", "Z");
                case 6:
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["dateToUtcString"])(r);
                case 7:
                    return r.getTime() / 1e3;
                default:
                    return console.warn("Missing timestamp format, using epoch seconds", r), r.getTime() / 1e3;
            }
            r instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NumericValue"] && (this.useReplacer = !0);
        }
        if (!(null === r && s?.isStructSchema())) {
            if (o.isStringSchema()) {
                if (void 0 === r && o.isIdempotencyToken()) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["v4"])();
                let e = o.getMergedTraits().mediaType;
                return null != r && e && ("application/json" === e || e.endsWith("+json")) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["lazy_json_LazyJsonString"].from(r) : r;
            }
            if ("number" == typeof r && o.isNumericSchema()) return Math.abs(r) === 1 / 0 || isNaN(r) ? String(r) : r;
            if ("string" == typeof r && o.isBlobSchema()) return o === this.rootSchema ? r : (this.serdeContext?.base64Encoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toBase64"])(r);
            if ("bigint" == typeof r && (this.useReplacer = !0), o.isDocumentSchema()) if (!a) return structuredClone(r);
            else {
                let e = Array.isArray(r) ? [] : {};
                for (let [t, s] of Object.entries(r))s instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NumericValue"] ? (this.useReplacer = !0, e[t] = s) : e[t] = this._write(o, s);
                return e;
            }
            return r;
        }
    }
}
class T extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SerdeContextConfig"] {
    settings;
    constructor(e){
        super(), this.settings = e;
    }
    createSerializer() {
        let e = new N(this.settings);
        return e.setSerdeContext(this.serdeContext), e;
    }
    createDeserializer() {
        let e = new j(this.settings);
        return e.setSerdeContext(this.serdeContext), e;
    }
}
class E extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HttpBindingProtocol"] {
    serializer;
    deserializer;
    codec;
    mixin = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ProtocolLib"];
    constructor({ defaultNamespace: e }){
        super({
            defaultNamespace: e
        });
        let t = {
            timestampFormat: {
                useTrait: !0,
                default: 7
            },
            httpBindings: !0,
            jsonName: !0
        };
        this.codec = new T(t), this.serializer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HttpInterceptingShapeSerializer"](this.codec.createSerializer(), t), this.deserializer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HttpInterceptingShapeDeserializer"](this.codec.createDeserializer(), t);
    }
    getShapeId() {
        return "aws.protocols#restJson1";
    }
    getPayloadCodec() {
        return this.codec;
    }
    setSerdeContext(e) {
        this.codec.setSerdeContext(e), super.setSerdeContext(e);
    }
    async serializeRequest(e, t, r) {
        let s = await super.serializeRequest(e, t, r), i = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NormalizedSchema"].of(e.input);
        if (!s.headers["content-type"]) {
            let e = this.mixin.resolveRestContentType(this.getDefaultContentType(), i);
            e && (s.headers["content-type"] = e);
        }
        return null == s.body && s.headers["content-type"] === this.getDefaultContentType() && (s.body = "{}"), s;
    }
    async deserializeResponse(e, t, r) {
        let s = await super.deserializeResponse(e, t, r);
        for (let [t, r] of __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NormalizedSchema"].of(e.output).structIterator())!r.getMemberTraits().httpPayload || t in s || (s[t] = null);
        return s;
    }
    async handleError(e, t, r, s, i) {
        let n = ((e, t)=>{
            let findKey = (e, t)=>Object.keys(e).find((e)=>e.toLowerCase() === t.toLowerCase()), sanitizeErrorCode = (e)=>{
                let t = e;
                return "number" == typeof t && (t = t.toString()), t.indexOf(",") >= 0 && (t = t.split(",")[0]), t.indexOf(":") >= 0 && (t = t.split(":")[0]), t.indexOf("#") >= 0 && (t = t.split("#")[1]), t;
            }, r = findKey(e.headers, "x-amzn-errortype");
            if (void 0 !== r) return sanitizeErrorCode(e.headers[r]);
            if (t && "object" == typeof t) {
                let e = findKey(t, "code");
                if (e && void 0 !== t[e]) return sanitizeErrorCode(t[e]);
                if (void 0 !== t.__type) return sanitizeErrorCode(t.__type);
            }
        })(r, s) ?? "Unknown", { errorSchema: a, errorMetadata: o } = await this.mixin.getErrorSchemaOrThrowBaseException(n, this.options.defaultNamespace, r, s, i), c = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NormalizedSchema"].of(a), u = s.message ?? s.Message ?? "Unknown", l = new (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TypeRegistry"].for(a[1]).getErrorCtor(a) ?? Error)(u);
        await this.deserializeHttpMessage(a, t, r, s);
        let f = {};
        for (let [e, t] of c.structIterator()){
            let r = t.getMergedTraits().jsonName ?? e;
            f[e] = this.codec.createDeserializer().readObject(t, s[r]);
        }
        throw this.mixin.decorateServiceException(Object.assign(l, o, {
            $fault: c.getMergedTraits().error,
            message: u
        }, f), s);
    }
    getDefaultContentType() {
        return "application/json";
    }
}
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/1~976.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "package_namespaceObject",
    ()=>a
]);
var a = {
    rE: "3.964.0"
};
;
}),
"[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/1~518.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "CreateOAuth2TokenCommand",
    ()=>ts,
    "SigninClient",
    ()=>eT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/131.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$1$7e$489$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/1~489.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$1$7e$300$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/1~300.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$1$7e$976$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/1~976.mjs [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$1$7e$300$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$1$7e$300$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
let defaultSigninHttpAuthSchemeParametersProvider = async (e, t, n)=>({
        operation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getSmithyContext"])(t).operation,
        region: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["normalizeProvider"])(e.region)() || (()=>{
            throw Error("expected `region` to be configured for `aws.auth#sigv4`");
        })()
    });
function createAwsAuthSigv4HttpAuthOption(e) {
    return {
        schemeId: "aws.auth#sigv4",
        signingProperties: {
            name: "signin",
            region: e.region
        },
        propertiesExtractor: (e, t)=>({
                signingProperties: {
                    config: e,
                    context: t
                }
            })
    };
}
function createSmithyApiNoAuthHttpAuthOption(e) {
    return {
        schemeId: "smithy.api#noAuth"
    };
}
let defaultSigninHttpAuthSchemeProvider = (e)=>{
    let t = [];
    return "CreateOAuth2Token" === e.operation ? t.push(createSmithyApiNoAuthHttpAuthOption(e)) : t.push(createAwsAuthSigv4HttpAuthOption(e)), t;
}, ep = {
    UseFIPS: {
        type: "builtInParams",
        name: "useFipsEndpoint"
    },
    Endpoint: {
        type: "builtInParams",
        name: "endpoint"
    },
    Region: {
        type: "builtInParams",
        name: "region"
    },
    UseDualStack: {
        type: "builtInParams",
        name: "useDualstackEndpoint"
    }
}, ec = "required", eu = "argv", ed = "isSet", eh = "booleanEquals", el = "error", eg = "endpoint", ef = "tree", em = "PartitionResult", eS = "stringEquals", ey = {
    [ec]: !0,
    default: !1,
    type: "boolean"
}, eP = {
    [ec]: !1,
    type: "string"
}, eA = {
    ref: "Endpoint"
}, ev = {
    fn: eh,
    [eu]: [
        {
            ref: "UseFIPS"
        },
        !0
    ]
}, eE = {
    fn: eh,
    [eu]: [
        {
            ref: "UseDualStack"
        },
        !0
    ]
}, ek = {}, eI = {
    fn: "getAttr",
    [eu]: [
        {
            ref: em
        },
        "name"
    ]
}, ew = {
    fn: eh,
    [eu]: [
        {
            ref: "UseFIPS"
        },
        !1
    ]
}, eb = {
    fn: eh,
    [eu]: [
        {
            ref: "UseDualStack"
        },
        !1
    ]
}, ex = {
    fn: "getAttr",
    [eu]: [
        {
            ref: em
        },
        "supportsFIPS"
    ]
}, eC = {
    fn: eh,
    [eu]: [
        !0,
        {
            fn: "getAttr",
            [eu]: [
                {
                    ref: em
                },
                "supportsDualStack"
            ]
        }
    ]
}, eR = [
    {
        ref: "Region"
    }
], eO = {
    version: "1.0",
    parameters: {
        UseDualStack: ey,
        UseFIPS: ey,
        Endpoint: eP,
        Region: eP
    },
    rules: [
        {
            conditions: [
                {
                    fn: ed,
                    [eu]: [
                        eA
                    ]
                }
            ],
            rules: [
                {
                    conditions: [
                        ev
                    ],
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    type: el
                },
                {
                    rules: [
                        {
                            conditions: [
                                eE
                            ],
                            error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                            type: el
                        },
                        {
                            endpoint: {
                                url: eA,
                                properties: ek,
                                headers: ek
                            },
                            type: eg
                        }
                    ],
                    type: ef
                }
            ],
            type: ef
        },
        {
            rules: [
                {
                    conditions: [
                        {
                            fn: ed,
                            [eu]: eR
                        }
                    ],
                    rules: [
                        {
                            conditions: [
                                {
                                    fn: "aws.partition",
                                    [eu]: eR,
                                    assign: em
                                }
                            ],
                            rules: [
                                {
                                    conditions: [
                                        {
                                            fn: eS,
                                            [eu]: [
                                                eI,
                                                "aws"
                                            ]
                                        },
                                        ew,
                                        eb
                                    ],
                                    endpoint: {
                                        url: "https://{Region}.signin.aws.amazon.com",
                                        properties: ek,
                                        headers: ek
                                    },
                                    type: eg
                                },
                                {
                                    conditions: [
                                        {
                                            fn: eS,
                                            [eu]: [
                                                eI,
                                                "aws-cn"
                                            ]
                                        },
                                        ew,
                                        eb
                                    ],
                                    endpoint: {
                                        url: "https://{Region}.signin.amazonaws.cn",
                                        properties: ek,
                                        headers: ek
                                    },
                                    type: eg
                                },
                                {
                                    conditions: [
                                        {
                                            fn: eS,
                                            [eu]: [
                                                eI,
                                                "aws-us-gov"
                                            ]
                                        },
                                        ew,
                                        eb
                                    ],
                                    endpoint: {
                                        url: "https://{Region}.signin.amazonaws-us-gov.com",
                                        properties: ek,
                                        headers: ek
                                    },
                                    type: eg
                                },
                                {
                                    conditions: [
                                        ev,
                                        eE
                                    ],
                                    rules: [
                                        {
                                            conditions: [
                                                {
                                                    fn: eh,
                                                    [eu]: [
                                                        !0,
                                                        ex
                                                    ]
                                                },
                                                eC
                                            ],
                                            rules: [
                                                {
                                                    endpoint: {
                                                        url: "https://signin-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                                        properties: ek,
                                                        headers: ek
                                                    },
                                                    type: eg
                                                }
                                            ],
                                            type: ef
                                        },
                                        {
                                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                                            type: el
                                        }
                                    ],
                                    type: ef
                                },
                                {
                                    conditions: [
                                        ev,
                                        eb
                                    ],
                                    rules: [
                                        {
                                            conditions: [
                                                {
                                                    fn: eh,
                                                    [eu]: [
                                                        ex,
                                                        !0
                                                    ]
                                                }
                                            ],
                                            rules: [
                                                {
                                                    endpoint: {
                                                        url: "https://signin-fips.{Region}.{PartitionResult#dnsSuffix}",
                                                        properties: ek,
                                                        headers: ek
                                                    },
                                                    type: eg
                                                }
                                            ],
                                            type: ef
                                        },
                                        {
                                            error: "FIPS is enabled but this partition does not support FIPS",
                                            type: el
                                        }
                                    ],
                                    type: ef
                                },
                                {
                                    conditions: [
                                        ew,
                                        eE
                                    ],
                                    rules: [
                                        {
                                            conditions: [
                                                eC
                                            ],
                                            rules: [
                                                {
                                                    endpoint: {
                                                        url: "https://signin.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                                        properties: ek,
                                                        headers: ek
                                                    },
                                                    type: eg
                                                }
                                            ],
                                            type: ef
                                        },
                                        {
                                            error: "DualStack is enabled but this partition does not support DualStack",
                                            type: el
                                        }
                                    ],
                                    type: ef
                                },
                                {
                                    endpoint: {
                                        url: "https://signin.{Region}.{PartitionResult#dnsSuffix}",
                                        properties: ek,
                                        headers: ek
                                    },
                                    type: eg
                                }
                            ],
                            type: ef
                        }
                    ],
                    type: ef
                },
                {
                    error: "Invalid Configuration: Missing Region",
                    type: el
                }
            ],
            type: ef
        }
    ]
}, eD = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["EndpointCache"]({
    size: 50,
    params: [
        "Endpoint",
        "Region",
        "UseDualStack",
        "UseFIPS"
    ]
}), defaultEndpointResolver = (e, t = {})=>eD.get(e, ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveEndpoint"])(eO, {
            endpointParams: e,
            logger: t.logger
        }));
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["customEndpointFunctions"].aws = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["awsEndpointFunctions"];
class eT extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Client"] {
    config;
    constructor(...[n]){
        var u, d, g, P;
        let A, _, U, M, K, ep, ec, eu, ed = (u = n || {}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emitWarningIfUnsupportedVersion_emitWarningIfUnsupportedVersion"])(process.version), A = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveDefaultsModeConfig"])(u), _ = ()=>A().then(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadConfigsForDefaultMode"]), U = {
            apiVersion: "2023-01-01",
            base64Decoder: u?.base64Decoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromBase64"],
            base64Encoder: u?.base64Encoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toBase64"],
            disableHostPrefix: u?.disableHostPrefix ?? !1,
            endpointProvider: u?.endpointProvider ?? defaultEndpointResolver,
            extensions: u?.extensions ?? [],
            httpAuthSchemeProvider: u?.httpAuthSchemeProvider ?? defaultSigninHttpAuthSchemeProvider,
            httpAuthSchemes: u?.httpAuthSchemes ?? [
                {
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (e)=>e.getIdentityProvider("aws.auth#sigv4"),
                    signer: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AwsSdkSigV4Signer"]
                },
                {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (e)=>e.getIdentityProvider("smithy.api#noAuth") || (async ()=>({})),
                    signer: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$1$7e$489$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NoAuthSigner"]
                }
            ],
            logger: u?.logger ?? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NoOpLogger"],
            protocol: u?.protocol ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$1$7e$300$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AwsRestJsonProtocol"],
            protocolSettings: u?.protocolSettings ?? {
                defaultNamespace: "com.amazonaws.signin",
                version: "2023-01-01",
                serviceTarget: "Signin"
            },
            serviceId: u?.serviceId ?? "Signin",
            urlParser: u?.urlParser ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["dist_es_parseUrl"],
            utf8Decoder: u?.utf8Decoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromUtf8_fromUtf8"],
            utf8Encoder: u?.utf8Encoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["dist_es_toUtf8_toUtf8"]
        }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emitWarningIfUnsupportedVersion"])(process.version), M = {
            profile: u?.profile,
            logger: U.logger
        }, {
            ...U,
            ...u,
            runtime: "node",
            defaultsMode: A,
            authSchemePreference: u?.authSchemePreference ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NODE_AUTH_SCHEME_PREFERENCE_OPTIONS"], M),
            bodyLengthChecker: u?.bodyLengthChecker ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["calculateBodyLength"],
            defaultUserAgentProvider: u?.defaultUserAgentProvider ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createDefaultUserAgentProvider"])({
                serviceId: U.serviceId,
                clientVersion: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$1$7e$976$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["package_namespaceObject"].rE
            }),
            maxAttempts: u?.maxAttempts ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NODE_MAX_ATTEMPT_CONFIG_OPTIONS"], u),
            region: u?.region ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NODE_REGION_CONFIG_OPTIONS"], {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NODE_REGION_CONFIG_FILE_OPTIONS"],
                ...M
            }),
            requestHandler: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NodeHttpHandler"].create(u?.requestHandler ?? _),
            retryMode: u?.retryMode ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadConfig"])({
                ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NODE_RETRY_MODE_CONFIG_OPTIONS"],
                default: async ()=>(await _()).retryMode || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DEFAULT_RETRY_MODE"]
            }, u),
            sha256: u?.sha256 ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Hash"].bind(null, "sha256"),
            streamCollector: u?.streamCollector ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["streamCollector"],
            useDualstackEndpoint: u?.useDualstackEndpoint ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS"], M),
            useFipsEndpoint: u?.useFipsEndpoint ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS"], M),
            userAgentAppId: u?.userAgentAppId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NODE_APP_ID_CONFIG_OPTIONS"], M)
        });
        super(ed), this.initConfig = ed;
        let eh = (g = Object.assign((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveAwsSdkSigV4Config"])(d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveEndpointConfig"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveHostHeaderConfig"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveRegionConfig"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveRetryConfig"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveUserAgentConfig"])(Object.assign(ed, {
            useDualstackEndpoint: ed.useDualstackEndpoint ?? !1,
            useFipsEndpoint: ed.useFipsEndpoint ?? !1,
            defaultSigningName: "signin"
        }))))))), {
            authSchemePreference: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["normalizeProvider"])(d.authSchemePreference ?? [])
        }), P = n?.extensions || [], eu = Object.assign((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getAwsRegionExtensionConfiguration"])(g), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDefaultExtensionConfiguration"])(g), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getHttpHandlerExtensionConfiguration"])(g), (K = g.httpAuthSchemes, ep = g.httpAuthSchemeProvider, ec = g.credentials, {
            setHttpAuthScheme (e) {
                let t = K.findIndex((t)=>t.schemeId === e.schemeId);
                -1 === t ? K.push(e) : K.splice(t, 1, e);
            },
            httpAuthSchemes: ()=>K,
            setHttpAuthSchemeProvider (e) {
                ep = e;
            },
            httpAuthSchemeProvider: ()=>ep,
            setCredentials (e) {
                ec = e;
            },
            credentials: ()=>ec
        })), P.forEach((e)=>e.configure(eu)), Object.assign(g, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveAwsRegionExtensionConfiguration"])(eu), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveDefaultRuntimeConfig"])(eu), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveHttpHandlerRuntimeConfig"])(eu), {
            httpAuthSchemes: eu.httpAuthSchemes(),
            httpAuthSchemeProvider: eu.httpAuthSchemeProvider(),
            credentials: eu.credentials()
        }));
        this.config = eh, this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getSchemaSerdePlugin"])(this.config)), this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getUserAgentPlugin"])(this.config)), this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getRetryPlugin"])(this.config)), this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getContentLengthPlugin"])(this.config)), this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getHostHeaderPlugin"])(this.config)), this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLoggerPlugin"])(this.config)), this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getRecursionDetectionPlugin"])(this.config)), this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getHttpAuthSchemeEndpointRuleSetPlugin"])(this.config, {
            httpAuthSchemeParametersProvider: defaultSigninHttpAuthSchemeParametersProvider,
            identityProviderConfigProvider: async (e)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DefaultIdentityProviderConfig"]({
                    "aws.auth#sigv4": e.credentials
                })
        })), this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getHttpSigningPlugin"])(this.config));
    }
    destroy() {
        super.destroy();
    }
}
class e_ extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ServiceException"] {
    constructor(e){
        super(e), Object.setPrototypeOf(this, e_.prototype);
    }
}
class eH extends e_ {
    name = "AccessDeniedException";
    $fault = "client";
    error;
    constructor(e){
        super({
            name: "AccessDeniedException",
            $fault: "client",
            ...e
        }), Object.setPrototypeOf(this, eH.prototype), this.error = e.error;
    }
}
class eU extends e_ {
    name = "InternalServerException";
    $fault = "server";
    error;
    constructor(e){
        super({
            name: "InternalServerException",
            $fault: "server",
            ...e
        }), Object.setPrototypeOf(this, eU.prototype), this.error = e.error;
    }
}
class eF extends e_ {
    name = "TooManyRequestsError";
    $fault = "client";
    error;
    constructor(e){
        super({
            name: "TooManyRequestsError",
            $fault: "client",
            ...e
        }), Object.setPrototypeOf(this, eF.prototype), this.error = e.error;
    }
}
class eM extends e_ {
    name = "ValidationException";
    $fault = "client";
    error;
    constructor(e){
        super({
            name: "ValidationException",
            $fault: "client",
            ...e
        }), Object.setPrototypeOf(this, eM.prototype), this.error = e.error;
    }
}
let ej = "accessKeyId", eq = "accessToken", eK = "client", eN = "clientId", e$ = "codeVerifier", ez = "error", eV = "expiresIn", eB = "grantType", eL = "httpError", eG = "idToken", eJ = "jsonName", eQ = "message", eW = "refreshToken", eX = "redirectUri", eY = "secretAccessKey", eZ = "sessionToken", e0 = "smithy.ts.sdk.synthetic.com.amazonaws.signin", e1 = "tokenType", e2 = "com.amazonaws.signin";
var e3 = [
    0,
    e2,
    "RefreshToken",
    8,
    0
], e4 = [
    -3,
    e2,
    "AccessDeniedException",
    {
        [ez]: eK
    },
    [
        ez,
        eQ
    ],
    [
        0,
        0
    ]
];
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TypeRegistry"].for(e2).registerError(e4, eH);
var e6 = [
    3,
    e2,
    "AccessToken",
    8,
    [
        ej,
        eY,
        eZ
    ],
    [
        [
            0,
            {
                [eJ]: ej
            }
        ],
        [
            0,
            {
                [eJ]: eY
            }
        ],
        [
            0,
            {
                [eJ]: eZ
            }
        ]
    ]
], e8 = [
    3,
    e2,
    "CreateOAuth2TokenRequest",
    0,
    [
        "tokenInput"
    ],
    [
        [
            ()=>e5,
            16
        ]
    ]
], e5 = [
    3,
    e2,
    "CreateOAuth2TokenRequestBody",
    0,
    [
        eN,
        eB,
        "code",
        eX,
        e$,
        eW
    ],
    [
        [
            0,
            {
                [eJ]: eN
            }
        ],
        [
            0,
            {
                [eJ]: eB
            }
        ],
        0,
        [
            0,
            {
                [eJ]: eX
            }
        ],
        [
            0,
            {
                [eJ]: e$
            }
        ],
        [
            ()=>e3,
            {
                [eJ]: eW
            }
        ]
    ]
], e9 = [
    3,
    e2,
    "CreateOAuth2TokenResponse",
    0,
    [
        "tokenOutput"
    ],
    [
        [
            ()=>e7,
            16
        ]
    ]
], e7 = [
    3,
    e2,
    "CreateOAuth2TokenResponseBody",
    0,
    [
        eq,
        e1,
        eV,
        eW,
        eG
    ],
    [
        [
            ()=>e6,
            {
                [eJ]: eq
            }
        ],
        [
            0,
            {
                [eJ]: e1
            }
        ],
        [
            1,
            {
                [eJ]: eV
            }
        ],
        [
            ()=>e3,
            {
                [eJ]: eW
            }
        ],
        [
            0,
            {
                [eJ]: eG
            }
        ]
    ]
], te = [
    -3,
    e2,
    "InternalServerException",
    {
        [ez]: "server",
        [eL]: 500
    },
    [
        ez,
        eQ
    ],
    [
        0,
        0
    ]
];
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TypeRegistry"].for(e2).registerError(te, eU);
var tt = [
    -3,
    e2,
    "TooManyRequestsError",
    {
        [ez]: eK,
        [eL]: 429
    },
    [
        ez,
        eQ
    ],
    [
        0,
        0
    ]
];
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TypeRegistry"].for(e2).registerError(tt, eF);
var tr = [
    -3,
    e2,
    "ValidationException",
    {
        [ez]: eK,
        [eL]: 400
    },
    [
        ez,
        eQ
    ],
    [
        0,
        0
    ]
];
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TypeRegistry"].for(e2).registerError(tr, eM);
var tn = [
    -3,
    e0,
    "SigninServiceException",
    0,
    [],
    []
];
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TypeRegistry"].for(e0).registerError(tn, e_);
var ti = [
    9,
    e2,
    "CreateOAuth2Token",
    {
        http: [
            "POST",
            "/v1/token",
            200
        ]
    },
    ()=>e8,
    ()=>e9
];
class ts extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["command_Command"].classBuilder().ep(ep).m(function(e, t, r, n) {
    return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getEndpointPlugin"])(r, e.getEndpointParameterInstructions())
    ];
}).s("Signin", "CreateOAuth2Token", {}).n("SigninClient", "CreateOAuth2TokenCommand").sc(ti).build() {
}
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=debf3_coze-coding-dev-sdk_dist_esm_fca61103._.js.map