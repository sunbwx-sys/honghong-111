module.exports = [
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/partial-json-parser/parser.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MalformedJSON",
    ()=>MalformedJSON,
    "PartialJSON",
    ()=>PartialJSON,
    "partialParse",
    ()=>partialParse
]);
const STR = 0b000000001;
const NUM = 0b000000010;
const ARR = 0b000000100;
const OBJ = 0b000001000;
const NULL = 0b000010000;
const BOOL = 0b000100000;
const NAN = 0b001000000;
const INFINITY = 0b010000000;
const MINUS_INFINITY = 0b100000000;
const INF = INFINITY | MINUS_INFINITY;
const SPECIAL = NULL | BOOL | INF | NAN;
const ATOM = STR | NUM | SPECIAL;
const COLLECTION = ARR | OBJ;
const ALL = ATOM | COLLECTION;
const Allow = {
    STR,
    NUM,
    ARR,
    OBJ,
    NULL,
    BOOL,
    NAN,
    INFINITY,
    MINUS_INFINITY,
    INF,
    SPECIAL,
    ATOM,
    COLLECTION,
    ALL
};
// The JSON string segment was unable to be parsed completely
class PartialJSON extends Error {
}
class MalformedJSON extends Error {
}
/**
 * Parse incomplete JSON
 * @param {string} jsonString Partial JSON to be parsed
 * @param {number} allowPartial Specify what types are allowed to be partial, see {@link Allow} for details
 * @returns The parsed JSON
 * @throws {PartialJSON} If the JSON is incomplete (related to the `allow` parameter)
 * @throws {MalformedJSON} If the JSON is malformed
 */ function parseJSON(jsonString, allowPartial = Allow.ALL) {
    if (typeof jsonString !== 'string') {
        throw new TypeError(`expecting str, got ${typeof jsonString}`);
    }
    if (!jsonString.trim()) {
        throw new Error(`${jsonString} is empty`);
    }
    return _parseJSON(jsonString.trim(), allowPartial);
}
const _parseJSON = (jsonString, allow)=>{
    const length = jsonString.length;
    let index = 0;
    const markPartialJSON = (msg)=>{
        throw new PartialJSON(`${msg} at position ${index}`);
    };
    const throwMalformedError = (msg)=>{
        throw new MalformedJSON(`${msg} at position ${index}`);
    };
    const parseAny = ()=>{
        skipBlank();
        if (index >= length) markPartialJSON('Unexpected end of input');
        if (jsonString[index] === '"') return parseStr();
        if (jsonString[index] === '{') return parseObj();
        if (jsonString[index] === '[') return parseArr();
        if (jsonString.substring(index, index + 4) === 'null' || Allow.NULL & allow && length - index < 4 && 'null'.startsWith(jsonString.substring(index))) {
            index += 4;
            return null;
        }
        if (jsonString.substring(index, index + 4) === 'true' || Allow.BOOL & allow && length - index < 4 && 'true'.startsWith(jsonString.substring(index))) {
            index += 4;
            return true;
        }
        if (jsonString.substring(index, index + 5) === 'false' || Allow.BOOL & allow && length - index < 5 && 'false'.startsWith(jsonString.substring(index))) {
            index += 5;
            return false;
        }
        if (jsonString.substring(index, index + 8) === 'Infinity' || Allow.INFINITY & allow && length - index < 8 && 'Infinity'.startsWith(jsonString.substring(index))) {
            index += 8;
            return Infinity;
        }
        if (jsonString.substring(index, index + 9) === '-Infinity' || Allow.MINUS_INFINITY & allow && 1 < length - index && length - index < 9 && '-Infinity'.startsWith(jsonString.substring(index))) {
            index += 9;
            return -Infinity;
        }
        if (jsonString.substring(index, index + 3) === 'NaN' || Allow.NAN & allow && length - index < 3 && 'NaN'.startsWith(jsonString.substring(index))) {
            index += 3;
            return NaN;
        }
        return parseNum();
    };
    const parseStr = ()=>{
        const start = index;
        let escape = false;
        index++; // skip initial quote
        while(index < length && (jsonString[index] !== '"' || escape && jsonString[index - 1] === '\\')){
            escape = jsonString[index] === '\\' ? !escape : false;
            index++;
        }
        if (jsonString.charAt(index) == '"') {
            try {
                return JSON.parse(jsonString.substring(start, ++index - Number(escape)));
            } catch (e) {
                throwMalformedError(String(e));
            }
        } else if (Allow.STR & allow) {
            try {
                return JSON.parse(jsonString.substring(start, index - Number(escape)) + '"');
            } catch (e) {
                // SyntaxError: Invalid escape sequence
                return JSON.parse(jsonString.substring(start, jsonString.lastIndexOf('\\')) + '"');
            }
        }
        markPartialJSON('Unterminated string literal');
    };
    const parseObj = ()=>{
        index++; // skip initial brace
        skipBlank();
        const obj = {};
        try {
            while(jsonString[index] !== '}'){
                skipBlank();
                if (index >= length && Allow.OBJ & allow) return obj;
                const key = parseStr();
                skipBlank();
                index++; // skip colon
                try {
                    const value = parseAny();
                    Object.defineProperty(obj, key, {
                        value,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                } catch (e) {
                    if (Allow.OBJ & allow) return obj;
                    else throw e;
                }
                skipBlank();
                if (jsonString[index] === ',') index++; // skip comma
            }
        } catch (e) {
            if (Allow.OBJ & allow) return obj;
            else markPartialJSON("Expected '}' at end of object");
        }
        index++; // skip final brace
        return obj;
    };
    const parseArr = ()=>{
        index++; // skip initial bracket
        const arr = [];
        try {
            while(jsonString[index] !== ']'){
                arr.push(parseAny());
                skipBlank();
                if (jsonString[index] === ',') {
                    index++; // skip comma
                }
            }
        } catch (e) {
            if (Allow.ARR & allow) {
                return arr;
            }
            markPartialJSON("Expected ']' at end of array");
        }
        index++; // skip final bracket
        return arr;
    };
    const parseNum = ()=>{
        if (index === 0) {
            if (jsonString === '-' && Allow.NUM & allow) markPartialJSON("Not sure what '-' is");
            try {
                return JSON.parse(jsonString);
            } catch (e) {
                if (Allow.NUM & allow) {
                    try {
                        if ('.' === jsonString[jsonString.length - 1]) return JSON.parse(jsonString.substring(0, jsonString.lastIndexOf('.')));
                        return JSON.parse(jsonString.substring(0, jsonString.lastIndexOf('e')));
                    } catch (e) {}
                }
                throwMalformedError(String(e));
            }
        }
        const start = index;
        if (jsonString[index] === '-') index++;
        while(jsonString[index] && !',]}'.includes(jsonString[index]))index++;
        if (index == length && !(Allow.NUM & allow)) markPartialJSON('Unterminated number literal');
        try {
            return JSON.parse(jsonString.substring(start, index));
        } catch (e) {
            if (jsonString.substring(start, index) === '-' && Allow.NUM & allow) markPartialJSON("Not sure what '-' is");
            try {
                return JSON.parse(jsonString.substring(start, jsonString.lastIndexOf('e')));
            } catch (e) {
                throwMalformedError(String(e));
            }
        }
    };
    const skipBlank = ()=>{
        while(index < length && ' \n\r\t'.includes(jsonString[index])){
            index++;
        }
    };
    return parseAny();
};
// using this function with malformed JSON is undefined behavior
const partialParse = (input)=>parseJSON(input, Allow.ALL ^ Allow.NUM);
;
 //# sourceMappingURL=parser.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/Options.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDefaultOptions",
    ()=>getDefaultOptions,
    "ignoreOverride",
    ()=>ignoreOverride
]);
const ignoreOverride = Symbol('Let zodToJsonSchema decide on which parser to use');
const defaultOptions = {
    name: undefined,
    $refStrategy: 'root',
    effectStrategy: 'input',
    pipeStrategy: 'all',
    dateStrategy: 'format:date-time',
    mapStrategy: 'entries',
    nullableStrategy: 'from-target',
    removeAdditionalStrategy: 'passthrough',
    definitionPath: 'definitions',
    target: 'jsonSchema7',
    strictUnions: false,
    errorMessages: false,
    markdownDescription: false,
    patternStrategy: 'escape',
    applyRegexFlags: false,
    emailStrategy: 'format:email',
    base64Strategy: 'contentEncoding:base64',
    nameStrategy: 'ref'
};
const getDefaultOptions = (options)=>{
    // We need to add `definitions` here as we may mutate it
    return typeof options === 'string' ? {
        ...defaultOptions,
        basePath: [
            '#'
        ],
        definitions: {},
        name: options
    } : {
        ...defaultOptions,
        basePath: [
            '#'
        ],
        definitions: {},
        ...options
    };
}; //# sourceMappingURL=Options.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/util.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isEmptyObj",
    ()=>isEmptyObj,
    "zodDef",
    ()=>zodDef
]);
const zodDef = (zodSchema)=>{
    return '_def' in zodSchema ? zodSchema._def : zodSchema;
};
function isEmptyObj(obj) {
    if (!obj) return true;
    for(const _k in obj)return false;
    return true;
} //# sourceMappingURL=util.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/Refs.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRefs",
    ()=>getRefs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$Options$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/Options.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$util$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/util.mjs [app-route] (ecmascript)");
