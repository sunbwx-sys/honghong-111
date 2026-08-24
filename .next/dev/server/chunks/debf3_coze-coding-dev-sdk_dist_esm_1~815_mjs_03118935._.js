module.exports = [
"[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/1~815.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "EventStreamSerde",
    ()=>r
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/coze-coding-dev-sdk@0.7.24_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8__rpwndlttqh7xsa3joidtoglpne/node_modules/coze-coding-dev-sdk/dist/esm/131.mjs [app-route] (ecmascript) <locals>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
class r {
    marshaller;
    serializer;
    deserializer;
    serdeContext;
    defaultContentType;
    constructor({ marshaller: e, serializer: t, deserializer: r, serdeContext: i, defaultContentType: a }){
        this.marshaller = e, this.serializer = t, this.deserializer = r, this.serdeContext = i, this.defaultContentType = a;
    }
    async serializeEventStream({ eventStream: e, requestSchema: t, initialRequest: r }) {
        let i = this.marshaller, a = t.getEventStreamMember(), s = t.getMemberSchema(a), n = this.serializer, l = this.defaultContentType, o = Symbol("initialRequestMarker"), m = {
            async *[Symbol.asyncIterator] () {
                if (r) {
                    n.write(t, r);
                    let e = n.flush();
                    yield {
                        [o]: !0,
                        headers: {
                            ":event-type": {
                                type: "string",
                                value: "initial-request"
                            },
                            ":message-type": {
                                type: "string",
                                value: "event"
                            },
                            ":content-type": {
                                type: "string",
                                value: l
                            }
                        },
                        body: e
                    };
                }
                for await (let t of e)yield t;
            }
        };
        return i.serialize(m, (e)=>{
            if (e[o]) return {
                headers: e.headers,
                body: e.body
            };
            let t = Object.keys(e).find((e)=>"__type" !== e) ?? "", { additionalHeaders: r, body: i, eventType: a, explicitPayloadContentType: n } = this.writeEventBody(t, s, e);
            return {
                headers: {
                    ":event-type": {
                        type: "string",
                        value: a
                    },
                    ":message-type": {
                        type: "string",
                        value: "event"
                    },
                    ":content-type": {
                        type: "string",
                        value: n ?? l
                    },
                    ...r
                },
                body: i
            };
        });
    }
    async deserializeEventStream({ response: t, responseSchema: r, initialResponseContainer: i }) {
        let a = this.marshaller, s = r.getEventStreamMember(), n = r.getMemberSchema(s).getMemberSchemas(), l = Symbol("initialResponseMarker"), o = a.deserialize(t.body, async (t)=>{
            let i = Object.keys(t).find((e)=>"__type" !== e) ?? "", a = t[i].body;
            if ("initial-response" === i) {
                let e = await this.deserializer.read(r, a);
                return delete e[s], {
                    [l]: !0,
                    ...e
                };
            }
            if (!(i in n)) return {
                $unknown: t
            };
            {
                let r = n[i];
                if (r.isStructSchema()) {
                    let s = {}, n = !1;
                    for (let [l, o] of r.structIterator()){
                        let { eventHeader: r, eventPayload: m } = o.getMergedTraits();
                        if (n = n || !!(r || m), m) o.isBlobSchema() ? s[l] = a : o.isStringSchema() ? s[l] = (this.serdeContext?.utf8Encoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["dist_es_toUtf8_toUtf8"])(a) : o.isStructSchema() && (s[l] = await this.deserializer.read(o, a));
                        else if (r) {
                            let e = t[i].headers[l]?.value;
                            null != e && (o.isNumericSchema() ? e && "object" == typeof e && "bytes" in e ? s[l] = BigInt(e.toString()) : s[l] = Number(e) : s[l] = e);
                        }
                    }
                    if (n) return {
                        [i]: s
                    };
                }
                return {
                    [i]: await this.deserializer.read(r, a)
                };
            }
        }), m = o[Symbol.asyncIterator](), c = await m.next();
        if (c.done) return o;
        if (c.value?.[l]) {
            if (!r) throw Error("@smithy::core/protocols - initial-response event encountered in event stream but no response schema given.");
            for (let [e, t] of Object.entries(c.value))i[e] = t;
        }
        return {
            async *[Symbol.asyncIterator] () {
                for(c?.value?.[l] || (yield c.value);;){
                    let { done: e, value: t } = await m.next();
                    if (e) break;
                    yield t;
                }
            }
        };
    }
    writeEventBody(e, r, i) {
        let a, s = this.serializer, n = e, l = null, o = r.getSchema()[4].includes(e), m = {};
        if (o) {
            let t = r.getMemberSchema(e);
            if (t.isStructSchema()) {
                for (let [r, a] of t.structIterator()){
                    let { eventHeader: t, eventPayload: s } = a.getMergedTraits();
                    if (s) l = r;
                    else if (t) {
                        let t = i[e][r], s = "binary";
                        a.isNumericSchema() ? s = -0x80000000 <= t && t <= 0x80000000 - 1 ? "integer" : "long" : a.isTimestampSchema() ? s = "timestamp" : a.isStringSchema() ? s = "string" : a.isBooleanSchema() && (s = "boolean"), null != t && (m[r] = {
                            type: s,
                            value: t
                        }, delete i[e][r]);
                    }
                }
                if (null !== l) {
                    let r = t.getMemberSchema(l);
                    r.isBlobSchema() ? a = "application/octet-stream" : r.isStringSchema() && (a = "text/plain"), s.write(r, i[e][l]);
                } else s.write(t, i[e]);
            } else throw Error("@smithy/core/event-streams - non-struct member not supported in event stream union.");
        } else {
            let [t, r] = i[e];
            n = t, s.write(15, r);
        }
        let c = s.flush();
        return {
            body: "string" == typeof c ? (this.serdeContext?.utf8Decoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$coze$2d$coding$2d$dev$2d$sdk$40$0$2e$7$2e$24_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$5f$rpwndlttqh7xsa3joidtoglpne$2f$node_modules$2f$coze$2d$coding$2d$dev$2d$sdk$2f$dist$2f$esm$2f$131$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromUtf8_fromUtf8"])(c) : c,
            eventType: n,
            explicitPayloadContentType: a,
            additionalHeaders: m
        };
    }
}
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=debf3_coze-coding-dev-sdk_dist_esm_1~815_mjs_03118935._.js.map