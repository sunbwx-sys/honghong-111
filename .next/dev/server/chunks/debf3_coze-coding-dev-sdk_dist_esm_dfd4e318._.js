module.exports = [
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
"[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/1~45.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "CreateTokenCommand",
    ()=>rp,
    "SSOOIDCClient",
    ()=>eR
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
let defaultSSOOIDCHttpAuthSchemeParametersProvider = async (e, r, o)=>({
        operation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getSmithyContext"])(r).operation,
        region: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["normalizeProvider"])(e.region)() || (()=>{
            throw Error("expected `region` to be configured for `aws.auth#sigv4`");
        })()
    });
function createAwsAuthSigv4HttpAuthOption(e) {
    return {
        schemeId: "aws.auth#sigv4",
        signingProperties: {
            name: "sso-oauth",
            region: e.region
        },
        propertiesExtractor: (e, r)=>({
                signingProperties: {
                    config: e,
                    context: r
                }
            })
    };
}
function createSmithyApiNoAuthHttpAuthOption(e) {
    return {
        schemeId: "smithy.api#noAuth"
    };
}
let defaultSSOOIDCHttpAuthSchemeProvider = (e)=>{
    let r = [];
    return "CreateToken" === e.operation ? r.push(createSmithyApiNoAuthHttpAuthOption(e)) : r.push(createAwsAuthSigv4HttpAuthOption(e)), r;
}, ec = {
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
}, ep = "required", ed = "argv", eu = "isSet", el = "booleanEquals", eh = "error", ef = "endpoint", em = "tree", eS = "PartitionResult", eg = "getAttr", ev = {
    [ep]: !1,
    type: "string"
}, eE = {
    [ep]: !0,
    default: !1,
    type: "boolean"
}, ey = {
    ref: "Endpoint"
}, eP = {
    fn: el,
    [ed]: [
        {
            ref: "UseFIPS"
        },
        !0
    ]
}, ex = {
    fn: el,
    [ed]: [
        {
            ref: "UseDualStack"
        },
        !0
    ]
}, eI = {}, eA = {
    fn: eg,
    [ed]: [
        {
            ref: eS
        },
        "supportsFIPS"
    ]
}, e_ = {
    ref: eS
}, eO = {
    fn: el,
    [ed]: [
        !0,
        {
            fn: eg,
            [ed]: [
                e_,
                "supportsDualStack"
            ]
        }
    ]
}, eC = [
    eP
], ek = [
    ex
], eb = [
    {
        ref: "Region"
    }
], ew = {
    version: "1.0",
    parameters: {
        Region: ev,
        UseDualStack: eE,
        UseFIPS: eE,
        Endpoint: ev
    },
    rules: [
        {
            conditions: [
                {
                    fn: eu,
                    [ed]: [
                        ey
                    ]
                }
            ],
            rules: [
                {
                    conditions: eC,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    type: eh
                },
                {
                    conditions: ek,
                    error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                    type: eh
                },
                {
                    endpoint: {
                        url: ey,
                        properties: eI,
                        headers: eI
                    },
                    type: ef
                }
            ],
            type: em
        },
        {
            conditions: [
                {
                    fn: eu,
                    [ed]: eb
                }
            ],
            rules: [
                {
                    conditions: [
                        {
                            fn: "aws.partition",
                            [ed]: eb,
                            assign: eS
                        }
                    ],
                    rules: [
                        {
                            conditions: [
                                eP,
                                ex
                            ],
                            rules: [
                                {
                                    conditions: [
                                        {
                                            fn: el,
                                            [ed]: [
                                                !0,
                                                eA
                                            ]
                                        },
                                        eO
                                    ],
                                    rules: [
                                        {
                                            endpoint: {
                                                url: "https://oidc-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                                properties: eI,
                                                headers: eI
                                            },
                                            type: ef
                                        }
                                    ],
                                    type: em
                                },
                                {
                                    error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                                    type: eh
                                }
                            ],
                            type: em
                        },
                        {
                            conditions: eC,
                            rules: [
                                {
                                    conditions: [
                                        {
                                            fn: el,
                                            [ed]: [
                                                eA,
                                                !0
                                            ]
                                        }
                                    ],
                                    rules: [
                                        {
                                            conditions: [
                                                {
                                                    fn: "stringEquals",
                                                    [ed]: [
                                                        {
                                                            fn: eg,
                                                            [ed]: [
                                                                e_,
                                                                "name"
                                                            ]
                                                        },
                                                        "aws-us-gov"
                                                    ]
                                                }
                                            ],
                                            endpoint: {
                                                url: "https://oidc.{Region}.amazonaws.com",
                                                properties: eI,
                                                headers: eI
                                            },
                                            type: ef
                                        },
                                        {
                                            endpoint: {
                                                url: "https://oidc-fips.{Region}.{PartitionResult#dnsSuffix}",
                                                properties: eI,
                                                headers: eI
                                            },
                                            type: ef
                                        }
                                    ],
                                    type: em
                                },
                                {
                                    error: "FIPS is enabled but this partition does not support FIPS",
                                    type: eh
                                }
                            ],
                            type: em
                        },
                        {
                            conditions: ek,
                            rules: [
                                {
                                    conditions: [
                                        eO
                                    ],
                                    rules: [
                                        {
                                            endpoint: {
                                                url: "https://oidc.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                                properties: eI,
                                                headers: eI
                                            },
                                            type: ef
                                        }
                                    ],
                                    type: em
                                },
                                {
                                    error: "DualStack is enabled but this partition does not support DualStack",
                                    type: eh
                                }
                            ],
                            type: em
                        },
                        {
                            endpoint: {
                                url: "https://oidc.{Region}.{PartitionResult#dnsSuffix}",
                                properties: eI,
                                headers: eI
                            },
                            type: ef
                        }
                    ],
                    type: em
                }
            ],
            type: em
        },
        {
            error: "Invalid Configuration: Missing Region",
            type: eh
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
}), defaultEndpointResolver = (e, r = {})=>eD.get(e, ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveEndpoint"])(ew, {
            endpointParams: e,
            logger: r.logger
        }));
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["customEndpointFunctions"].aws = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["awsEndpointFunctions"];
class eR extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Client"] {
    config;
    constructor(...[o]){
        var d, u, f, E;
        let y, T, U, j, q, ec, ep, ed, eu = (d = o || {}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emitWarningIfUnsupportedVersion_emitWarningIfUnsupportedVersion"])(process.version), y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveDefaultsModeConfig"])(d), T = ()=>y().then(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadConfigsForDefaultMode"]), U = {
            apiVersion: "2019-06-10",
            base64Decoder: d?.base64Decoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromBase64"],
            base64Encoder: d?.base64Encoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toBase64"],
            disableHostPrefix: d?.disableHostPrefix ?? !1,
            endpointProvider: d?.endpointProvider ?? defaultEndpointResolver,
            extensions: d?.extensions ?? [],
            httpAuthSchemeProvider: d?.httpAuthSchemeProvider ?? defaultSSOOIDCHttpAuthSchemeProvider,
            httpAuthSchemes: d?.httpAuthSchemes ?? [
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
            logger: d?.logger ?? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NoOpLogger"],
            protocol: d?.protocol ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$1$7e$300$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AwsRestJsonProtocol"],
            protocolSettings: d?.protocolSettings ?? {
                defaultNamespace: "com.amazonaws.ssooidc",
                version: "2019-06-10",
                serviceTarget: "AWSSSOOIDCService"
            },
            serviceId: d?.serviceId ?? "SSO OIDC",
            urlParser: d?.urlParser ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["dist_es_parseUrl"],
            utf8Decoder: d?.utf8Decoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromUtf8_fromUtf8"],
            utf8Encoder: d?.utf8Encoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["dist_es_toUtf8_toUtf8"]
        }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["emitWarningIfUnsupportedVersion"])(process.version), j = {
            profile: d?.profile,
            logger: U.logger
        }, {
            ...U,
            ...d,
            runtime: "node",
            defaultsMode: y,
            authSchemePreference: d?.authSchemePreference ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NODE_AUTH_SCHEME_PREFERENCE_OPTIONS"], j),
            bodyLengthChecker: d?.bodyLengthChecker ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["calculateBodyLength"],
            defaultUserAgentProvider: d?.defaultUserAgentProvider ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createDefaultUserAgentProvider"])({
                serviceId: U.serviceId,
                clientVersion: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$1$7e$976$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["package_namespaceObject"].rE
            }),
            maxAttempts: d?.maxAttempts ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NODE_MAX_ATTEMPT_CONFIG_OPTIONS"], d),
            region: d?.region ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NODE_REGION_CONFIG_OPTIONS"], {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NODE_REGION_CONFIG_FILE_OPTIONS"],
                ...j
            }),
            requestHandler: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NodeHttpHandler"].create(d?.requestHandler ?? T),
            retryMode: d?.retryMode ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadConfig"])({
                ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NODE_RETRY_MODE_CONFIG_OPTIONS"],
                default: async ()=>(await T()).retryMode || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DEFAULT_RETRY_MODE"]
            }, d),
            sha256: d?.sha256 ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Hash"].bind(null, "sha256"),
            streamCollector: d?.streamCollector ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["streamCollector"],
            useDualstackEndpoint: d?.useDualstackEndpoint ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS"], j),
            useFipsEndpoint: d?.useFipsEndpoint ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS"], j),
            userAgentAppId: d?.userAgentAppId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NODE_APP_ID_CONFIG_OPTIONS"], j)
        });
        super(eu), this.initConfig = eu;
        let el = (f = Object.assign((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveAwsSdkSigV4Config"])(u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveEndpointConfig"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveHostHeaderConfig"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveRegionConfig"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveRetryConfig"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveUserAgentConfig"])(Object.assign(eu, {
            useDualstackEndpoint: eu.useDualstackEndpoint ?? !1,
            useFipsEndpoint: eu.useFipsEndpoint ?? !1,
            defaultSigningName: "sso-oauth"
        }))))))), {
            authSchemePreference: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["normalizeProvider"])(u.authSchemePreference ?? [])
        }), E = o?.extensions || [], ed = Object.assign((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getAwsRegionExtensionConfiguration"])(f), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDefaultExtensionConfiguration"])(f), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getHttpHandlerExtensionConfiguration"])(f), (q = f.httpAuthSchemes, ec = f.httpAuthSchemeProvider, ep = f.credentials, {
            setHttpAuthScheme (e) {
                let r = q.findIndex((r)=>r.schemeId === e.schemeId);
                -1 === r ? q.push(e) : q.splice(r, 1, e);
            },
            httpAuthSchemes: ()=>q,
            setHttpAuthSchemeProvider (e) {
                ec = e;
            },
            httpAuthSchemeProvider: ()=>ec,
            setCredentials (e) {
                ep = e;
            },
            credentials: ()=>ep
        })), E.forEach((e)=>e.configure(ed)), Object.assign(f, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveAwsRegionExtensionConfiguration"])(ed), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveDefaultRuntimeConfig"])(ed), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveHttpHandlerRuntimeConfig"])(ed), {
            httpAuthSchemes: ed.httpAuthSchemes(),
            httpAuthSchemeProvider: ed.httpAuthSchemeProvider(),
            credentials: ed.credentials()
        }));
        this.config = el, this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getSchemaSerdePlugin"])(this.config)), this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getUserAgentPlugin"])(this.config)), this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getRetryPlugin"])(this.config)), this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getContentLengthPlugin"])(this.config)), this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getHostHeaderPlugin"])(this.config)), this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLoggerPlugin"])(this.config)), this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getRecursionDetectionPlugin"])(this.config)), this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getHttpAuthSchemeEndpointRuleSetPlugin"])(this.config, {
            httpAuthSchemeParametersProvider: defaultSSOOIDCHttpAuthSchemeParametersProvider,
            identityProviderConfigProvider: async (e)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DefaultIdentityProviderConfig"]({
                    "aws.auth#sigv4": e.credentials
                })
        })), this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getHttpSigningPlugin"])(this.config));
    }
    destroy() {
        super.destroy();
    }
}
class eT extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ServiceException"] {
    constructor(e){
        super(e), Object.setPrototypeOf(this, eT.prototype);
    }
}
class e$ extends eT {
    name = "AccessDeniedException";
    $fault = "client";
    error;
    reason;
    error_description;
    constructor(e){
        super({
            name: "AccessDeniedException",
            $fault: "client",
            ...e
        }), Object.setPrototypeOf(this, e$.prototype), this.error = e.error, this.reason = e.reason, this.error_description = e.error_description;
    }
}
class eU extends eT {
    name = "AuthorizationPendingException";
    $fault = "client";
    error;
    error_description;
    constructor(e){
        super({
            name: "AuthorizationPendingException",
            $fault: "client",
            ...e
        }), Object.setPrototypeOf(this, eU.prototype), this.error = e.error, this.error_description = e.error_description;
    }
}
class eH extends eT {
    name = "ExpiredTokenException";
    $fault = "client";
    error;
    error_description;
    constructor(e){
        super({
            name: "ExpiredTokenException",
            $fault: "client",
            ...e
        }), Object.setPrototypeOf(this, eH.prototype), this.error = e.error, this.error_description = e.error_description;
    }
}
class ej extends eT {
    name = "InternalServerException";
    $fault = "server";
    error;
    error_description;
    constructor(e){
        super({
            name: "InternalServerException",
            $fault: "server",
            ...e
        }), Object.setPrototypeOf(this, ej.prototype), this.error = e.error, this.error_description = e.error_description;
    }
}
class eF extends eT {
    name = "InvalidClientException";
    $fault = "client";
    error;
    error_description;
    constructor(e){
        super({
            name: "InvalidClientException",
            $fault: "client",
            ...e
        }), Object.setPrototypeOf(this, eF.prototype), this.error = e.error, this.error_description = e.error_description;
    }
}
class ez extends eT {
    name = "InvalidGrantException";
    $fault = "client";
    error;
    error_description;
    constructor(e){
        super({
            name: "InvalidGrantException",
            $fault: "client",
            ...e
        }), Object.setPrototypeOf(this, ez.prototype), this.error = e.error, this.error_description = e.error_description;
    }
}
class eq extends eT {
    name = "InvalidRequestException";
    $fault = "client";
    error;
    reason;
    error_description;
    constructor(e){
        super({
            name: "InvalidRequestException",
            $fault: "client",
            ...e
        }), Object.setPrototypeOf(this, eq.prototype), this.error = e.error, this.reason = e.reason, this.error_description = e.error_description;
    }
}
class eK extends eT {
    name = "InvalidScopeException";
    $fault = "client";
    error;
    error_description;
    constructor(e){
        super({
            name: "InvalidScopeException",
            $fault: "client",
            ...e
        }), Object.setPrototypeOf(this, eK.prototype), this.error = e.error, this.error_description = e.error_description;
    }
}
class eM extends eT {
    name = "SlowDownException";
    $fault = "client";
    error;
    error_description;
    constructor(e){
        super({
            name: "SlowDownException",
            $fault: "client",
            ...e
        }), Object.setPrototypeOf(this, eM.prototype), this.error = e.error, this.error_description = e.error_description;
    }
}
class eN extends eT {
    name = "UnauthorizedClientException";
    $fault = "client";
    error;
    error_description;
    constructor(e){
        super({
            name: "UnauthorizedClientException",
            $fault: "client",
            ...e
        }), Object.setPrototypeOf(this, eN.prototype), this.error = e.error, this.error_description = e.error_description;
    }
}
class eG extends eT {
    name = "UnsupportedGrantTypeException";
    $fault = "client";
    error;
    error_description;
    constructor(e){
        super({
            name: "UnsupportedGrantTypeException",
            $fault: "client",
            ...e
        }), Object.setPrototypeOf(this, eG.prototype), this.error = e.error, this.error_description = e.error_description;
    }
}
let eV = "client", eL = "error", eW = "error_description", eB = "httpError", eJ = "reason", eQ = "refreshToken", eX = "smithy.ts.sdk.synthetic.com.amazonaws.ssooidc", eY = "com.amazonaws.ssooidc";
var eZ = [
    0,
    eY,
    "AccessToken",
    8,
    0
], e0 = [
    0,
    eY,
    "ClientSecret",
    8,
    0
], e4 = [
    0,
    eY,
    "CodeVerifier",
    8,
    0
], e1 = [
    0,
    eY,
    "IdToken",
    8,
    0
], e3 = [
    0,
    eY,
    "RefreshToken",
    8,
    0
], e6 = [
    -3,
    eY,
    "AccessDeniedException",
    {
        [eL]: eV,
        [eB]: 400
    },
    [
        eL,
        eJ,
        eW
    ],
    [
        0,
        0,
        0
    ]
];
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TypeRegistry"].for(eY).registerError(e6, e$);
var e8 = [
    -3,
    eY,
    "AuthorizationPendingException",
    {
        [eL]: eV,
        [eB]: 400
    },
    [
        eL,
        eW
    ],
    [
        0,
        0
    ]
];
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TypeRegistry"].for(eY).registerError(e8, eU);
var e2 = [
    3,
    eY,
    "CreateTokenRequest",
    0,
    [
        "clientId",
        "clientSecret",
        "grantType",
        "deviceCode",
        "code",
        eQ,
        "scope",
        "redirectUri",
        "codeVerifier"
    ],
    [
        0,
        [
            ()=>e0,
            0
        ],
        0,
        0,
        0,
        [
            ()=>e3,
            0
        ],
        64,
        0,
        [
            ()=>e4,
            0
        ]
    ]
], e5 = [
    3,
    eY,
    "CreateTokenResponse",
    0,
    [
        "accessToken",
        "tokenType",
        "expiresIn",
        eQ,
        "idToken"
    ],
    [
        [
            ()=>eZ,
            0
        ],
        0,
        1,
        [
            ()=>e3,
            0
        ],
        [
            ()=>e1,
            0
        ]
    ]
], e9 = [
    -3,
    eY,
    "ExpiredTokenException",
    {
        [eL]: eV,
        [eB]: 400
    },
    [
        eL,
        eW
    ],
    [
        0,
        0
    ]
];
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TypeRegistry"].for(eY).registerError(e9, eH);
var e7 = [
    -3,
    eY,
    "InternalServerException",
    {
        [eL]: "server",
        [eB]: 500
    },
    [
        eL,
        eW
    ],
    [
        0,
        0
    ]
];
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TypeRegistry"].for(eY).registerError(e7, ej);
var re = [
    -3,
    eY,
    "InvalidClientException",
    {
        [eL]: eV,
        [eB]: 401
    },
    [
        eL,
        eW
    ],
    [
        0,
        0
    ]
];
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TypeRegistry"].for(eY).registerError(re, eF);
var rr = [
    -3,
    eY,
    "InvalidGrantException",
    {
        [eL]: eV,
        [eB]: 400
    },
    [
        eL,
        eW
    ],
    [
        0,
        0
    ]
];
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TypeRegistry"].for(eY).registerError(rr, ez);
var rt = [
    -3,
    eY,
    "InvalidRequestException",
    {
        [eL]: eV,
        [eB]: 400
    },
    [
        eL,
        eJ,
        eW
    ],
    [
        0,
        0,
        0
    ]
];
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TypeRegistry"].for(eY).registerError(rt, eq);
var ro = [
    -3,
    eY,
    "InvalidScopeException",
    {
        [eL]: eV,
        [eB]: 400
    },
    [
        eL,
        eW
    ],
    [
        0,
        0
    ]
];
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TypeRegistry"].for(eY).registerError(ro, eK);
var ri = [
    -3,
    eY,
    "SlowDownException",
    {
        [eL]: eV,
        [eB]: 400
    },
    [
        eL,
        eW
    ],
    [
        0,
        0
    ]
];
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TypeRegistry"].for(eY).registerError(ri, eM);
var rn = [
    -3,
    eY,
    "UnauthorizedClientException",
    {
        [eL]: eV,
        [eB]: 400
    },
    [
        eL,
        eW
    ],
    [
        0,
        0
    ]
];
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TypeRegistry"].for(eY).registerError(rn, eN);
var rs = [
    -3,
    eY,
    "UnsupportedGrantTypeException",
    {
        [eL]: eV,
        [eB]: 400
    },
    [
        eL,
        eW
    ],
    [
        0,
        0
    ]
];
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TypeRegistry"].for(eY).registerError(rs, eG);
var ra = [
    -3,
    eX,
    "SSOOIDCServiceException",
    0,
    [],
    []
];
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TypeRegistry"].for(eX).registerError(ra, eT);
var rc = [
    9,
    eY,
    "CreateToken",
    {
        http: [
            "POST",
            "/token",
            200
        ]
    },
    ()=>e2,
    ()=>e5
];
class rp extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["command_Command"].classBuilder().ep(ec).m(function(e, r, t, o) {
    return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getEndpointPlugin"])(t, e.getEndpointParameterInstructions())
    ];
}).s("AWSSSOOIDCService", "CreateToken", {}).n("SSOOIDCClient", "CreateTokenCommand").sc(rc).build() {
}
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=debf3_coze-coding-dev-sdk_dist_esm_dfd4e318._.js.map