;
;
const getRefs = (options)=>{
    const _options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$Options$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultOptions"])(options);
    const currentPath = _options.name !== undefined ? [
        ..._options.basePath,
        _options.definitionPath,
        _options.name
    ] : _options.basePath;
    return {
        ..._options,
        currentPath: currentPath,
        propertyPath: undefined,
        seenRefs: new Set(),
        seen: new Map(Object.entries(_options.definitions).map(([name, def])=>[
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$util$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["zodDef"])(def),
                {
                    def: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$util$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["zodDef"])(def),
                    path: [
                        ..._options.basePath,
                        _options.definitionPath,
                        name
                    ],
                    // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
                    jsonSchema: undefined
                }
            ]))
    };
}; //# sourceMappingURL=Refs.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/errorMessages.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addErrorMessage",
    ()=>addErrorMessage,
    "setResponseValueAndErrors",
    ()=>setResponseValueAndErrors
]);
function addErrorMessage(res, key, errorMessage, refs) {
    if (!refs?.errorMessages) return;
    if (errorMessage) {
        res.errorMessage = {
            ...res.errorMessage,
            [key]: errorMessage
        };
    }
}
function setResponseValueAndErrors(res, key, value, errorMessage, refs) {
    res[key] = value;
    addErrorMessage(res, key, errorMessage, refs);
} //# sourceMappingURL=errorMessages.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/any.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseAnyDef",
    ()=>parseAnyDef
]);
function parseAnyDef() {
    return {};
} //# sourceMappingURL=any.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/array.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseArrayDef",
    ()=>parseArrayDef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.3.6/node_modules/zod/v3/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.3.6/node_modules/zod/v3/types.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/errorMessages.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parseDef.mjs [app-route] (ecmascript)");
;
;
;
function parseArrayDef(def, refs) {
    const res = {
        type: 'array'
    };
    if (def.type?._def?.typeName !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodAny) {
        res.items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.type._def, {
            ...refs,
            currentPath: [
                ...refs.currentPath,
                'items'
            ]
        });
    }
    if (def.minLength) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'minItems', def.minLength.value, def.minLength.message, refs);
    }
    if (def.maxLength) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'maxItems', def.maxLength.value, def.maxLength.message, refs);
    }
    if (def.exactLength) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'minItems', def.exactLength.value, def.exactLength.message, refs);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'maxItems', def.exactLength.value, def.exactLength.message, refs);
    }
    return res;
} //# sourceMappingURL=array.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/bigint.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseBigintDef",
    ()=>parseBigintDef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/errorMessages.mjs [app-route] (ecmascript)");
;
function parseBigintDef(def, refs) {
    const res = {
        type: 'integer',
        format: 'int64'
    };
    if (!def.checks) return res;
    for (const check of def.checks){
        switch(check.kind){
            case 'min':
                if (refs.target === 'jsonSchema7') {
                    if (check.inclusive) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'minimum', check.value, check.message, refs);
                    } else {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'exclusiveMinimum', check.value, check.message, refs);
                    }
                } else {
                    if (!check.inclusive) {
                        res.exclusiveMinimum = true;
                    }
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'minimum', check.value, check.message, refs);
                }
                break;
            case 'max':
                if (refs.target === 'jsonSchema7') {
                    if (check.inclusive) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'maximum', check.value, check.message, refs);
                    } else {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'exclusiveMaximum', check.value, check.message, refs);
                    }
                } else {
                    if (!check.inclusive) {
                        res.exclusiveMaximum = true;
                    }
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'maximum', check.value, check.message, refs);
                }
                break;
            case 'multipleOf':
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'multipleOf', check.value, check.message, refs);
                break;
        }
    }
    return res;
} //# sourceMappingURL=bigint.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/boolean.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseBooleanDef",
    ()=>parseBooleanDef
]);
function parseBooleanDef() {
    return {
        type: 'boolean'
    };
} //# sourceMappingURL=boolean.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/branded.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseBrandedDef",
    ()=>parseBrandedDef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parseDef.mjs [app-route] (ecmascript)");
;
function parseBrandedDef(_def, refs, forceResolution) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(_def.type._def, refs, forceResolution);
} //# sourceMappingURL=branded.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/catch.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseCatchDef",
    ()=>parseCatchDef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parseDef.mjs [app-route] (ecmascript)");
;
const parseCatchDef = (def, refs, forceResolution)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.innerType._def, refs, forceResolution);
}; //# sourceMappingURL=catch.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/date.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseDateDef",
    ()=>parseDateDef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/errorMessages.mjs [app-route] (ecmascript)");
;
function parseDateDef(def, refs, overrideDateStrategy) {
    const strategy = overrideDateStrategy ?? refs.dateStrategy;
    if (Array.isArray(strategy)) {
        return {
            anyOf: strategy.map((item, i)=>parseDateDef(def, refs, item))
        };
    }
    switch(strategy){
        case 'string':
        case 'format:date-time':
            return {
                type: 'string',
                format: 'date-time'
            };
        case 'format:date':
            return {
                type: 'string',
                format: 'date'
            };
        case 'integer':
            return integerDateParser(def, refs);
    }
}
const integerDateParser = (def, refs)=>{
    const res = {
        type: 'integer',
        format: 'unix-time'
    };
    if (refs.target === 'openApi3') {
        return res;
    }
    for (const check of def.checks){
        switch(check.kind){
            case 'min':
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'minimum', check.value, check.message, refs);
                break;
            case 'max':
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'maximum', check.value, check.message, refs);
                break;
        }
    }
    return res;
}; //# sourceMappingURL=date.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/default.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseDefaultDef",
    ()=>parseDefaultDef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parseDef.mjs [app-route] (ecmascript)");
;
function parseDefaultDef(_def, refs, forceResolution) {
    return {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(_def.innerType._def, refs, forceResolution),
        default: _def.defaultValue()
    };
} //# sourceMappingURL=default.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/effects.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseEffectsDef",
    ()=>parseEffectsDef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parseDef.mjs [app-route] (ecmascript)");
;
function parseEffectsDef(_def, refs, forceResolution) {
    return refs.effectStrategy === 'input' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(_def.schema._def, refs, forceResolution) : {};
} //# sourceMappingURL=effects.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/enum.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseEnumDef",
    ()=>parseEnumDef
]);
function parseEnumDef(def) {
    return {
        type: 'string',
        enum: [
            ...def.values
        ]
    };
} //# sourceMappingURL=enum.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/intersection.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseIntersectionDef",
    ()=>parseIntersectionDef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parseDef.mjs [app-route] (ecmascript)");
;
const isJsonSchema7AllOfType = (type)=>{
    if ('type' in type && type.type === 'string') return false;
    return 'allOf' in type;
};
function parseIntersectionDef(def, refs) {
    const allOf = [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.left._def, {
            ...refs,
            currentPath: [
                ...refs.currentPath,
                'allOf',
                '0'
            ]
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.right._def, {
            ...refs,
            currentPath: [
                ...refs.currentPath,
                'allOf',
                '1'
            ]
        })
    ].filter((x)=>!!x);
    let unevaluatedProperties = refs.target === 'jsonSchema2019-09' ? {
        unevaluatedProperties: false
    } : undefined;
    const mergedAllOf = [];
    // If either of the schemas is an allOf, merge them into a single allOf
    allOf.forEach((schema)=>{
        if (isJsonSchema7AllOfType(schema)) {
            mergedAllOf.push(...schema.allOf);
            if (schema.unevaluatedProperties === undefined) {
                // If one of the schemas has no unevaluatedProperties set,
                // the merged schema should also have no unevaluatedProperties set
                unevaluatedProperties = undefined;
            }
        } else {
            let nestedSchema = schema;
            if ('additionalProperties' in schema && schema.additionalProperties === false) {
                const { additionalProperties, ...rest } = schema;
                nestedSchema = rest;
            } else {
                // As soon as one of the schemas has additionalProperties set not to false, we allow unevaluatedProperties
                unevaluatedProperties = undefined;
            }
            mergedAllOf.push(nestedSchema);
        }
    });
    return mergedAllOf.length ? {
        allOf: mergedAllOf,
        ...unevaluatedProperties
    } : undefined;
} //# sourceMappingURL=intersection.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/literal.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseLiteralDef",
    ()=>parseLiteralDef
]);
function parseLiteralDef(def, refs) {
    const parsedType = typeof def.value;
    if (parsedType !== 'bigint' && parsedType !== 'number' && parsedType !== 'boolean' && parsedType !== 'string') {
        return {
            type: Array.isArray(def.value) ? 'array' : 'object'
        };
    }
    if (refs.target === 'openApi3') {
        return {
            type: parsedType === 'bigint' ? 'integer' : parsedType,
            enum: [
                def.value
            ]
        };
    }
    return {
        type: parsedType === 'bigint' ? 'integer' : parsedType,
        const: def.value
    };
} //# sourceMappingURL=literal.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/string.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseStringDef",
    ()=>parseStringDef,
    "zodPatterns",
    ()=>zodPatterns
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/errorMessages.mjs [app-route] (ecmascript)");
;
let emojiRegex;
const zodPatterns = {
    /**
     * `c` was changed to `[cC]` to replicate /i flag
     */ cuid: /^[cC][^\s-]{8,}$/,
    cuid2: /^[0-9a-z]+$/,
    ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
    /**
     * `a-z` was added to replicate /i flag
     */ email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
    /**
     * Constructed a valid Unicode RegExp
     *
     * Lazily instantiate since this type of regex isn't supported
     * in all envs (e.g. React Native).
     *
     * See:
     * https://github.com/colinhacks/zod/issues/2433
     * Fix in Zod:
     * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
     */ emoji: ()=>{
        if (emojiRegex === undefined) {
            emojiRegex = RegExp('^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$', 'u');
        }
        return emojiRegex;
    },
    /**
     * Unused
     */ uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
    /**
     * Unused
     */ ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
    /**
     * Unused
     */ ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
    base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
    nanoid: /^[a-zA-Z0-9_-]{21}$/
};
function parseStringDef(def, refs) {
    const res = {
        type: 'string'
    };
    function processPattern(value) {
        return refs.patternStrategy === 'escape' ? escapeNonAlphaNumeric(value) : value;
    }
    if (def.checks) {
        for (const check of def.checks){
            switch(check.kind){
                case 'min':
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'minLength', typeof res.minLength === 'number' ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
                    break;
                case 'max':
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'maxLength', typeof res.maxLength === 'number' ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
                    break;
                case 'email':
                    switch(refs.emailStrategy){
                        case 'format:email':
                            addFormat(res, 'email', check.message, refs);
                            break;
                        case 'format:idn-email':
                            addFormat(res, 'idn-email', check.message, refs);
                            break;
                        case 'pattern:zod':
                            addPattern(res, zodPatterns.email, check.message, refs);
                            break;
                    }
                    break;
                case 'url':
                    addFormat(res, 'uri', check.message, refs);
                    break;
                case 'uuid':
                    addFormat(res, 'uuid', check.message, refs);
                    break;
                case 'regex':
                    addPattern(res, check.regex, check.message, refs);
                    break;
                case 'cuid':
                    addPattern(res, zodPatterns.cuid, check.message, refs);
                    break;
                case 'cuid2':
                    addPattern(res, zodPatterns.cuid2, check.message, refs);
                    break;
                case 'startsWith':
                    addPattern(res, RegExp(`^${processPattern(check.value)}`), check.message, refs);
                    break;
                case 'endsWith':
                    addPattern(res, RegExp(`${processPattern(check.value)}$`), check.message, refs);
                    break;
                case 'datetime':
                    addFormat(res, 'date-time', check.message, refs);
                    break;
                case 'date':
                    addFormat(res, 'date', check.message, refs);
                    break;
                case 'time':
                    addFormat(res, 'time', check.message, refs);
                    break;
                case 'duration':
                    addFormat(res, 'duration', check.message, refs);
                    break;
                case 'length':
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'minLength', typeof res.minLength === 'number' ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'maxLength', typeof res.maxLength === 'number' ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
                    break;
                case 'includes':
                    {
                        addPattern(res, RegExp(processPattern(check.value)), check.message, refs);
                        break;
                    }
                case 'ip':
                    {
                        if (check.version !== 'v6') {
                            addFormat(res, 'ipv4', check.message, refs);
                        }
                        if (check.version !== 'v4') {
                            addFormat(res, 'ipv6', check.message, refs);
                        }
                        break;
                    }
                case 'emoji':
                    addPattern(res, zodPatterns.emoji, check.message, refs);
                    break;
                case 'ulid':
                    {
                        addPattern(res, zodPatterns.ulid, check.message, refs);
                        break;
                    }
                case 'base64':
                    {
                        switch(refs.base64Strategy){
                            case 'format:binary':
                                {
                                    addFormat(res, 'binary', check.message, refs);
                                    break;
                                }
                            case 'contentEncoding:base64':
                                {
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'contentEncoding', 'base64', check.message, refs);
                                    break;
                                }
                            case 'pattern:zod':
                                {
                                    addPattern(res, zodPatterns.base64, check.message, refs);
                                    break;
                                }
                        }
                        break;
                    }
                case 'nanoid':
                    {
                        addPattern(res, zodPatterns.nanoid, check.message, refs);
                    }
                case 'toLowerCase':
                case 'toUpperCase':
                case 'trim':
                    break;
                default:
                    ((_)=>{})(check);
            }
        }
    }
    return res;
}
const escapeNonAlphaNumeric = (value)=>Array.from(value).map((c)=>/[a-zA-Z0-9]/.test(c) ? c : `\\${c}`).join('');
const addFormat = (schema, value, message, refs)=>{
    if (schema.format || schema.anyOf?.some((x)=>x.format)) {
        if (!schema.anyOf) {
            schema.anyOf = [];
        }
        if (schema.format) {
            schema.anyOf.push({
                format: schema.format,
                ...schema.errorMessage && refs.errorMessages && {
                    errorMessage: {
                        format: schema.errorMessage.format
                    }
                }
            });
            delete schema.format;
            if (schema.errorMessage) {
                delete schema.errorMessage.format;
                if (Object.keys(schema.errorMessage).length === 0) {
                    delete schema.errorMessage;
                }
            }
        }
        schema.anyOf.push({
            format: value,
            ...message && refs.errorMessages && {
                errorMessage: {
                    format: message
                }
            }
        });
    } else {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(schema, 'format', value, message, refs);
    }
};
const addPattern = (schema, regex, message, refs)=>{
    if (schema.pattern || schema.allOf?.some((x)=>x.pattern)) {
        if (!schema.allOf) {
            schema.allOf = [];
        }
        if (schema.pattern) {
            schema.allOf.push({
                pattern: schema.pattern,
                ...schema.errorMessage && refs.errorMessages && {
                    errorMessage: {
                        pattern: schema.errorMessage.pattern
                    }
                }
            });
            delete schema.pattern;
            if (schema.errorMessage) {
                delete schema.errorMessage.pattern;
                if (Object.keys(schema.errorMessage).length === 0) {
                    delete schema.errorMessage;
                }
            }
        }
        schema.allOf.push({
            pattern: processRegExp(regex, refs),
            ...message && refs.errorMessages && {
                errorMessage: {
                    pattern: message
                }
            }
        });
    } else {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(schema, 'pattern', processRegExp(regex, refs), message, refs);
    }
};
// Mutate z.string.regex() in a best attempt to accommodate for regex flags when applyRegexFlags is true
const processRegExp = (regexOrFunction, refs)=>{
    const regex = typeof regexOrFunction === 'function' ? regexOrFunction() : regexOrFunction;
    if (!refs.applyRegexFlags || !regex.flags) return regex.source;
    // Currently handled flags
    const flags = {
        i: regex.flags.includes('i'),
        m: regex.flags.includes('m'),
        s: regex.flags.includes('s')
    };
    // The general principle here is to step through each character, one at a time, applying mutations as flags require. We keep track when the current character is escaped, and when it's inside a group /like [this]/ or (also) a range like /[a-z]/. The following is fairly brittle imperative code; edit at your peril!
    const source = flags.i ? regex.source.toLowerCase() : regex.source;
    let pattern = '';
    let isEscaped = false;
    let inCharGroup = false;
    let inCharRange = false;
    for(let i = 0; i < source.length; i++){
        if (isEscaped) {
            pattern += source[i];
            isEscaped = false;
            continue;
        }
        if (flags.i) {
            if (inCharGroup) {
                if (source[i].match(/[a-z]/)) {
                    if (inCharRange) {
                        pattern += source[i];
                        pattern += `${source[i - 2]}-${source[i]}`.toUpperCase();
                        inCharRange = false;
                    } else if (source[i + 1] === '-' && source[i + 2]?.match(/[a-z]/)) {
                        pattern += source[i];
                        inCharRange = true;
                    } else {
                        pattern += `${source[i]}${source[i].toUpperCase()}`;
                    }
                    continue;
                }
            } else if (source[i].match(/[a-z]/)) {
                pattern += `[${source[i]}${source[i].toUpperCase()}]`;
                continue;
            }
        }
        if (flags.m) {
            if (source[i] === '^') {
                pattern += `(^|(?<=[\r\n]))`;
                continue;
            } else if (source[i] === '$') {
                pattern += `($|(?=[\r\n]))`;
                continue;
            }
        }
        if (flags.s && source[i] === '.') {
            pattern += inCharGroup ? `${source[i]}\r\n` : `[${source[i]}\r\n]`;
            continue;
        }
        pattern += source[i];
        if (source[i] === '\\') {
            isEscaped = true;
        } else if (inCharGroup && source[i] === ']') {
            inCharGroup = false;
        } else if (!inCharGroup && source[i] === '[') {
            inCharGroup = true;
        }
    }
    try {
        const regexTest = new RegExp(pattern);
    } catch  {
        console.warn(`Could not convert regex pattern at ${refs.currentPath.join('/')} to a flag-independent form! Falling back to the flag-ignorant source`);
        return regex.source;
    }
    return pattern;
}; //# sourceMappingURL=string.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/record.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseRecordDef",
    ()=>parseRecordDef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.3.6/node_modules/zod/v3/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.3.6/node_modules/zod/v3/types.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parseDef.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$string$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/string.mjs [app-route] (ecmascript)");
;
;
;
function parseRecordDef(def, refs) {
    if (refs.target === 'openApi3' && def.keyType?._def.typeName === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodEnum) {
        return {
            type: 'object',
            required: def.keyType._def.values,
            properties: def.keyType._def.values.reduce((acc, key)=>({
                    ...acc,
                    [key]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.valueType._def, {
                        ...refs,
                        currentPath: [
                            ...refs.currentPath,
                            'properties',
                            key
                        ]
                    }) ?? {}
                }), {}),
            additionalProperties: false
        };
    }
    const schema = {
        type: 'object',
        additionalProperties: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.valueType._def, {
            ...refs,
            currentPath: [
                ...refs.currentPath,
                'additionalProperties'
            ]
        }) ?? {}
    };
    if (refs.target === 'openApi3') {
        return schema;
    }
    if (def.keyType?._def.typeName === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodString && def.keyType._def.checks?.length) {
        const keyType = Object.entries((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$string$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseStringDef"])(def.keyType._def, refs)).reduce((acc, [key, value])=>key === 'type' ? acc : {
                ...acc,
                [key]: value
            }, {});
        return {
            ...schema,
            propertyNames: keyType
        };
    } else if (def.keyType?._def.typeName === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodEnum) {
        return {
            ...schema,
            propertyNames: {
                enum: def.keyType._def.values
            }
        };
    }
    return schema;
} //# sourceMappingURL=record.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/map.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseMapDef",
    ()=>parseMapDef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parseDef.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$record$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/record.mjs [app-route] (ecmascript)");
;
;
function parseMapDef(def, refs) {
    if (refs.mapStrategy === 'record') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$record$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseRecordDef"])(def, refs);
    }
    const keys = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.keyType._def, {
        ...refs,
        currentPath: [
            ...refs.currentPath,
            'items',
            'items',
            '0'
        ]
    }) || {};
    const values = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.valueType._def, {
        ...refs,
        currentPath: [
            ...refs.currentPath,
            'items',
            'items',
            '1'
        ]
    }) || {};
    return {
        type: 'array',
        maxItems: 125,
        items: {
            type: 'array',
            items: [
                keys,
                values
            ],
            minItems: 2,
            maxItems: 2
        }
    };
} //# sourceMappingURL=map.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/nativeEnum.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseNativeEnumDef",
    ()=>parseNativeEnumDef
]);
function parseNativeEnumDef(def) {
    const object = def.values;
    const actualKeys = Object.keys(def.values).filter((key)=>{
        return typeof object[object[key]] !== 'number';
    });
    const actualValues = actualKeys.map((key)=>object[key]);
    const parsedTypes = Array.from(new Set(actualValues.map((values)=>typeof values)));
    return {
        type: parsedTypes.length === 1 ? parsedTypes[0] === 'string' ? 'string' : 'number' : [
            'string',
            'number'
        ],
        enum: actualValues
    };
} //# sourceMappingURL=nativeEnum.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/never.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseNeverDef",
    ()=>parseNeverDef
]);
function parseNeverDef() {
    return {
        not: {}
    };
} //# sourceMappingURL=never.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/null.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseNullDef",
    ()=>parseNullDef
]);
function parseNullDef(refs) {
    return refs.target === 'openApi3' ? {
        enum: [
            'null'
        ],
        nullable: true
    } : {
        type: 'null'
    };
} //# sourceMappingURL=null.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/union.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseUnionDef",
    ()=>parseUnionDef,
    "primitiveMappings",
    ()=>primitiveMappings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parseDef.mjs [app-route] (ecmascript)");
;
const primitiveMappings = {
    ZodString: 'string',
    ZodNumber: 'number',
    ZodBigInt: 'integer',
    ZodBoolean: 'boolean',
    ZodNull: 'null'
};
function parseUnionDef(def, refs) {
    if (refs.target === 'openApi3') return asAnyOf(def, refs);
    const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
    // This blocks tries to look ahead a bit to produce nicer looking schemas with type array instead of anyOf.
    if (options.every((x)=>x._def.typeName in primitiveMappings && (!x._def.checks || !x._def.checks.length))) {
        // all types in union are primitive and lack checks, so might as well squash into {type: [...]}
        const types = options.reduce((types, x)=>{
            const type = primitiveMappings[x._def.typeName]; //Can be safely casted due to row 43
            return type && !types.includes(type) ? [
                ...types,
                type
            ] : types;
        }, []);
        return {
            type: types.length > 1 ? types : types[0]
        };
    } else if (options.every((x)=>x._def.typeName === 'ZodLiteral' && !x.description)) {
        // all options literals
        const types = options.reduce((acc, x)=>{
            const type = typeof x._def.value;
            switch(type){
                case 'string':
                case 'number':
                case 'boolean':
                    return [
                        ...acc,
                        type
                    ];
                case 'bigint':
                    return [
                        ...acc,
                        'integer'
                    ];
                case 'object':
                    if (x._def.value === null) return [
                        ...acc,
                        'null'
                    ];
                case 'symbol':
                case 'undefined':
                case 'function':
                default:
                    return acc;
            }
        }, []);
        if (types.length === options.length) {
            // all the literals are primitive, as far as null can be considered primitive
            const uniqueTypes = types.filter((x, i, a)=>a.indexOf(x) === i);
            return {
                type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
                enum: options.reduce((acc, x)=>{
                    return acc.includes(x._def.value) ? acc : [
                        ...acc,
                        x._def.value
                    ];
                }, [])
            };
        }
    } else if (options.every((x)=>x._def.typeName === 'ZodEnum')) {
        return {
            type: 'string',
            enum: options.reduce((acc, x)=>[
                    ...acc,
                    ...x._def.values.filter((x)=>!acc.includes(x))
                ], [])
        };
    }
    return asAnyOf(def, refs);
}
const asAnyOf = (def, refs)=>{
    const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map((x, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(x._def, {
            ...refs,
            currentPath: [
                ...refs.currentPath,
                'anyOf',
                `${i}`
            ]
        })).filter((x)=>!!x && (!refs.strictUnions || typeof x === 'object' && Object.keys(x).length > 0));
    return anyOf.length ? {
        anyOf
    } : undefined;
}; //# sourceMappingURL=union.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/nullable.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseNullableDef",
    ()=>parseNullableDef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parseDef.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$union$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/union.mjs [app-route] (ecmascript)");
;
;
function parseNullableDef(def, refs, forceResolution) {
    if ([
        'ZodString',
        'ZodNumber',
        'ZodBigInt',
        'ZodBoolean',
        'ZodNull'
    ].includes(def.innerType._def.typeName) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
        if (refs.target === 'openApi3' || refs.nullableStrategy === 'property') {
            return {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$union$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["primitiveMappings"][def.innerType._def.typeName],
                nullable: true
            };
        }
        return {
            type: [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$union$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["primitiveMappings"][def.innerType._def.typeName],
                'null'
            ]
        };
    }
    if (refs.target === 'openApi3') {
        const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.innerType._def, {
            ...refs,
            currentPath: [
                ...refs.currentPath
            ]
        }, forceResolution);
        if (base && '$ref' in base) return {
            allOf: [
                base
            ],
            nullable: true
        };
        return base && {
            ...base,
            nullable: true
        };
    }
    const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.innerType._def, {
        ...refs,
        currentPath: [
            ...refs.currentPath,
            'anyOf',
            '0'
        ]
    });
    return base && {
        anyOf: [
            base,
            {
                type: 'null'
            }
        ]
    };
} //# sourceMappingURL=nullable.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/number.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseNumberDef",
    ()=>parseNumberDef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/errorMessages.mjs [app-route] (ecmascript)");
;
function parseNumberDef(def, refs) {
    const res = {
        type: 'number'
    };
    if (!def.checks) return res;
    for (const check of def.checks){
        switch(check.kind){
            case 'int':
                res.type = 'integer';
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addErrorMessage"])(res, 'type', check.message, refs);
                break;
            case 'min':
                if (refs.target === 'jsonSchema7') {
                    if (check.inclusive) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'minimum', check.value, check.message, refs);
                    } else {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'exclusiveMinimum', check.value, check.message, refs);
                    }
                } else {
                    if (!check.inclusive) {
                        res.exclusiveMinimum = true;
                    }
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'minimum', check.value, check.message, refs);
                }
                break;
            case 'max':
                if (refs.target === 'jsonSchema7') {
                    if (check.inclusive) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'maximum', check.value, check.message, refs);
                    } else {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'exclusiveMaximum', check.value, check.message, refs);
                    }
                } else {
                    if (!check.inclusive) {
                        res.exclusiveMaximum = true;
                    }
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'maximum', check.value, check.message, refs);
                }
                break;
            case 'multipleOf':
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(res, 'multipleOf', check.value, check.message, refs);
                break;
        }
    }
    return res;
} //# sourceMappingURL=number.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/object.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseObjectDef",
    ()=>parseObjectDef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parseDef.mjs [app-route] (ecmascript)");
;
function decideAdditionalProperties(def, refs) {
    if (refs.removeAdditionalStrategy === 'strict') {
        return def.catchall._def.typeName === 'ZodNever' ? def.unknownKeys !== 'strict' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.catchall._def, {
            ...refs,
            currentPath: [
                ...refs.currentPath,
                'additionalProperties'
            ]
        }) ?? true;
    } else {
        return def.catchall._def.typeName === 'ZodNever' ? def.unknownKeys === 'passthrough' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.catchall._def, {
            ...refs,
            currentPath: [
                ...refs.currentPath,
                'additionalProperties'
            ]
        }) ?? true;
    }
}
function parseObjectDef(def, refs) {
    const result = {
        type: 'object',
        ...Object.entries(def.shape()).reduce((acc, [propName, propDef])=>{
            if (propDef === undefined || propDef._def === undefined) return acc;
            const propertyPath = [
                ...refs.currentPath,
                'properties',
                propName
            ];
            const parsedDef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(propDef._def, {
                ...refs,
                currentPath: propertyPath,
                propertyPath
            });
            if (parsedDef === undefined) return acc;
            if (refs.openaiStrictMode && propDef.isOptional() && !propDef.isNullable() && typeof propDef._def?.defaultValue === 'undefined') {
                throw new Error(`Zod field at \`${propertyPath.join('/')}\` uses \`.optional()\` without \`.nullable()\` which is not supported by the API. See: https://platform.openai.com/docs/guides/structured-outputs?api-mode=responses#all-fields-must-be-required`);
            }
            return {
                properties: {
                    ...acc.properties,
                    [propName]: parsedDef
                },
                required: propDef.isOptional() && !refs.openaiStrictMode ? acc.required : [
                    ...acc.required,
                    propName
                ]
            };
        }, {
            properties: {},
            required: []
        }),
        additionalProperties: decideAdditionalProperties(def, refs)
    };
    if (!result.required.length) delete result.required;
    return result;
} //# sourceMappingURL=object.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/optional.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseOptionalDef",
    ()=>parseOptionalDef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parseDef.mjs [app-route] (ecmascript)");
;
const parseOptionalDef = (def, refs, forceResolution)=>{
    if (refs.propertyPath && refs.currentPath.slice(0, refs.propertyPath.length).toString() === refs.propertyPath.toString()) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.innerType._def, {
            ...refs,
            currentPath: refs.currentPath
        }, forceResolution);
    }
    const innerSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.innerType._def, {
        ...refs,
        currentPath: [
            ...refs.currentPath,
            'anyOf',
            '1'
        ]
    }, forceResolution);
    return innerSchema ? {
        anyOf: [
            {
                not: {}
            },
            innerSchema
        ]
    } : {};
}; //# sourceMappingURL=optional.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/pipeline.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parsePipelineDef",
    ()=>parsePipelineDef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parseDef.mjs [app-route] (ecmascript)");
;
const parsePipelineDef = (def, refs, forceResolution)=>{
    if (refs.pipeStrategy === 'input') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.in._def, refs, forceResolution);
    } else if (refs.pipeStrategy === 'output') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.out._def, refs, forceResolution);
    }
    const a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.in._def, {
        ...refs,
        currentPath: [
            ...refs.currentPath,
            'allOf',
            '0'
        ]
    });
    const b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.out._def, {
        ...refs,
        currentPath: [
            ...refs.currentPath,
            'allOf',
            a ? '1' : '0'
        ]
    });
    return {
        allOf: [
            a,
            b
        ].filter((x)=>x !== undefined)
    };
}; //# sourceMappingURL=pipeline.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/promise.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parsePromiseDef",
    ()=>parsePromiseDef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parseDef.mjs [app-route] (ecmascript)");
;
function parsePromiseDef(def, refs, forceResolution) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.type._def, refs, forceResolution);
} //# sourceMappingURL=promise.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/set.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseSetDef",
    ()=>parseSetDef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/errorMessages.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parseDef.mjs [app-route] (ecmascript)");
;
;
function parseSetDef(def, refs) {
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.valueType._def, {
        ...refs,
        currentPath: [
            ...refs.currentPath,
            'items'
        ]
    });
    const schema = {
        type: 'array',
        uniqueItems: true,
        items
    };
    if (def.minSize) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(schema, 'minItems', def.minSize.value, def.minSize.message, refs);
    }
    if (def.maxSize) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setResponseValueAndErrors"])(schema, 'maxItems', def.maxSize.value, def.maxSize.message, refs);
    }
    return schema;
} //# sourceMappingURL=set.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/tuple.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseTupleDef",
    ()=>parseTupleDef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parseDef.mjs [app-route] (ecmascript)");
;
function parseTupleDef(def, refs) {
    if (def.rest) {
        return {
            type: 'array',
            minItems: def.items.length,
            items: def.items.map((x, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(x._def, {
                    ...refs,
                    currentPath: [
                        ...refs.currentPath,
                        'items',
                        `${i}`
                    ]
                })).reduce((acc, x)=>x === undefined ? acc : [
                    ...acc,
                    x
                ], []),
            additionalItems: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.rest._def, {
                ...refs,
                currentPath: [
                    ...refs.currentPath,
                    'additionalItems'
                ]
            })
        };
    } else {
        return {
            type: 'array',
            minItems: def.items.length,
            maxItems: def.items.length,
            items: def.items.map((x, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(x._def, {
                    ...refs,
                    currentPath: [
                        ...refs.currentPath,
                        'items',
                        `${i}`
                    ]
                })).reduce((acc, x)=>x === undefined ? acc : [
                    ...acc,
                    x
                ], [])
        };
    }
} //# sourceMappingURL=tuple.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/undefined.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseUndefinedDef",
    ()=>parseUndefinedDef
]);
function parseUndefinedDef() {
    return {
        not: {}
    };
} //# sourceMappingURL=undefined.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/unknown.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseUnknownDef",
    ()=>parseUnknownDef
]);
function parseUnknownDef() {
    return {};
} //# sourceMappingURL=unknown.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/readonly.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseReadonlyDef",
    ()=>parseReadonlyDef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parseDef.mjs [app-route] (ecmascript)");
;
const parseReadonlyDef = (def, refs, forceResolution)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(def.innerType._def, refs, forceResolution);
}; //# sourceMappingURL=readonly.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parseDef.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseDef",
    ()=>parseDef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.3.6/node_modules/zod/v3/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.3.6/node_modules/zod/v3/types.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$any$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/any.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$array$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/array.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$bigint$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/bigint.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$boolean$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/boolean.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$branded$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/branded.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$catch$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/catch.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$date$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/date.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$default$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/default.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$effects$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/effects.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$enum$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/enum.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$intersection$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/intersection.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$literal$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/literal.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$map$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/map.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$nativeEnum$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/nativeEnum.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$never$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/never.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$null$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/null.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$nullable$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/nullable.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$number$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/number.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$object$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/object.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$optional$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/optional.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$pipeline$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/pipeline.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$promise$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/promise.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$record$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/record.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$set$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/set.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$string$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/string.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$tuple$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/tuple.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$undefined$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/undefined.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$union$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/union.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$unknown$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/unknown.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$readonly$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/readonly.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$Options$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/Options.mjs [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function parseDef(def, refs, forceResolution = false) {
    const seenItem = refs.seen.get(def);
    if (refs.override) {
        const overrideResult = refs.override?.(def, refs, seenItem, forceResolution);
        if (overrideResult !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$Options$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ignoreOverride"]) {
            return overrideResult;
        }
    }
    if (seenItem && !forceResolution) {
        const seenSchema = get$ref(seenItem, refs);
        if (seenSchema !== undefined) {
            if ('$ref' in seenSchema) {
                refs.seenRefs.add(seenSchema.$ref);
            }
            return seenSchema;
        }
    }
    const newItem = {
        def,
        path: refs.currentPath,
        jsonSchema: undefined
    };
    refs.seen.set(def, newItem);
    try {
        const jsonSchema = selectParser(def, def.typeName, refs, forceResolution);
        if (jsonSchema) {
            addMeta(def, refs, jsonSchema);
        }
        newItem.jsonSchema = jsonSchema;
        return jsonSchema;
    } finally{
        if (forceResolution && seenItem) {
            // Materializing a definition temporarily moves it to the definition path. Restore the
            // original path so later references to a shared inner type don't inherit wrapper metadata.
            refs.seen.set(def, seenItem);
        }
    }
}
const get$ref = (item, refs)=>{
    switch(refs.$refStrategy){
        case 'root':
            return {
                $ref: item.path.join('/')
            };
        // this case is needed as OpenAI strict mode doesn't support top-level `$ref`s, i.e.
        // the top-level schema *must* be `{"type": "object", "properties": {...}}` but if we ever
        // need to define a `$ref`, relative `$ref`s aren't supported, so we need to extract
        // the schema to `#/definitions/` and reference that.
        //
        // e.g. if we need to reference a schema at
        // `["#","definitions","contactPerson","properties","person1","properties","name"]`
        // then we'll extract it out to `contactPerson_properties_person1_properties_name`
        case 'extract-to-root':
            const name = item.path.slice(refs.basePath.length + 1)// The first part is either the root schema name or an extracted definition
            // name that is being materialized. Keep it stable so recursive definitions
            // do not generate a new name each time they are resolved.
            .map((part, index)=>index === 0 ? part : encodeDefinitionPathPart(part)).join('_');
            // we don't need to extract the root schema in this case, as it's already
            // been added to the definitions
            if (name !== refs.name && refs.nameStrategy === 'duplicate-ref') {
                refs.definitions[name] = item.def;
            }
            return {
                $ref: [
                    ...refs.basePath,
                    refs.definitionPath,
                    name
                ].join('/')
            };
        case 'relative':
            return {
                $ref: getRelativePath(refs.currentPath, item.path)
            };
        case 'none':
        case 'seen':
            {
                if (item.path.length < refs.currentPath.length && item.path.every((value, index)=>refs.currentPath[index] === value)) {
                    console.warn(`Recursive reference detected at ${refs.currentPath.join('/')}! Defaulting to any`);
                    return {};
                }
                return refs.$refStrategy === 'seen' ? {} : undefined;
            }
    }
};
const encodedDefinitionPathPartPrefix = '_x_';
const encodeDefinitionPathPart = (part)=>{
    if (/^[A-Za-z0-9_-]*$/.test(part) && !part.startsWith(encodedDefinitionPathPartPrefix)) {
        return part;
    }
    let encoded = encodedDefinitionPathPartPrefix;
    for(let i = 0; i < part.length; i++){
        encoded += part.charCodeAt(i).toString(16).padStart(4, '0');
    }
    return encoded;
};
const getRelativePath = (pathA, pathB)=>{
    let i = 0;
    for(; i < pathA.length && i < pathB.length; i++){
        if (pathA[i] !== pathB[i]) break;
    }
    return [
        (pathA.length - i).toString(),
        ...pathB.slice(i)
    ].join('/');
};
const selectParser = (def, typeName, refs, forceResolution)=>{
    switch(typeName){
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodString:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$string$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseStringDef"])(def, refs);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodNumber:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$number$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNumberDef"])(def, refs);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodObject:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$object$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseObjectDef"])(def, refs);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodBigInt:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$bigint$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseBigintDef"])(def, refs);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodBoolean:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$boolean$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseBooleanDef"])();
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodDate:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$date$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDateDef"])(def, refs);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodUndefined:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$undefined$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseUndefinedDef"])();
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodNull:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$null$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNullDef"])(refs);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodArray:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$array$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseArrayDef"])(def, refs);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodUnion:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodDiscriminatedUnion:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$union$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseUnionDef"])(def, refs);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodIntersection:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$intersection$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseIntersectionDef"])(def, refs);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodTuple:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$tuple$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseTupleDef"])(def, refs);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodRecord:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$record$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseRecordDef"])(def, refs);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodLiteral:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$literal$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseLiteralDef"])(def, refs);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodEnum:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$enum$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseEnumDef"])(def);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodNativeEnum:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$nativeEnum$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNativeEnumDef"])(def);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodNullable:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$nullable$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNullableDef"])(def, refs, forceResolution);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodOptional:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$optional$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseOptionalDef"])(def, refs, forceResolution);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodMap:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$map$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseMapDef"])(def, refs);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodSet:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$set$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSetDef"])(def, refs);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodLazy:
            return parseDef(def.getter()._def, refs, forceResolution);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodPromise:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$promise$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parsePromiseDef"])(def, refs, forceResolution);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodNaN:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodNever:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$never$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseNeverDef"])();
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodEffects:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$effects$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseEffectsDef"])(def, refs, forceResolution);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodAny:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$any$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseAnyDef"])();
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodUnknown:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$unknown$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseUnknownDef"])();
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodDefault:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$default$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDefaultDef"])(def, refs, forceResolution);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodBranded:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$branded$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseBrandedDef"])(def, refs, forceResolution);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodReadonly:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$readonly$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseReadonlyDef"])(def, refs, forceResolution);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodCatch:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$catch$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCatchDef"])(def, refs, forceResolution);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodPipeline:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$pipeline$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parsePipelineDef"])(def, refs, forceResolution);
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodFunction:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodVoid:
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodFirstPartyTypeKind"].ZodSymbol:
            return undefined;
        default:
            return ((_)=>undefined)(typeName);
    }
};
const addMeta = (def, refs, jsonSchema)=>{
    if (def.description) {
        jsonSchema.description = def.description;
        if (refs.markdownDescription) {
            jsonSchema.markdownDescription = def.description;
        }
    }
    return jsonSchema;
}; //# sourceMappingURL=parseDef.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/zodToJsonSchema.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "zodToJsonSchema",
    ()=>zodToJsonSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parseDef.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$Refs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/Refs.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$util$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/util.mjs [app-route] (ecmascript)");
;
;
;
const zodToJsonSchema = (schema, options)=>{
    const refs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$Refs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRefs"])(options);
    const name = typeof options === 'string' ? options : options?.nameStrategy === 'title' ? undefined : options?.name;
    const main = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])(schema._def, name === undefined ? refs : {
        ...refs,
        currentPath: [
            ...refs.basePath,
            refs.definitionPath,
            name
        ]
    }, false) ?? {};
    const title = typeof options === 'object' && options.name !== undefined && options.nameStrategy === 'title' ? options.name : undefined;
    if (title !== undefined) {
        main.title = title;
    }
    const definitions = (()=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$util$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isEmptyObj"])(refs.definitions)) {
            return undefined;
        }
        const definitions = {};
        const processedDefinitions = new Set();
        // the call to `parseDef()` here might itself add more entries to `.definitions`
        // so we need to continually evaluate definitions until we've resolved all of them
        //
        // we have a generous iteration limit here to avoid blowing up the stack if there
        // are any bugs that would otherwise result in us iterating indefinitely
        for(let i = 0; i < 500; i++){
            const newDefinitions = Object.entries(refs.definitions).filter(([key])=>!processedDefinitions.has(key));
            if (newDefinitions.length === 0) break;
            for (const [key, schema] of newDefinitions){
                definitions[key] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseDef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$util$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["zodDef"])(schema), {
                    ...refs,
                    currentPath: [
                        ...refs.basePath,
                        refs.definitionPath,
                        key
                    ]
                }, true) ?? {};
                processedDefinitions.add(key);
            }
        }
        return definitions;
    })();
    const combined = name === undefined ? definitions ? {
        ...main,
        [refs.definitionPath]: definitions
    } : main : refs.nameStrategy === 'duplicate-ref' ? {
        ...main,
        ...definitions || refs.seenRefs.size ? {
            [refs.definitionPath]: {
                ...definitions,
                // only actually duplicate the schema definition if it was ever referenced
                // otherwise the duplication is completely pointless
                ...refs.seenRefs.size ? {
                    [name]: main
                } : undefined
            }
        } : undefined
    } : {
        $ref: [
            ...refs.$refStrategy === 'relative' ? [] : refs.basePath,
            refs.definitionPath,
            name
        ].join('/'),
        [refs.definitionPath]: {
            ...definitions,
            [name]: main
        }
    };
    if (refs.target === 'jsonSchema7') {
        combined.$schema = 'http://json-schema.org/draft-07/schema#';
    } else if (refs.target === 'jsonSchema2019-09') {
        combined.$schema = 'https://json-schema.org/draft/2019-09/schema#';
    }
    return combined;
};
;
 //# sourceMappingURL=zodToJsonSchema.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/index.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$Options$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/Options.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$Refs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/Refs.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$errorMessages$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/errorMessages.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parseDef$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parseDef.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$any$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/any.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$array$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/array.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$bigint$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/bigint.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$boolean$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/boolean.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$branded$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/branded.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$catch$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/catch.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$date$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/date.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$default$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/default.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$effects$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/effects.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$enum$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/enum.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$intersection$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/intersection.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$literal$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/literal.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$map$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/map.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$nativeEnum$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/nativeEnum.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$never$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/never.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$null$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/null.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$nullable$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/nullable.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$number$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/number.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$object$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/object.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$optional$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/optional.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$pipeline$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/pipeline.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$promise$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/promise.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$readonly$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/readonly.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$record$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/record.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$set$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/set.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$string$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/string.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$tuple$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/tuple.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$undefined$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/undefined.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$union$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/union.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$parsers$2f$unknown$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/parsers/unknown.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$zodToJsonSchema$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/zodToJsonSchema.mjs [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$zodToJsonSchema$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["zodToJsonSchema"];
 //# sourceMappingURL=index.mjs.map
}),
];

//# sourceMappingURL=36524_openai__vendor_63182667._.js.map