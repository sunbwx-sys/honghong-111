module.exports = [
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/parser.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assertToolCallsAreChatCompletionFunctionToolCalls",
    ()=>assertToolCallsAreChatCompletionFunctionToolCalls,
    "hasAutoParseableInput",
    ()=>hasAutoParseableInput,
    "isAutoParsableResponseFormat",
    ()=>isAutoParsableResponseFormat,
    "isAutoParsableTool",
    ()=>isAutoParsableTool,
    "isChatCompletionFunctionTool",
    ()=>isChatCompletionFunctionTool,
    "makeParseableResponseFormat",
    ()=>makeParseableResponseFormat,
    "makeParseableTextFormat",
    ()=>makeParseableTextFormat,
    "makeParseableTool",
    ()=>makeParseableTool,
    "maybeParseChatCompletion",
    ()=>maybeParseChatCompletion,
    "parseChatCompletion",
    ()=>parseChatCompletion,
    "shouldParseToolCall",
    ()=>shouldParseToolCall,
    "validateInputTools",
    ()=>validateInputTools
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/error.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/error.mjs [app-route] (ecmascript)");
;
function isChatCompletionFunctionTool(tool) {
    return tool !== undefined && 'function' in tool && tool.function !== undefined;
}
function makeParseableResponseFormat(response_format, parser) {
    const obj = {
        ...response_format
    };
    Object.defineProperties(obj, {
        $brand: {
            value: 'auto-parseable-response-format',
            enumerable: false
        },
        $parseRaw: {
            value: parser,
            enumerable: false
        }
    });
    return obj;
}
function makeParseableTextFormat(response_format, parser) {
    const obj = {
        ...response_format
    };
    Object.defineProperties(obj, {
        $brand: {
            value: 'auto-parseable-response-format',
            enumerable: false
        },
        $parseRaw: {
            value: parser,
            enumerable: false
        }
    });
    return obj;
}
function isAutoParsableResponseFormat(response_format) {
    return response_format?.['$brand'] === 'auto-parseable-response-format';
}
function makeParseableTool(tool, { parser, callback }) {
    const obj = {
        ...tool
    };
    Object.defineProperties(obj, {
        $brand: {
            value: 'auto-parseable-tool',
            enumerable: false
        },
        $parseRaw: {
            value: parser,
            enumerable: false
        },
        $callback: {
            value: callback,
            enumerable: false
        }
    });
    return obj;
}
function isAutoParsableTool(tool) {
    return tool?.['$brand'] === 'auto-parseable-tool';
}
function maybeParseChatCompletion(completion, params) {
    if (!params || !hasAutoParseableInput(params)) {
        return {
            ...completion,
            choices: completion.choices.map((choice)=>{
                assertToolCallsAreChatCompletionFunctionToolCalls(choice.message.tool_calls);
                return {
                    ...choice,
                    message: {
                        ...choice.message,
                        parsed: null,
                        ...choice.message.tool_calls ? {
                            tool_calls: choice.message.tool_calls
                        } : undefined
                    }
                };
            })
        };
    }
    return parseChatCompletion(completion, params);
}
function parseChatCompletion(completion, params) {
    const choices = completion.choices.map((choice)=>{
        if (choice.finish_reason === 'length') {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LengthFinishReasonError"]();
        }
        if (choice.finish_reason === 'content_filter') {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContentFilterFinishReasonError"]();
        }
        assertToolCallsAreChatCompletionFunctionToolCalls(choice.message.tool_calls);
        return {
            ...choice,
            message: {
                ...choice.message,
                ...choice.message.tool_calls ? {
                    tool_calls: choice.message.tool_calls?.map((toolCall)=>parseToolCall(params, toolCall)) ?? undefined
                } : undefined,
                parsed: choice.message.content && !choice.message.refusal ? parseResponseFormat(params, choice.message.content) : null
            }
        };
    });
    return {
        ...completion,
        choices
    };
}
function parseResponseFormat(params, content) {
    if (params.response_format?.type !== 'json_schema') {
        return null;
    }
    if (params.response_format?.type === 'json_schema') {
        if ('$parseRaw' in params.response_format) {
            const response_format = params.response_format;
            return response_format.$parseRaw(content);
        }
        return JSON.parse(content);
    }
    return null;
}
function parseToolCall(params, toolCall) {
    const inputTool = params.tools?.find((inputTool)=>isChatCompletionFunctionTool(inputTool) && inputTool.function?.name === toolCall.function.name); // TS doesn't narrow based on isChatCompletionTool
    return {
        ...toolCall,
        function: {
            ...toolCall.function,
            parsed_arguments: isAutoParsableTool(inputTool) ? inputTool.$parseRaw(toolCall.function.arguments) : inputTool?.function.strict ? JSON.parse(toolCall.function.arguments) : null
        }
    };
}
function shouldParseToolCall(params, toolCall) {
    if (!params || !('tools' in params) || !params.tools) {
        return false;
    }
    const inputTool = params.tools?.find((inputTool)=>isChatCompletionFunctionTool(inputTool) && inputTool.function?.name === toolCall.function.name);
    return isChatCompletionFunctionTool(inputTool) && (isAutoParsableTool(inputTool) || inputTool?.function.strict || false);
}
function hasAutoParseableInput(params) {
    if (isAutoParsableResponseFormat(params.response_format)) {
        return true;
    }
    return params.tools?.some((t)=>isAutoParsableTool(t) || t.type === 'function' && t.function.strict === true) ?? false;
}
function assertToolCallsAreChatCompletionFunctionToolCalls(toolCalls) {
    for (const toolCall of toolCalls || []){
        if (toolCall.type !== 'function') {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`Currently only \`function\` tool calls are supported; Received \`${toolCall.type}\``);
        }
    }
}
function validateInputTools(tools) {
    for (const tool of tools ?? []){
        if (tool.type !== 'function') {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`Currently only \`function\` tool types support auto-parsing; Received \`${tool.type}\``);
        }
        if (tool.function.strict !== true) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`The \`${tool.function.name}\` tool is not marked with \`strict: true\`. Only strict function tools can be auto-parsed`);
        }
    }
} //# sourceMappingURL=parser.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/chatCompletionUtils.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAssistantMessage",
    ()=>isAssistantMessage,
    "isPresent",
    ()=>isPresent,
    "isToolMessage",
    ()=>isToolMessage
]);
const isAssistantMessage = (message)=>{
    return message?.role === 'assistant';
};
const isToolMessage = (message)=>{
    return message?.role === 'tool';
};
function isPresent(obj) {
    return obj != null;
} //# sourceMappingURL=chatCompletionUtils.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/EventStream.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventStream",
    ()=>EventStream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/tslib.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/error.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/error.mjs [app-route] (ecmascript)");
var _EventStream_instances, _EventStream_connectedPromise, _EventStream_resolveConnectedPromise, _EventStream_rejectConnectedPromise, _EventStream_endPromise, _EventStream_resolveEndPromise, _EventStream_rejectEndPromise, _EventStream_listeners, _EventStream_abortListeners, _EventStream_ended, _EventStream_errored, _EventStream_aborted, _EventStream_catchingPromiseCreated, _EventStream_removeAbortListeners, _EventStream_handleError;
;
;
class EventStream {
    constructor(){
        _EventStream_instances.add(this);
        this.controller = new AbortController();
        _EventStream_connectedPromise.set(this, void 0);
        _EventStream_resolveConnectedPromise.set(this, ()=>{});
        _EventStream_rejectConnectedPromise.set(this, ()=>{});
        _EventStream_endPromise.set(this, void 0);
        _EventStream_resolveEndPromise.set(this, ()=>{});
        _EventStream_rejectEndPromise.set(this, ()=>{});
        _EventStream_listeners.set(this, {});
        _EventStream_abortListeners.set(this, []);
        _EventStream_ended.set(this, false);
        _EventStream_errored.set(this, false);
        _EventStream_aborted.set(this, false);
        _EventStream_catchingPromiseCreated.set(this, false);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _EventStream_connectedPromise, new Promise((resolve, reject)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _EventStream_resolveConnectedPromise, resolve, "f");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _EventStream_rejectConnectedPromise, reject, "f");
        }), "f");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _EventStream_endPromise, new Promise((resolve, reject)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _EventStream_resolveEndPromise, resolve, "f");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _EventStream_rejectEndPromise, reject, "f");
        }), "f");
        // Don't let these promises cause unhandled rejection errors.
        // we will manually cause an unhandled rejection error later
        // if the user hasn't registered any error listener or called
        // any promise-returning method.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_connectedPromise, "f").catch(()=>{});
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_endPromise, "f").catch(()=>{});
    }
    _run(executor) {
        // Unfortunately if we call `executor()` immediately we get runtime errors about
        // references to `this` before the `super()` constructor call returns.
        setTimeout(()=>{
            Promise.resolve().then(executor).then(()=>{
                try {
                    this._emitFinal();
                } catch (error) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_instances, "m", _EventStream_handleError).call(this, error);
                    return;
                }
                this._emit('end');
            }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_instances, "m", _EventStream_handleError).bind(this));
        }, 0);
    }
    _connected() {
        if (this.ended) return;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_resolveConnectedPromise, "f").call(this);
        this._emit('connect');
    }
    get ended() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_ended, "f");
    }
    get errored() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_errored, "f");
    }
    get aborted() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_aborted, "f");
    }
    abort() {
        this.controller.abort();
    }
    _listenForAbort(signal) {
        if (!signal || this.ended) return;
        if (signal.aborted) {
            this.controller.abort();
            return;
        }
        const listener = ()=>this.controller.abort();
        signal.addEventListener('abort', listener, {
            once: true
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_abortListeners, "f").push({
            signal,
            listener
        });
    }
    /**
     * Adds the listener function to the end of the listeners array for the event.
     * No checks are made to see if the listener has already been added. Multiple calls passing
     * the same combination of event and listener will result in the listener being added, and
     * called, multiple times.
     * @returns this ChatCompletionStream, so that calls can be chained
     */ on(event, listener) {
        const listeners = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_listeners, "f")[event] || ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_listeners, "f")[event] = []);
        listeners.push({
            listener
        });
        return this;
    }
    /**
     * Removes the specified listener from the listener array for the event.
     * off() will remove, at most, one instance of a listener from the listener array. If any single
     * listener has been added multiple times to the listener array for the specified event, then
     * off() must be called multiple times to remove each instance.
     * @returns this ChatCompletionStream, so that calls can be chained
     */ off(event, listener) {
        const listeners = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_listeners, "f")[event];
        if (!listeners) return this;
        const index = listeners.findIndex((l)=>l.listener === listener);
        if (index >= 0) listeners.splice(index, 1);
        return this;
    }
    /**
     * Adds a one-time listener function for the event. The next time the event is triggered,
     * this listener is removed and then invoked.
     * @returns this ChatCompletionStream, so that calls can be chained
     */ once(event, listener) {
        const listeners = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_listeners, "f")[event] || ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_listeners, "f")[event] = []);
        listeners.push({
            listener,
            once: true
        });
        return this;
    }
    /**
     * This is similar to `.once()`, but returns a Promise that resolves the next time
     * the event is triggered, instead of calling a listener callback.
     * @returns a Promise that resolves the next time given event is triggered,
     * or rejects if an error is emitted.  (If you request the 'error' event,
     * returns a promise that resolves with the error).
     *
     * Example:
     *
     *   const message = await stream.emitted('message') // rejects if the stream errors
     */ emitted(event) {
        return new Promise((resolve, reject)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _EventStream_catchingPromiseCreated, true, "f");
            if (event !== 'error') this.once('error', reject);
            this.once(event, resolve);
        });
    }
    /**
     * Returns an async iterator that yields every time the event is triggered.
     * The iterator ends when the stream ends and rejects if the stream errors
     * or is aborted. If you request the 'error' or 'abort' event, the iterator
     * yields that event instead of rejecting.
     *
     * Example:
     *
     *   for await (const [message] of stream.events('message')) {
     *     await processMessage(message);
     *   }
     */ events(event) {
        const pushQueue = [];
        const readQueue = [];
        let ended = this.ended;
        let failure;
        let failureDelivered = false;
        const doneResult = ()=>({
                value: undefined,
                done: true
            });
        const finishReaders = ()=>{
            while(readQueue.length){
                readQueue.shift().resolve(doneResult());
            }
        };
        const rejectReader = ()=>{
            if (!failure || failureDelivered || !readQueue.length) return;
            failureDelivered = true;
            readQueue.shift().reject(failure);
        };
        const cleanup = ()=>{
            this.off(event, onEvent);
            this.off('end', onEnd);
            if (event !== 'error') this.off('error', onFailure);
            if (event !== 'abort') this.off('abort', onFailure);
        };
        const onEvent = (...args)=>{
            if (ended) return;
            const reader = readQueue.shift();
            if (reader) {
                reader.resolve({
                    value: args,
                    done: false
                });
            } else {
                pushQueue.push(args);
            }
        };
        const onFailure = (error)=>{
            failure = error;
            if (!pushQueue.length) rejectReader();
        };
        const onEnd = ()=>{
            ended = true;
            cleanup();
            if (!pushQueue.length) {
                rejectReader();
                finishReaders();
            }
        };
        if (!ended) {
            this.on(event, onEvent);
            this.on('end', onEnd);
            if (event !== 'error') this.on('error', onFailure);
            if (event !== 'abort') this.on('abort', onFailure);
        }
        return {
            next: ()=>{
                const value = pushQueue.shift();
                if (value) return Promise.resolve({
                    value,
                    done: false
                });
                if (failure && !failureDelivered) {
                    failureDelivered = true;
                    return Promise.reject(failure);
                }
                if (ended) return Promise.resolve(doneResult());
                return new Promise((resolve, reject)=>{
                    readQueue.push({
                        resolve,
                        reject
                    });
                });
            },
            return: ()=>{
                ended = true;
                pushQueue.length = 0;
                cleanup();
                finishReaders();
                return Promise.resolve(doneResult());
            },
            [Symbol.asyncIterator] () {
                return this;
            }
        };
    }
    async done() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _EventStream_catchingPromiseCreated, true, "f");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_endPromise, "f");
    }
    _emit(event, ...args) {
        // make sure we don't emit any events after end
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_ended, "f")) {
            return;
        }
        if (event === 'end') {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_instances, "m", _EventStream_removeAbortListeners).call(this);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _EventStream_ended, true, "f");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_resolveEndPromise, "f").call(this);
        }
        const listeners = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_listeners, "f")[event];
        if (listeners) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_listeners, "f")[event] = listeners.filter((l)=>!l.once);
            listeners.forEach(({ listener })=>listener(...args));
        }
        if (event === 'abort') {
            const error = args[0];
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_catchingPromiseCreated, "f") && !listeners?.length) {
                Promise.reject(error);
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_rejectConnectedPromise, "f").call(this, error);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_rejectEndPromise, "f").call(this, error);
            this._emit('end');
            return;
        }
        if (event === 'error') {
            // NOTE: _emit('error', error) should only be called from #handleError().
            const error = args[0];
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_catchingPromiseCreated, "f") && !listeners?.length) {
                // Trigger an unhandled rejection if the user hasn't registered any error handlers.
                // If you are seeing stack traces here, make sure to handle errors via either:
                // - runner.on('error', () => ...)
                // - await runner.done()
                // - await runner.finalChatCompletion()
                // - etc.
                Promise.reject(error);
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_rejectConnectedPromise, "f").call(this, error);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_rejectEndPromise, "f").call(this, error);
            this._emit('end');
        }
    }
    _emitFinal() {}
}
_EventStream_connectedPromise = new WeakMap(), _EventStream_resolveConnectedPromise = new WeakMap(), _EventStream_rejectConnectedPromise = new WeakMap(), _EventStream_endPromise = new WeakMap(), _EventStream_resolveEndPromise = new WeakMap(), _EventStream_rejectEndPromise = new WeakMap(), _EventStream_listeners = new WeakMap(), _EventStream_abortListeners = new WeakMap(), _EventStream_ended = new WeakMap(), _EventStream_errored = new WeakMap(), _EventStream_aborted = new WeakMap(), _EventStream_catchingPromiseCreated = new WeakMap(), _EventStream_instances = new WeakSet(), _EventStream_removeAbortListeners = function _EventStream_removeAbortListeners() {
    for (const { signal, listener } of (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _EventStream_abortListeners, "f").splice(0)){
        signal.removeEventListener('abort', listener);
    }
}, _EventStream_handleError = function _EventStream_handleError(error) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _EventStream_errored, true, "f");
    if (error instanceof Error && error.name === 'AbortError') {
        error = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIUserAbortError"]();
    }
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIUserAbortError"]) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _EventStream_aborted, true, "f");
        return this._emit('abort', error);
    }
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]) {
        return this._emit('error', error);
    }
    if (error instanceof Error) {
        const openAIError = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](error.message);
        // @ts-ignore
        openAIError.cause = error;
        return this._emit('error', openAIError);
    }
    return this._emit('error', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](String(error)));
}; //# sourceMappingURL=EventStream.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/RunnableFunction.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ParsingToolFunction",
    ()=>ParsingToolFunction,
    "isRunnableFunctionWithParse",
    ()=>isRunnableFunctionWithParse
]);
function isRunnableFunctionWithParse(fn) {
    return typeof fn.parse === 'function';
}
class ParsingToolFunction {
    constructor(input){
        this.type = 'function';
        this.function = input;
    }
} //# sourceMappingURL=RunnableFunction.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/AbstractChatCompletionRunner.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AbstractChatCompletionRunner",
    ()=>AbstractChatCompletionRunner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/tslib.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/error.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/error.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$uuid$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/utils/uuid.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/parser.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$chatCompletionUtils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/chatCompletionUtils.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$EventStream$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/EventStream.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$RunnableFunction$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/RunnableFunction.mjs [app-route] (ecmascript)");
var _AbstractChatCompletionRunner_instances, _AbstractChatCompletionRunner_getFinalContent, _AbstractChatCompletionRunner_getFinalMessage, _AbstractChatCompletionRunner_getFinalFunctionToolCall, _AbstractChatCompletionRunner_getFinalFunctionToolCallResult, _AbstractChatCompletionRunner_calculateTotalUsage, _AbstractChatCompletionRunner_validateParams, _AbstractChatCompletionRunner_stringifyFunctionCallResult;
;
;
;
;
;
;
;
const DEFAULT_MAX_CHAT_COMPLETIONS = 10;
function normalizeToolCallIds(chatCompletion) {
    for (const choice of chatCompletion.choices){
        for (const toolCall of choice.message.tool_calls ?? []){
            // Some OpenAI-compatible providers omit tool call IDs or return an empty string.
            // Generate a unique ID before the completion is stored or emitted so the assistant
            // tool call and its result message always reference the same value.
            if (!toolCall.id) {
                toolCall.id = `call_${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$uuid$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uuid4"])()}`;
            }
        }
    }
}
/**
 * Parsed completions contain response-only and helper-only fields. Keep those
 * on runner.messages for callers, but only replay valid request fields.
 */ function toRequestMessage(message) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$chatCompletionUtils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAssistantMessage"])(message)) return message;
    const requestMessage = {
        role: 'assistant'
    };
    if (message.audio != null) requestMessage.audio = {
        id: message.audio.id
    };
    if (message.content !== undefined) requestMessage.content = message.content;
    if (message.function_call != null) requestMessage.function_call = message.function_call;
    if (message.name !== undefined) requestMessage.name = message.name;
    if (message.refusal != null) requestMessage.refusal = message.refusal;
    if (message.tool_calls !== undefined) {
        requestMessage.tool_calls = message.tool_calls.map((toolCall)=>{
            if (toolCall.type === 'custom') {
                return {
                    id: toolCall.id,
                    type: toolCall.type,
                    custom: {
                        input: toolCall.custom.input,
                        name: toolCall.custom.name
                    }
                };
            }
            return {
                id: toolCall.id,
                type: toolCall.type,
                function: {
                    arguments: toolCall.function.arguments,
                    name: toolCall.function.name
                }
            };
        });
    }
    return requestMessage;
}
class AbstractChatCompletionRunner extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$EventStream$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventStream"] {
    constructor(){
        super(...arguments);
        _AbstractChatCompletionRunner_instances.add(this);
        this._chatCompletions = [];
        this.messages = [];
    }
    _addChatCompletion(chatCompletion) {
        normalizeToolCallIds(chatCompletion);
        this._chatCompletions.push(chatCompletion);
        this._emit('chatCompletion', chatCompletion);
        const message = chatCompletion.choices[0]?.message;
        if (message) this._addMessage(message);
        return chatCompletion;
    }
    _addMessage(message, emit = true) {
        if (!('content' in message)) message.content = null;
        this.messages.push(message);
        if (emit) {
            this._emit('message', message);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$chatCompletionUtils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isToolMessage"])(message) && message.content) {
                // Note, this assumes that {role: 'tool', content: …} is always the result of a call of tool of type=function.
                this._emit('functionToolCallResult', message.content);
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$chatCompletionUtils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAssistantMessage"])(message) && message.tool_calls) {
                for (const tool_call of message.tool_calls){
                    if (tool_call.type === 'function') {
                        this._emit('functionToolCall', tool_call.function);
                    }
                }
            }
        }
    }
    /**
     * @returns a promise that resolves with the final ChatCompletion, or rejects
     * if an error occurred or the stream ended prematurely without producing a ChatCompletion.
     */ async finalChatCompletion() {
        await this.done();
        const completion = this._chatCompletions[this._chatCompletions.length - 1];
        if (!completion) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]('stream ended without producing a ChatCompletion');
        return completion;
    }
    /**
     * @returns a promise that resolves with the content of the final ChatCompletionMessage, or rejects
     * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
     */ async finalContent() {
        await this.done();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalContent).call(this);
    }
    /**
     * @returns a promise that resolves with the final assistant ChatCompletionMessage response,
     * or rejects if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
     */ async finalMessage() {
        await this.done();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this);
    }
    /**
     * @returns a promise that resolves with the content of the final FunctionCall, or rejects
     * if an error occurred or the stream ended prematurely without producing a ChatCompletionMessage.
     */ async finalFunctionToolCall() {
        await this.done();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionToolCall).call(this);
    }
    async finalFunctionToolCallResult() {
        await this.done();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionToolCallResult).call(this);
    }
    async totalUsage() {
        await this.done();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_calculateTotalUsage).call(this);
    }
    allChatCompletions() {
        return [
            ...this._chatCompletions
        ];
    }
    _emitFinal() {
        const completion = this._chatCompletions[this._chatCompletions.length - 1];
        if (completion) this._emit('finalChatCompletion', completion);
        const finalMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this);
        if (finalMessage) this._emit('finalMessage', finalMessage);
        const finalContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalContent).call(this);
        if (finalContent) this._emit('finalContent', finalContent);
        const finalFunctionCall = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionToolCall).call(this);
        if (finalFunctionCall) this._emit('finalFunctionToolCall', finalFunctionCall);
        const finalFunctionCallResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalFunctionToolCallResult).call(this);
        if (finalFunctionCallResult != null) this._emit('finalFunctionToolCallResult', finalFunctionCallResult);
        if (this._chatCompletions.some((c)=>c.usage)) {
            this._emit('totalUsage', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_calculateTotalUsage).call(this));
        }
    }
    async _createChatCompletion(client, params, options) {
        this._listenForAbort(options?.signal);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_validateParams).call(this, params);
        const chatCompletion = await client.chat.completions.create({
            ...params,
            stream: false
        }, {
            ...options,
            signal: this.controller.signal
        });
        this._connected();
        return this._addChatCompletion((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseChatCompletion"])(chatCompletion, params));
    }
    async _runChatCompletion(client, params, options) {
        for (const message of params.messages){
            this._addMessage(message, false);
        }
        return await this._createChatCompletion(client, params, options);
    }
    async _runTools(client, params, runner, options) {
        const role = 'tool';
        const { tool_choice = 'auto', stream, toolContext: inputToolContext, ...restParams } = params;
        const toolContext = inputToolContext;
        const singleFunctionToCall = typeof tool_choice !== 'string' && tool_choice.type === 'function' && tool_choice?.function?.name;
        const { maxChatCompletions = DEFAULT_MAX_CHAT_COMPLETIONS, afterCompletion } = options || {};
        // TODO(someday): clean this logic up
        const inputTools = params.tools.map((tool)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAutoParsableTool"])(tool)) {
                if (!tool.$callback) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]('Tool given to `.runTools()` that does not have an associated function');
                }
                return {
                    type: 'function',
                    function: {
                        function: tool.$callback,
                        name: tool.function.name,
                        description: tool.function.description || '',
                        parameters: tool.function.parameters,
                        parse: tool.$parseRaw,
                        strict: true
                    }
                };
            }
            return tool;
        });
        const functionsByName = {};
        for (const f of inputTools){
            if (f.type === 'function') {
                functionsByName[f.function.name || f.function.function.name] = f.function;
            }
        }
        const tools = 'tools' in params ? inputTools.map((t)=>t.type === 'function' ? {
                type: 'function',
                function: {
                    name: t.function.name || t.function.function.name,
                    parameters: t.function.parameters,
                    description: t.function.description,
                    strict: t.function.strict
                }
            } : t) : undefined;
        for (const message of params.messages){
            this._addMessage(message, false);
        }
        const runToolCall = async (toolCall)=>{
            if (toolCall.type !== 'function') return {
                message: undefined,
                functionCalled: false
            };
            const tool_call_id = toolCall.id;
            const { name, arguments: args } = toolCall.function;
            const fn = functionsByName[name];
            if (!fn) {
                const content = `Invalid tool_call: ${JSON.stringify(name)}. Available options are: ${Object.keys(functionsByName).map((name)=>JSON.stringify(name)).join(', ')}. Please try again`;
                return {
                    message: {
                        role,
                        tool_call_id,
                        content
                    },
                    functionCalled: false
                };
            }
            if (singleFunctionToCall && singleFunctionToCall !== name) {
                const content = `Invalid tool_call: ${JSON.stringify(name)}. ${JSON.stringify(singleFunctionToCall)} requested. Please try again`;
                return {
                    message: {
                        role,
                        tool_call_id,
                        content
                    },
                    functionCalled: false
                };
            }
            let rawContent;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$RunnableFunction$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isRunnableFunctionWithParse"])(fn)) {
                let parsed;
                try {
                    parsed = await fn.parse(args);
                } catch (error) {
                    const content = error instanceof Error ? error.message : String(error);
                    return {
                        message: {
                            role,
                            tool_call_id,
                            content
                        },
                        functionCalled: false
                    };
                }
                rawContent = await fn.function(parsed, runner, toolContext);
            } else {
                rawContent = await fn.function(args, runner, toolContext);
            }
            const content = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_stringifyFunctionCallResult).call(this, rawContent);
            return {
                message: {
                    role,
                    tool_call_id,
                    content
                },
                functionCalled: true
            };
        };
        for(let i = 0; i < maxChatCompletions; ++i){
            const chatCompletion = await this._createChatCompletion(client, {
                ...restParams,
                tool_choice,
                tools,
                messages: this.messages.map(toRequestMessage)
            }, options);
            const message = chatCompletion.choices[0]?.message;
            if (!message) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`missing message in ChatCompletion response`);
            }
            if (!message.tool_calls?.length) {
                await afterCompletion?.(chatCompletion, runner);
                return;
            }
            if (singleFunctionToCall || params.parallel_tool_calls === false) {
                for (const toolCall of message.tool_calls){
                    const result = await runToolCall(toolCall);
                    if (result.message) this._addMessage(result.message);
                    if (singleFunctionToCall && result.functionCalled) {
                        await afterCompletion?.(chatCompletion, runner);
                        return;
                    }
                }
            } else {
                const results = await Promise.allSettled(message.tool_calls.map(runToolCall));
                // Wait for every concurrently running tool to settle before surfacing an
                // error so tool side effects cannot continue after the runner has ended.
                for (const result of results){
                    if (result.status === 'rejected') throw result.reason;
                }
                // Promise.allSettled preserves input order, so the next request receives
                // tool result messages in the same order as the assistant's tool calls.
                for (const result of results){
                    if (result.status === 'fulfilled' && result.value.message) {
                        this._addMessage(result.value.message);
                    }
                }
            }
            await afterCompletion?.(chatCompletion, runner);
        }
        return;
    }
}
_AbstractChatCompletionRunner_instances = new WeakSet(), _AbstractChatCompletionRunner_getFinalContent = function _AbstractChatCompletionRunner_getFinalContent() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AbstractChatCompletionRunner_instances, "m", _AbstractChatCompletionRunner_getFinalMessage).call(this).content ?? null;
}, _AbstractChatCompletionRunner_getFinalMessage = function _AbstractChatCompletionRunner_getFinalMessage() {
    let i = this.messages.length;
    while(i-- > 0){
        const message = this.messages[i];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$chatCompletionUtils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAssistantMessage"])(message)) {
            // TODO: support audio here
            const ret = {
                ...message,
                content: message.content ?? null,
                refusal: message.refusal ?? null
            };
            return ret;
        }
    }
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]('stream ended without producing a ChatCompletionMessage with role=assistant');
}, _AbstractChatCompletionRunner_getFinalFunctionToolCall = function _AbstractChatCompletionRunner_getFinalFunctionToolCall() {
    for(let i = this.messages.length - 1; i >= 0; i--){
        const message = this.messages[i];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$chatCompletionUtils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAssistantMessage"])(message) && message?.tool_calls?.length) {
            for(let j = message.tool_calls.length - 1; j >= 0; j--){
                const toolCall = message.tool_calls[j];
                if (toolCall?.type === 'function') {
                    return toolCall.function;
                }
            }
        }
    }
    return;
}, _AbstractChatCompletionRunner_getFinalFunctionToolCallResult = function _AbstractChatCompletionRunner_getFinalFunctionToolCallResult() {
    for(let i = this.messages.length - 1; i >= 0; i--){
        const message = this.messages[i];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$chatCompletionUtils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isToolMessage"])(message) && message.content != null && typeof message.content === 'string' && this.messages.some((x)=>x.role === 'assistant' && x.tool_calls?.some((y)=>y.type === 'function' && y.id === message.tool_call_id))) {
            return message.content;
        }
    }
    return;
}, _AbstractChatCompletionRunner_calculateTotalUsage = function _AbstractChatCompletionRunner_calculateTotalUsage() {
    const total = {
        completion_tokens: 0,
        prompt_tokens: 0,
        total_tokens: 0
    };
    for (const { usage } of this._chatCompletions){
        if (usage) {
            total.completion_tokens += usage.completion_tokens;
            total.prompt_tokens += usage.prompt_tokens;
            total.total_tokens += usage.total_tokens;
        }
    }
    return total;
}, _AbstractChatCompletionRunner_validateParams = function _AbstractChatCompletionRunner_validateParams(params) {
    if (params.n != null && params.n > 1) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]('ChatCompletion convenience helpers only support n=1 at this time. To use n>1, please use chat.completions.create() directly.');
    }
}, _AbstractChatCompletionRunner_stringifyFunctionCallResult = function _AbstractChatCompletionRunner_stringifyFunctionCallResult(rawContent) {
    return typeof rawContent === 'string' ? rawContent : rawContent === undefined ? 'undefined' : JSON.stringify(rawContent);
}; //# sourceMappingURL=AbstractChatCompletionRunner.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/ChatCompletionRunner.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatCompletionRunner",
    ()=>ChatCompletionRunner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$AbstractChatCompletionRunner$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/AbstractChatCompletionRunner.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$chatCompletionUtils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/chatCompletionUtils.mjs [app-route] (ecmascript)");
;
;
class ChatCompletionRunner extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$AbstractChatCompletionRunner$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AbstractChatCompletionRunner"] {
    static runTools(client, params, options) {
        const runner = new ChatCompletionRunner();
        const opts = {
            ...options,
            headers: {
                ...options?.headers,
                'X-Stainless-Helper-Method': 'runTools'
            }
        };
        runner._run(()=>runner._runTools(client, params, runner, opts));
        return runner;
    }
    _addMessage(message, emit = true) {
        super._addMessage(message, emit);
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$chatCompletionUtils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAssistantMessage"])(message) && message.content) {
            this._emit('content', message.content);
        }
    }
} //# sourceMappingURL=ChatCompletionRunner.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/ChatCompletionStream.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatCompletionStream",
    ()=>ChatCompletionStream,
    "makeChatCompletionReadableStreamMessageChunk",
    ()=>makeChatCompletionReadableStreamMessageChunk
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/tslib.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$partial$2d$json$2d$parser$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/partial-json-parser/parser.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/error.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/error.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$uuid$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/utils/uuid.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/parser.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$streaming$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/streaming.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$streaming$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/streaming.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$AbstractChatCompletionRunner$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/AbstractChatCompletionRunner.mjs [app-route] (ecmascript)");
var _ChatCompletionStream_instances, _ChatCompletionStream_params, _ChatCompletionStream_audioDoneChoiceIndexes, _ChatCompletionStream_choiceEventStates, _ChatCompletionStream_currentChatCompletionSnapshot, _ChatCompletionStream_beginRequest, _ChatCompletionStream_getChoiceEventState, _ChatCompletionStream_addChunk, _ChatCompletionStream_emitToolCallDoneEvent, _ChatCompletionStream_emitContentDoneEvents, _ChatCompletionStream_endRequest, _ChatCompletionStream_getAutoParseableResponseFormat, _ChatCompletionStream_accumulateChatCompletion;
;
;
;
;
;
;
;
// Keep message records readable as empty chunks by older SDKs. Their finalizer
// overwrites `object`, so the encoded payload does not leak into completions.
const CHAT_COMPLETION_READABLE_STREAM_MESSAGE_PREFIX = 'chat.completion.chunk.message:';
function makeChatCompletionReadableStreamMessageChunk(chunk, message, toolCallIds) {
    const payload = {
        type: 'message',
        message,
        ...toolCallIds ? {
            tool_call_ids: toolCallIds
        } : {}
    };
    return {
        id: chunk.id,
        choices: [],
        created: chunk.created,
        model: chunk.model,
        object: `${CHAT_COMPLETION_READABLE_STREAM_MESSAGE_PREFIX}${JSON.stringify(payload)}`
    };
}
function isChatCompletionReadableStreamMessage(item) {
    return 'type' in item && item.type === 'message' && 'message' in item || 'object' in item && typeof item.object === 'string' && item.object.startsWith(CHAT_COMPLETION_READABLE_STREAM_MESSAGE_PREFIX);
}
function getChatCompletionReadableStreamMessage(item) {
    if ('type' in item) {
        return item;
    }
    return JSON.parse(item.object.slice(CHAT_COMPLETION_READABLE_STREAM_MESSAGE_PREFIX.length));
}
class ChatCompletionStream extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$AbstractChatCompletionRunner$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AbstractChatCompletionRunner"] {
    constructor(params){
        super();
        _ChatCompletionStream_instances.add(this);
        _ChatCompletionStream_params.set(this, void 0);
        _ChatCompletionStream_audioDoneChoiceIndexes.set(this, void 0);
        _ChatCompletionStream_choiceEventStates.set(this, void 0);
        _ChatCompletionStream_currentChatCompletionSnapshot.set(this, void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _ChatCompletionStream_params, params, "f");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _ChatCompletionStream_audioDoneChoiceIndexes, new Set(), "f");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _ChatCompletionStream_choiceEventStates, [], "f");
    }
    get currentChatCompletionSnapshot() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
    }
    /**
     * Intended for use on the frontend, consuming a stream produced with
     * `.toReadableStream()` on the backend.
     *
     * Note that messages sent to the model do not appear in `.on('message')`
     * in this context.
     */ static fromReadableStream(stream) {
        const runner = new ChatCompletionStream(null);
        runner._run(()=>runner._fromReadableStream(stream));
        return runner;
    }
    static createChatCompletion(client, params, options) {
        const runner = new ChatCompletionStream(params);
        runner._run(()=>runner._runChatCompletion(client, {
                ...params,
                stream: true
            }, {
                ...options,
                headers: {
                    ...options?.headers,
                    'X-Stainless-Helper-Method': 'stream'
                }
            }));
        return runner;
    }
    async _createChatCompletion(client, params, options) {
        super._createChatCompletion;
        this._listenForAbort(options?.signal);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_beginRequest).call(this);
        const stream = await client.chat.completions.create({
            ...params,
            stream: true
        }, {
            ...options,
            signal: this.controller.signal
        });
        this._connected();
        for await (const chunk of stream){
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_addChunk).call(this, chunk);
        }
        if (stream.controller.signal?.aborted) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIUserAbortError"]();
        }
        return this._addChatCompletion((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
    }
    async _fromReadableStream(readableStream, options) {
        this._listenForAbort(options?.signal);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_beginRequest).call(this);
        this._connected();
        const stream = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$streaming$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Stream"].fromReadableStream(readableStream, this.controller);
        let chatId;
        for await (const item of stream){
            if (isChatCompletionReadableStreamMessage(item)) {
                const message = getChatCompletionReadableStreamMessage(item);
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f")) {
                    const toolCalls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f").choices[0]?.message.tool_calls;
                    for (const [index, id] of message.tool_call_ids?.entries() ?? []){
                        const toolCall = toolCalls?.[index];
                        if (toolCall && id) {
                            toolCall.id = id;
                        }
                    }
                    this._addChatCompletion((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
                    chatId = undefined;
                }
                this._addMessage(message.message);
                continue;
            }
            const chunk = item;
            if (chatId && chunk.id && chatId !== chunk.id) {
                // A new request has been made.
                this._addChatCompletion((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_addChunk).call(this, chunk);
            if (chunk.id) chatId = chunk.id;
        }
        if (stream.controller.signal?.aborted) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIUserAbortError"]();
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f")) {
            return this._addChatCompletion((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_endRequest).call(this));
        }
        const lastChatCompletion = this._chatCompletions[this._chatCompletions.length - 1];
        if (lastChatCompletion) {
            return lastChatCompletion;
        }
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`request ended without sending any chunks`);
    }
    [(_ChatCompletionStream_params = new WeakMap(), _ChatCompletionStream_audioDoneChoiceIndexes = new WeakMap(), _ChatCompletionStream_choiceEventStates = new WeakMap(), _ChatCompletionStream_currentChatCompletionSnapshot = new WeakMap(), _ChatCompletionStream_instances = new WeakSet(), _ChatCompletionStream_beginRequest = function _ChatCompletionStream_beginRequest() {
        if (this.ended) return;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _ChatCompletionStream_audioDoneChoiceIndexes, new Set(), "f");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _ChatCompletionStream_currentChatCompletionSnapshot, undefined, "f");
    }, _ChatCompletionStream_getChoiceEventState = function _ChatCompletionStream_getChoiceEventState(choice) {
        let state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_choiceEventStates, "f")[choice.index];
        if (state) {
            return state;
        }
        state = {
            content_done: false,
            refusal_done: false,
            logprobs_content_done: false,
            logprobs_refusal_done: false,
            done_tool_calls: new Set(),
            current_tool_call_index: null
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_choiceEventStates, "f")[choice.index] = state;
        return state;
    }, _ChatCompletionStream_addChunk = function _ChatCompletionStream_addChunk(chunk) {
        if (this.ended) return;
        const completion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_accumulateChatCompletion).call(this, chunk);
        this._emit('chunk', chunk, completion);
        for (const choice of chunk.choices){
            const choiceSnapshot = completion.choices[choice.index];
            const { delta } = choice;
            if (delta?.content != null && choiceSnapshot.message?.role === 'assistant' && choiceSnapshot.message?.content) {
                this._emit('content', delta.content, choiceSnapshot.message.content);
                this._emit('content.delta', {
                    delta: delta.content,
                    snapshot: choiceSnapshot.message.content,
                    parsed: choiceSnapshot.message.parsed
                });
            }
            if (delta?.refusal != null && choiceSnapshot.message?.role === 'assistant' && choiceSnapshot.message?.refusal) {
                this._emit('refusal.delta', {
                    delta: delta.refusal,
                    snapshot: choiceSnapshot.message.refusal
                });
            }
            if (choice.logprobs?.content != null && choiceSnapshot.message?.role === 'assistant') {
                this._emit('logprobs.content.delta', {
                    content: choice.logprobs?.content,
                    snapshot: choiceSnapshot.logprobs?.content ?? []
                });
            }
            if (choice.logprobs?.refusal != null && choiceSnapshot.message?.role === 'assistant') {
                this._emit('logprobs.refusal.delta', {
                    refusal: choice.logprobs?.refusal,
                    snapshot: choiceSnapshot.logprobs?.refusal ?? []
                });
            }
            const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getChoiceEventState).call(this, choiceSnapshot);
            if (choiceSnapshot.finish_reason) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_emitContentDoneEvents).call(this, choiceSnapshot);
                if (state.current_tool_call_index != null) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_emitToolCallDoneEvent).call(this, choiceSnapshot, state.current_tool_call_index);
                }
            }
            for (const toolCall of delta?.tool_calls ?? []){
                if (state.current_tool_call_index !== toolCall.index) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_emitContentDoneEvents).call(this, choiceSnapshot);
                    // new tool call started, the previous one is done
                    if (state.current_tool_call_index != null) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_emitToolCallDoneEvent).call(this, choiceSnapshot, state.current_tool_call_index);
                    }
                }
                state.current_tool_call_index = toolCall.index;
            }
            for (const toolCallDelta of delta?.tool_calls ?? []){
                const toolCallSnapshot = choiceSnapshot.message.tool_calls?.[toolCallDelta.index];
                if (!toolCallSnapshot?.type) {
                    continue;
                }
                if (toolCallSnapshot?.type === 'function') {
                    this._emit('tool_calls.function.arguments.delta', {
                        name: toolCallSnapshot.function?.name,
                        index: toolCallDelta.index,
                        arguments: toolCallSnapshot.function.arguments,
                        parsed_arguments: toolCallSnapshot.function.parsed_arguments,
                        arguments_delta: toolCallDelta.function?.arguments ?? ''
                    });
                } else {
                    assertNever(toolCallSnapshot?.type);
                }
            }
        }
    }, _ChatCompletionStream_emitToolCallDoneEvent = function _ChatCompletionStream_emitToolCallDoneEvent(choiceSnapshot, toolCallIndex) {
        const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getChoiceEventState).call(this, choiceSnapshot);
        if (state.done_tool_calls.has(toolCallIndex)) {
            // we've already fired the done event
            return;
        }
        const toolCallSnapshot = choiceSnapshot.message.tool_calls?.[toolCallIndex];
        if (!toolCallSnapshot) {
            throw new Error('no tool call snapshot');
        }
        if (!toolCallSnapshot.type) {
            throw new Error('tool call snapshot missing `type`');
        }
        if (toolCallSnapshot.type === 'function') {
            const inputTool = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_params, "f")?.tools?.find((tool)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isChatCompletionFunctionTool"])(tool) && tool.function.name === toolCallSnapshot.function.name); // TS doesn't narrow based on isChatCompletionTool
            this._emit('tool_calls.function.arguments.done', {
                name: toolCallSnapshot.function.name,
                index: toolCallIndex,
                arguments: toolCallSnapshot.function.arguments,
                parsed_arguments: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAutoParsableTool"])(inputTool) ? inputTool.$parseRaw(toolCallSnapshot.function.arguments) : inputTool?.function.strict ? JSON.parse(toolCallSnapshot.function.arguments) : null
            });
        } else {
            assertNever(toolCallSnapshot.type);
        }
    }, _ChatCompletionStream_emitContentDoneEvents = function _ChatCompletionStream_emitContentDoneEvents(choiceSnapshot) {
        const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getChoiceEventState).call(this, choiceSnapshot);
        if (choiceSnapshot.message.content && !state.content_done) {
            state.content_done = true;
            const responseFormat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getAutoParseableResponseFormat).call(this);
            this._emit('content.done', {
                content: choiceSnapshot.message.content,
                parsed: responseFormat ? responseFormat.$parseRaw(choiceSnapshot.message.content) : null
            });
        }
        if (choiceSnapshot.message.refusal && !state.refusal_done) {
            state.refusal_done = true;
            this._emit('refusal.done', {
                refusal: choiceSnapshot.message.refusal
            });
        }
        if (choiceSnapshot.logprobs?.content && !state.logprobs_content_done) {
            state.logprobs_content_done = true;
            this._emit('logprobs.content.done', {
                content: choiceSnapshot.logprobs.content
            });
        }
        if (choiceSnapshot.logprobs?.refusal && !state.logprobs_refusal_done) {
            state.logprobs_refusal_done = true;
            this._emit('logprobs.refusal.done', {
                refusal: choiceSnapshot.logprobs.refusal
            });
        }
    }, _ChatCompletionStream_endRequest = function _ChatCompletionStream_endRequest() {
        if (this.ended) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`stream has ended, this shouldn't happen`);
        }
        const snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
        if (!snapshot) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`request ended without sending any chunks`);
        }
        const audioDoneChoiceIndexes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_audioDoneChoiceIndexes, "f");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _ChatCompletionStream_audioDoneChoiceIndexes, new Set(), "f");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _ChatCompletionStream_currentChatCompletionSnapshot, undefined, "f");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _ChatCompletionStream_choiceEventStates, [], "f");
        return finalizeChatCompletion(snapshot, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_params, "f"), audioDoneChoiceIndexes);
    }, _ChatCompletionStream_getAutoParseableResponseFormat = function _ChatCompletionStream_getAutoParseableResponseFormat() {
        const responseFormat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_params, "f")?.response_format;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAutoParsableResponseFormat"])(responseFormat)) {
            return responseFormat;
        }
        return null;
    }, _ChatCompletionStream_accumulateChatCompletion = function _ChatCompletionStream_accumulateChatCompletion(chunk) {
        var _a, _b, _c, _d, _e;
        let snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_currentChatCompletionSnapshot, "f");
        const { choices, ...rest } = chunk;
        if (!snapshot) {
            snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _ChatCompletionStream_currentChatCompletionSnapshot, {
                ...rest,
                choices: []
            }, "f");
        } else if (chunk.id) {
            Object.assign(snapshot, rest);
        }
        for (const { delta, finish_reason, index, logprobs = null, ...other } of chunk.choices){
            let choice = snapshot.choices[index];
            if (!choice) {
                choice = snapshot.choices[index] = {
                    finish_reason,
                    index,
                    message: {},
                    logprobs,
                    ...other
                };
            }
            if (logprobs) {
                if (!choice.logprobs) {
                    choice.logprobs = Object.assign({}, logprobs);
                } else {
                    const { content, refusal, ...rest } = logprobs;
                    assertIsEmpty(rest);
                    Object.assign(choice.logprobs, rest);
                    if (content) {
                        (_a = choice.logprobs).content ?? (_a.content = []);
                        choice.logprobs.content.push(...content);
                    }
                    if (refusal) {
                        (_b = choice.logprobs).refusal ?? (_b.refusal = []);
                        choice.logprobs.refusal.push(...refusal);
                    }
                }
            }
            if (finish_reason) {
                choice.finish_reason = finish_reason;
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_params, "f") && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasAutoParseableInput"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_params, "f"))) {
                    if (finish_reason === 'length') {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LengthFinishReasonError"]();
                    }
                    if (finish_reason === 'content_filter') {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContentFilterFinishReasonError"]();
                    }
                }
            }
            Object.assign(choice, other);
            if (!delta) continue; // Shouldn't happen; just in case.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_audioDoneChoiceIndexes, "f").delete(index);
            const { audio, content, refusal, function_call, role, tool_calls, ...rest } = delta;
            assertIsEmpty(rest);
            Object.assign(choice.message, rest);
            if (audio?.expires_at != null && audio.id == null && audio.data == null && audio.transcript == null && content == null && refusal == null && function_call == null && role == null && tool_calls == null && Object.keys(rest).length === 0) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_audioDoneChoiceIndexes, "f").add(index);
            }
            if (refusal) {
                choice.message.refusal = (choice.message.refusal || '') + refusal;
            }
            if (role) choice.message.role = role;
            if (audio) {
                const audioSnapshot = (_c = choice.message).audio ?? (_c.audio = {});
                if (audio.id != null) audioSnapshot.id = audio.id;
                if (audio.data != null) audioSnapshot.data = (audioSnapshot.data ?? '') + audio.data;
                if (audio.transcript != null) {
                    audioSnapshot.transcript = (audioSnapshot.transcript ?? '') + audio.transcript;
                }
                if (audio.expires_at != null) audioSnapshot.expires_at = audio.expires_at;
            }
            if (function_call) {
                if (!choice.message.function_call) {
                    choice.message.function_call = function_call;
                } else {
                    if (function_call.name) choice.message.function_call.name = function_call.name;
                    if (function_call.arguments) {
                        (_d = choice.message.function_call).arguments ?? (_d.arguments = '');
                        choice.message.function_call.arguments += function_call.arguments;
                    }
                }
            }
            if (content) {
                choice.message.content = (choice.message.content || '') + content;
                if (!choice.message.refusal && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_instances, "m", _ChatCompletionStream_getAutoParseableResponseFormat).call(this)) {
                    // The partial parser does not accept whitespace-only input.
                    choice.message.parsed = choice.message.content.trim() ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$partial$2d$json$2d$parser$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["partialParse"])(choice.message.content) : null;
                }
            }
            if (tool_calls) {
                if (!choice.message.tool_calls) choice.message.tool_calls = [];
                for (const { index, id, type, function: fn, ...rest } of tool_calls){
                    const tool_call = (_e = choice.message.tool_calls)[index] ?? (_e[index] = {});
                    Object.assign(tool_call, rest);
                    if (id) tool_call.id = id;
                    if (type) tool_call.type = type;
                    if (fn) tool_call.function ?? (tool_call.function = {
                        name: fn.name ?? '',
                        arguments: ''
                    });
                    if (fn?.name) tool_call.function.name = fn.name;
                    if (fn?.arguments) {
                        tool_call.function.arguments += fn.arguments;
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["shouldParseToolCall"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ChatCompletionStream_params, "f"), tool_call)) {
                            tool_call.function.parsed_arguments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$partial$2d$json$2d$parser$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["partialParse"])(tool_call.function.arguments);
                        }
                    }
                }
            }
        }
        return snapshot;
    }, Symbol.asyncIterator)]() {
        const pushQueue = [];
        const readQueue = [];
        let done = false;
        this.on('chunk', (chunk)=>{
            const reader = readQueue.shift();
            if (reader) {
                reader.resolve(chunk);
            } else {
                pushQueue.push(chunk);
            }
        });
        this.on('end', ()=>{
            done = true;
            for (const reader of readQueue){
                reader.resolve(undefined);
            }
            readQueue.length = 0;
        });
        this.on('abort', (err)=>{
            done = true;
            for (const reader of readQueue){
                reader.reject(err);
            }
            readQueue.length = 0;
        });
        this.on('error', (err)=>{
            done = true;
            for (const reader of readQueue){
                reader.reject(err);
            }
            readQueue.length = 0;
        });
        return {
            next: async ()=>{
                if (!pushQueue.length) {
                    if (done) {
                        return {
                            value: undefined,
                            done: true
                        };
                    }
                    return new Promise((resolve, reject)=>readQueue.push({
                            resolve,
                            reject
                        })).then((chunk)=>chunk ? {
                            value: chunk,
                            done: false
                        } : {
                            value: undefined,
                            done: true
                        });
                }
                const chunk = pushQueue.shift();
                return {
                    value: chunk,
                    done: false
                };
            },
            return: async ()=>{
                this.abort();
                return {
                    value: undefined,
                    done: true
                };
            }
        };
    }
    toReadableStream() {
        const stream = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$streaming$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Stream"](this[Symbol.asyncIterator].bind(this), this.controller);
        return stream.toReadableStream();
    }
}
function finalizeChatCompletion(snapshot, params, audioDoneChoiceIndexes) {
    const { id, choices, created, model, system_fingerprint, ...rest } = snapshot;
    const completion = {
        ...rest,
        id,
        choices: choices.map(({ message, finish_reason, index, logprobs, ...choiceRest })=>{
            const { content = null, function_call, tool_calls, audio, ...messageRest } = message;
            // Audio streams can end with an expires_at-only chunk after the
            // generated audio, without a separate finish_reason.
            const finishReason = finish_reason ?? (audioDoneChoiceIndexes.has(index) && isCompleteAudio(audio) ? 'stop' : null);
            if (!finishReason) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`missing finish_reason for choice ${index}`);
            }
            const audioResponse = audio ? {
                audio: audio
            } : {};
            const role = message.role; // this is what we expect; in theory it could be different which would make our types a slight lie but would be fine.
            if (!role) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`missing role for choice ${index}`);
            }
            if (function_call) {
                const { arguments: args, name } = function_call;
                if (args == null) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`missing function_call.arguments for choice ${index}`);
                }
                if (!name) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`missing function_call.name for choice ${index}`);
                }
                return {
                    ...choiceRest,
                    message: {
                        ...audioResponse,
                        content,
                        function_call: {
                            arguments: args,
                            name
                        },
                        role,
                        refusal: message.refusal ?? null
                    },
                    finish_reason: finishReason,
                    index,
                    logprobs
                };
            }
            if (tool_calls) {
                return {
                    ...choiceRest,
                    index,
                    finish_reason: finishReason,
                    logprobs,
                    message: {
                        ...messageRest,
                        ...audioResponse,
                        role,
                        content,
                        refusal: message.refusal ?? null,
                        tool_calls: tool_calls.map((tool_call, i)=>{
                            const { function: fn, type, id, ...toolRest } = tool_call;
                            const { arguments: args, name, ...fnRest } = fn || {};
                            if (type == null) {
                                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`missing choices[${index}].tool_calls[${i}].type\n${str(snapshot)}`);
                            }
                            if (name == null) {
                                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`missing choices[${index}].tool_calls[${i}].function.name\n${str(snapshot)}`);
                            }
                            if (args == null) {
                                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`missing choices[${index}].tool_calls[${i}].function.arguments\n${str(snapshot)}`);
                            }
                            return {
                                ...toolRest,
                                id: id || `call_${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$uuid$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uuid4"])()}`,
                                type,
                                function: {
                                    ...fnRest,
                                    name,
                                    arguments: args
                                }
                            };
                        })
                    }
                };
            }
            return {
                ...choiceRest,
                message: {
                    ...messageRest,
                    ...audioResponse,
                    content,
                    role,
                    refusal: message.refusal ?? null
                },
                finish_reason: finishReason,
                index,
                logprobs
            };
        }),
        created,
        model,
        object: 'chat.completion',
        ...system_fingerprint ? {
            system_fingerprint
        } : {}
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["maybeParseChatCompletion"])(completion, params);
}
function isCompleteAudio(audio) {
    return audio?.id != null && audio.data != null && audio.transcript != null && audio.expires_at != null;
}
function str(x) {
    return JSON.stringify(x);
}
/**
 * Ensures the given argument is an empty object, useful for
 * asserting that all known properties on an object have been
 * destructured.
 */ function assertIsEmpty(obj) {
    return;
}
function assertNever(_x) {} //# sourceMappingURL=ChatCompletionStream.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/ChatCompletionStreamingRunner.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatCompletionStreamingRunner",
    ()=>ChatCompletionStreamingRunner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$ChatCompletionStream$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/ChatCompletionStream.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/error.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/error.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$streaming$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/streaming.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$streaming$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/streaming.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$chatCompletionUtils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/chatCompletionUtils.mjs [app-route] (ecmascript)");
;
;
;
;
class ChatCompletionStreamingRunner extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$ChatCompletionStream$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ChatCompletionStream"] {
    static fromReadableStream(stream) {
        const runner = new ChatCompletionStreamingRunner(null);
        runner._run(()=>runner._fromReadableStream(stream));
        return runner;
    }
    toReadableStream() {
        const pushQueue = [];
        const readQueue = [];
        let done = false;
        let lastChunk;
        let toolCallIds;
        const pushEvent = (event)=>{
            const reader = readQueue.shift();
            if (reader) {
                reader.resolve(event);
            } else {
                pushQueue.push(event);
            }
        };
        this.on('chunk', (chunk)=>{
            lastChunk = chunk;
            pushEvent(chunk);
        });
        this.on('message', (message)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$chatCompletionUtils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAssistantMessage"])(message)) {
                toolCallIds = message.tool_calls?.map((toolCall)=>toolCall.id);
                return;
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$chatCompletionUtils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isToolMessage"])(message)) {
                if (!lastChunk) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]('cannot serialize a tool message before receiving any chunks');
                }
                pushEvent((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$ChatCompletionStream$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["makeChatCompletionReadableStreamMessageChunk"])(lastChunk, message, toolCallIds));
            }
        });
        this.on('end', ()=>{
            done = true;
            for (const reader of readQueue){
                reader.resolve(undefined);
            }
            readQueue.length = 0;
        });
        this.on('abort', (err)=>{
            done = true;
            for (const reader of readQueue){
                reader.reject(err);
            }
            readQueue.length = 0;
        });
        this.on('error', (err)=>{
            done = true;
            for (const reader of readQueue){
                reader.reject(err);
            }
            readQueue.length = 0;
        });
        const iterator = ()=>({
                next: async ()=>{
                    if (!pushQueue.length) {
                        if (done) {
                            return {
                                value: undefined,
                                done: true
                            };
                        }
                        return new Promise((resolve, reject)=>readQueue.push({
                                resolve,
                                reject
                            })).then((event)=>event ? {
                                value: event,
                                done: false
                            } : {
                                value: undefined,
                                done: true
                            });
                    }
                    const event = pushQueue.shift();
                    if (!event) {
                        return {
                            value: undefined,
                            done: true
                        };
                    }
                    return {
                        value: event,
                        done: false
                    };
                },
                return: async ()=>{
                    this.abort();
                    return {
                        value: undefined,
                        done: true
                    };
                }
            });
        const stream = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$streaming$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Stream"](iterator, this.controller);
        return stream.toReadableStream();
    }
    static runTools(client, params, options) {
        const runner = new ChatCompletionStreamingRunner(// @ts-expect-error TODO these types are incompatible
        params);
        const opts = {
            ...options,
            headers: {
                ...options?.headers,
                'X-Stainless-Helper-Method': 'runTools'
            }
        };
        runner._run(()=>runner._runTools(client, params, runner, opts));
        return runner;
    }
} //# sourceMappingURL=ChatCompletionStreamingRunner.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/AssistantStream.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssistantStream",
    ()=>AssistantStream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/tslib.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$streaming$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/streaming.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$streaming$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/streaming.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/error.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/error.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$EventStream$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/EventStream.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/utils.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/utils/values.mjs [app-route] (ecmascript)");
var _AssistantStream_instances, _a, _AssistantStream_events, _AssistantStream_runStepSnapshots, _AssistantStream_messageSnapshots, _AssistantStream_messageSnapshot, _AssistantStream_finalRun, _AssistantStream_currentContentIndex, _AssistantStream_currentContent, _AssistantStream_currentToolCallIndex, _AssistantStream_currentToolCall, _AssistantStream_currentEvent, _AssistantStream_currentRunSnapshot, _AssistantStream_currentRunStepSnapshot, _AssistantStream_addEvent, _AssistantStream_endRequest, _AssistantStream_handleMessage, _AssistantStream_handleRunStep, _AssistantStream_handleEvent, _AssistantStream_accumulateRunStep, _AssistantStream_accumulateMessage, _AssistantStream_accumulateContent, _AssistantStream_handleRun;
;
;
;
;
;
class AssistantStream extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$EventStream$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventStream"] {
    constructor(){
        super(...arguments);
        _AssistantStream_instances.add(this);
        //Track all events in a single list for reference
        _AssistantStream_events.set(this, []);
        //Used to accumulate deltas
        //We are accumulating many types so the value here is not strict
        _AssistantStream_runStepSnapshots.set(this, {});
        _AssistantStream_messageSnapshots.set(this, {});
        _AssistantStream_messageSnapshot.set(this, void 0);
        _AssistantStream_finalRun.set(this, void 0);
        _AssistantStream_currentContentIndex.set(this, void 0);
        _AssistantStream_currentContent.set(this, void 0);
        _AssistantStream_currentToolCallIndex.set(this, void 0);
        _AssistantStream_currentToolCall.set(this, void 0);
        //For current snapshot methods
        _AssistantStream_currentEvent.set(this, void 0);
        _AssistantStream_currentRunSnapshot.set(this, void 0);
        _AssistantStream_currentRunStepSnapshot.set(this, void 0);
    }
    [(_AssistantStream_events = new WeakMap(), _AssistantStream_runStepSnapshots = new WeakMap(), _AssistantStream_messageSnapshots = new WeakMap(), _AssistantStream_messageSnapshot = new WeakMap(), _AssistantStream_finalRun = new WeakMap(), _AssistantStream_currentContentIndex = new WeakMap(), _AssistantStream_currentContent = new WeakMap(), _AssistantStream_currentToolCallIndex = new WeakMap(), _AssistantStream_currentToolCall = new WeakMap(), _AssistantStream_currentEvent = new WeakMap(), _AssistantStream_currentRunSnapshot = new WeakMap(), _AssistantStream_currentRunStepSnapshot = new WeakMap(), _AssistantStream_instances = new WeakSet(), Symbol.asyncIterator)]() {
        const pushQueue = [];
        const readQueue = [];
        let done = false;
        //Catch all for passing along all events
        this.on('event', (event)=>{
            const eventCopy = structuredClone(event);
            const reader = readQueue.shift();
            if (reader) {
                reader.resolve(eventCopy);
            } else {
                pushQueue.push(eventCopy);
            }
        });
        this.on('end', ()=>{
            done = true;
            for (const reader of readQueue){
                reader.resolve(undefined);
            }
            readQueue.length = 0;
        });
        this.on('abort', (err)=>{
            done = true;
            for (const reader of readQueue){
                reader.reject(err);
            }
            readQueue.length = 0;
        });
        this.on('error', (err)=>{
            done = true;
            for (const reader of readQueue){
                reader.reject(err);
            }
            readQueue.length = 0;
        });
        return {
            next: async ()=>{
                if (!pushQueue.length) {
                    if (done) {
                        return {
                            value: undefined,
                            done: true
                        };
                    }
                    return new Promise((resolve, reject)=>readQueue.push({
                            resolve,
                            reject
                        })).then((chunk)=>chunk ? {
                            value: chunk,
                            done: false
                        } : {
                            value: undefined,
                            done: true
                        });
                }
                const chunk = pushQueue.shift();
                return {
                    value: chunk,
                    done: false
                };
            },
            return: async ()=>{
                this.abort();
                return {
                    value: undefined,
                    done: true
                };
            }
        };
    }
    static fromReadableStream(stream) {
        const runner = new _a();
        runner._run(()=>runner._fromReadableStream(stream));
        return runner;
    }
    async _fromReadableStream(readableStream, options) {
        this._listenForAbort(options?.signal);
        this._connected();
        const stream = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$streaming$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Stream"].fromReadableStream(readableStream, this.controller);
        for await (const event of stream){
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
        }
        if (stream.controller.signal?.aborted) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIUserAbortError"]();
        }
        return this._addRun((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
    }
    toReadableStream() {
        const stream = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$streaming$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Stream"](this[Symbol.asyncIterator].bind(this), this.controller);
        return stream.toReadableStream();
    }
    static createToolAssistantStream(runId, runs, params, options) {
        const runner = new _a();
        runner._run(()=>runner._runToolAssistantStream(runId, runs, params, {
                ...options,
                headers: {
                    ...options?.headers,
                    'X-Stainless-Helper-Method': 'stream'
                }
            }));
        return runner;
    }
    async _createToolAssistantStream(run, runId, params, options) {
        this._listenForAbort(options?.signal);
        const body = {
            ...params,
            stream: true
        };
        const stream = await run.submitToolOutputs(runId, body, {
            ...options,
            signal: this.controller.signal
        });
        this._connected();
        for await (const event of stream){
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
        }
        if (stream.controller.signal?.aborted) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIUserAbortError"]();
        }
        return this._addRun((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
    }
    static createThreadAssistantStream(params, thread, options) {
        const runner = new _a();
        runner._run(()=>runner._threadAssistantStream(params, thread, {
                ...options,
                headers: {
                    ...options?.headers,
                    'X-Stainless-Helper-Method': 'stream'
                }
            }));
        return runner;
    }
    static createAssistantStream(threadId, runs, params, options) {
        const runner = new _a();
        runner._run(()=>runner._runAssistantStream(threadId, runs, params, {
                ...options,
                headers: {
                    ...options?.headers,
                    'X-Stainless-Helper-Method': 'stream'
                }
            }));
        return runner;
    }
    currentEvent() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_currentEvent, "f");
    }
    currentRun() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_currentRunSnapshot, "f");
    }
    currentMessageSnapshot() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_messageSnapshot, "f");
    }
    currentRunStepSnapshot() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_currentRunStepSnapshot, "f");
    }
    async finalRunSteps() {
        await this.done();
        return Object.values((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_runStepSnapshots, "f"));
    }
    async finalMessages() {
        await this.done();
        return Object.values((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_messageSnapshots, "f"));
    }
    async finalRun() {
        await this.done();
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_finalRun, "f")) throw Error('Final run was not received.');
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_finalRun, "f");
    }
    async _createThreadAssistantStream(thread, params, options) {
        this._listenForAbort(options?.signal);
        const body = {
            ...params,
            stream: true
        };
        const stream = await thread.createAndRun(body, {
            ...options,
            signal: this.controller.signal
        });
        this._connected();
        for await (const event of stream){
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
        }
        if (stream.controller.signal?.aborted) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIUserAbortError"]();
        }
        return this._addRun((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
    }
    async _createAssistantStream(run, threadId, params, options) {
        this._listenForAbort(options?.signal);
        const body = {
            ...params,
            stream: true
        };
        const stream = await run.create(threadId, body, {
            ...options,
            signal: this.controller.signal
        });
        this._connected();
        for await (const event of stream){
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_instances, "m", _AssistantStream_addEvent).call(this, event);
        }
        if (stream.controller.signal?.aborted) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIUserAbortError"]();
        }
        return this._addRun((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_instances, "m", _AssistantStream_endRequest).call(this));
    }
    static accumulateDelta(acc, delta) {
        for (const [key, deltaValue] of Object.entries(delta)){
            if (!acc.hasOwnProperty(key)) {
                acc[key] = deltaValue;
                continue;
            }
            let accValue = acc[key];
            if (accValue === null || accValue === undefined) {
                acc[key] = deltaValue;
                continue;
            }
            // We don't accumulate these special properties
            if (key === 'index' || key === 'type') {
                acc[key] = deltaValue;
                continue;
            }
            // Type-specific accumulation logic
            if (typeof accValue === 'string' && typeof deltaValue === 'string') {
                accValue += deltaValue;
            } else if (typeof accValue === 'number' && typeof deltaValue === 'number') {
                accValue += deltaValue;
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObj"])(accValue) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObj"])(deltaValue)) {
                accValue = this.accumulateDelta(accValue, deltaValue);
            } else if (Array.isArray(accValue) && Array.isArray(deltaValue)) {
                if (accValue.every((x)=>typeof x === 'string' || typeof x === 'number')) {
                    accValue.push(...deltaValue); // Use spread syntax for efficient addition
                    continue;
                }
                for (const deltaEntry of deltaValue){
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObj"])(deltaEntry)) {
                        throw new Error(`Expected array delta entry to be an object but got: ${deltaEntry}`);
                    }
                    const index = deltaEntry['index'];
                    if (index == null) {
                        console.error(deltaEntry);
                        throw new Error('Expected array delta entry to have an `index` property');
                    }
                    if (typeof index !== 'number') {
                        throw new Error(`Expected array delta entry \`index\` property to be a number but got ${index}`);
                    }
                    const accEntry = accValue[index];
                    if (accEntry == null) {
                        accValue[index] = deltaEntry;
                    } else {
                        accValue[index] = this.accumulateDelta(accEntry, deltaEntry);
                    }
                }
                continue;
            } else {
                throw Error(`Unhandled record type: ${key}, deltaValue: ${deltaValue}, accValue: ${accValue}`);
            }
            acc[key] = accValue;
        }
        return acc;
    }
    _addRun(run) {
        return run;
    }
    async _threadAssistantStream(params, thread, options) {
        return await this._createThreadAssistantStream(thread, params, options);
    }
    async _runAssistantStream(threadId, runs, params, options) {
        return await this._createAssistantStream(runs, threadId, params, options);
    }
    async _runToolAssistantStream(runId, runs, params, options) {
        return await this._createToolAssistantStream(runs, runId, params, options);
    }
}
_a = AssistantStream, _AssistantStream_addEvent = function _AssistantStream_addEvent(event) {
    if (this.ended) return;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _AssistantStream_currentEvent, event, "f");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_instances, "m", _AssistantStream_handleEvent).call(this, event);
    switch(event.event){
        case 'thread.created':
            break;
        case 'thread.run.created':
        case 'thread.run.queued':
        case 'thread.run.in_progress':
        case 'thread.run.requires_action':
        case 'thread.run.completed':
        case 'thread.run.incomplete':
        case 'thread.run.failed':
        case 'thread.run.cancelling':
        case 'thread.run.cancelled':
        case 'thread.run.expired':
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_instances, "m", _AssistantStream_handleRun).call(this, event);
            break;
        case 'thread.run.step.created':
        case 'thread.run.step.in_progress':
        case 'thread.run.step.delta':
        case 'thread.run.step.completed':
        case 'thread.run.step.failed':
        case 'thread.run.step.cancelled':
        case 'thread.run.step.expired':
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_instances, "m", _AssistantStream_handleRunStep).call(this, event);
            break;
        case 'thread.message.created':
        case 'thread.message.in_progress':
        case 'thread.message.delta':
        case 'thread.message.completed':
        case 'thread.message.incomplete':
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_instances, "m", _AssistantStream_handleMessage).call(this, event);
            break;
        case 'error':
            //This is included for completeness, but errors are processed in the SSE event processing so this should not occur
            throw new Error('Encountered an error event in event processing - errors should be processed earlier');
        default:
            assertNever(event);
    }
}, _AssistantStream_endRequest = function _AssistantStream_endRequest() {
    if (this.ended) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`stream has ended, this shouldn't happen`);
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_finalRun, "f")) throw Error('Final run has not been received');
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_finalRun, "f");
}, _AssistantStream_handleMessage = function _AssistantStream_handleMessage(event) {
    const [accumulatedMessage, newContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_instances, "m", _AssistantStream_accumulateMessage).call(this, event, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_messageSnapshot, "f"));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _AssistantStream_messageSnapshot, accumulatedMessage, "f");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_messageSnapshots, "f")[accumulatedMessage.id] = accumulatedMessage;
    for (const content of newContent){
        const snapshotContent = accumulatedMessage.content[content.index];
        if (snapshotContent?.type == 'text') {
            this._emit('textCreated', snapshotContent.text);
        }
    }
    switch(event.event){
        case 'thread.message.created':
            this._emit('messageCreated', event.data);
            break;
        case 'thread.message.in_progress':
            break;
        case 'thread.message.delta':
            this._emit('messageDelta', event.data.delta, accumulatedMessage);
            if (event.data.delta.content) {
                for (const content of event.data.delta.content){
                    //If it is text delta, emit a text delta event
                    if (content.type == 'text' && content.text) {
                        let textDelta = content.text;
                        let snapshot = accumulatedMessage.content[content.index];
                        if (snapshot && snapshot.type == 'text') {
                            this._emit('textDelta', textDelta, snapshot.text);
                        } else {
                            throw Error('The snapshot associated with this text delta is not text or missing');
                        }
                    }
                    if (content.index != (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_currentContentIndex, "f")) {
                        //See if we have in progress content
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_currentContent, "f")) {
                            switch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_currentContent, "f").type){
                                case 'text':
                                    this._emit('textDone', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_currentContent, "f").text, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_messageSnapshot, "f"));
                                    break;
                                case 'image_file':
                                    this._emit('imageFileDone', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_currentContent, "f").image_file, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_messageSnapshot, "f"));
                                    break;
                            }
                        }
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _AssistantStream_currentContentIndex, content.index, "f");
                    }
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _AssistantStream_currentContent, accumulatedMessage.content[content.index], "f");
                }
            }
            break;
        case 'thread.message.completed':
        case 'thread.message.incomplete':
            //We emit the latest content we were working on on completion (including incomplete)
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_currentContentIndex, "f") !== undefined) {
                const currentContent = event.data.content[(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_currentContentIndex, "f")];
                if (currentContent) {
                    switch(currentContent.type){
                        case 'image_file':
                            this._emit('imageFileDone', currentContent.image_file, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_messageSnapshot, "f"));
                            break;
                        case 'text':
                            this._emit('textDone', currentContent.text, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_messageSnapshot, "f"));
                            break;
                    }
                }
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_messageSnapshot, "f")) {
                this._emit('messageDone', event.data);
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _AssistantStream_messageSnapshot, undefined, "f");
    }
}, _AssistantStream_handleRunStep = function _AssistantStream_handleRunStep(event) {
    const accumulatedRunStep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_instances, "m", _AssistantStream_accumulateRunStep).call(this, event);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _AssistantStream_currentRunStepSnapshot, accumulatedRunStep, "f");
    switch(event.event){
        case 'thread.run.step.created':
            this._emit('runStepCreated', event.data);
            break;
        case 'thread.run.step.delta':
            const delta = event.data.delta;
            if (delta.step_details && delta.step_details.type == 'tool_calls' && delta.step_details.tool_calls && accumulatedRunStep.step_details.type == 'tool_calls') {
                for (const toolCall of delta.step_details.tool_calls){
                    if (toolCall.index == (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_currentToolCallIndex, "f")) {
                        this._emit('toolCallDelta', toolCall, accumulatedRunStep.step_details.tool_calls[toolCall.index]);
                    } else {
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_currentToolCall, "f")) {
                            this._emit('toolCallDone', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_currentToolCall, "f"));
                        }
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _AssistantStream_currentToolCallIndex, toolCall.index, "f");
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _AssistantStream_currentToolCall, accumulatedRunStep.step_details.tool_calls[toolCall.index], "f");
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_currentToolCall, "f")) this._emit('toolCallCreated', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_currentToolCall, "f"));
                    }
                }
            }
            this._emit('runStepDelta', event.data.delta, accumulatedRunStep);
            break;
        case 'thread.run.step.completed':
        case 'thread.run.step.failed':
        case 'thread.run.step.cancelled':
        case 'thread.run.step.expired':
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _AssistantStream_currentRunStepSnapshot, undefined, "f");
            const details = event.data.step_details;
            if (details.type == 'tool_calls') {
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_currentToolCall, "f")) {
                    this._emit('toolCallDone', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_currentToolCall, "f"));
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _AssistantStream_currentToolCall, undefined, "f");
                }
            }
            this._emit('runStepDone', event.data, accumulatedRunStep);
            break;
        case 'thread.run.step.in_progress':
            break;
    }
}, _AssistantStream_handleEvent = function _AssistantStream_handleEvent(event) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_events, "f").push(event);
    this._emit('event', event);
}, _AssistantStream_accumulateRunStep = function _AssistantStream_accumulateRunStep(event) {
    switch(event.event){
        case 'thread.run.step.created':
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_runStepSnapshots, "f")[event.data.id] = event.data;
            return event.data;
        case 'thread.run.step.delta':
            let snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_runStepSnapshots, "f")[event.data.id];
            if (!snapshot) {
                throw Error('Received a RunStepDelta before creation of a snapshot');
            }
            let data = event.data;
            if (data.delta) {
                const accumulated = _a.accumulateDelta(snapshot, data.delta);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_runStepSnapshots, "f")[event.data.id] = accumulated;
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_runStepSnapshots, "f")[event.data.id];
        case 'thread.run.step.completed':
        case 'thread.run.step.failed':
        case 'thread.run.step.cancelled':
        case 'thread.run.step.expired':
        case 'thread.run.step.in_progress':
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_runStepSnapshots, "f")[event.data.id] = event.data;
            break;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_runStepSnapshots, "f")[event.data.id]) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_runStepSnapshots, "f")[event.data.id];
    throw new Error('No snapshot available');
}, _AssistantStream_accumulateMessage = function _AssistantStream_accumulateMessage(event, snapshot) {
    let newContent = [];
    switch(event.event){
        case 'thread.message.created':
            //On creation the snapshot is just the initial message
            return [
                event.data,
                newContent
            ];
        case 'thread.message.delta':
            if (!snapshot) {
                throw Error('Received a delta with no existing snapshot (there should be one from message creation)');
            }
            let data = event.data;
            //If this delta does not have content, nothing to process
            if (data.delta.content) {
                for (const contentElement of data.delta.content){
                    if (contentElement.index in snapshot.content) {
                        let currentContent = snapshot.content[contentElement.index];
                        snapshot.content[contentElement.index] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_instances, "m", _AssistantStream_accumulateContent).call(this, contentElement, currentContent);
                    } else {
                        snapshot.content[contentElement.index] = contentElement;
                        // This is a new element
                        newContent.push(contentElement);
                    }
                }
            }
            return [
                snapshot,
                newContent
            ];
        case 'thread.message.in_progress':
        case 'thread.message.completed':
        case 'thread.message.incomplete':
            //No changes on other thread events
            if (snapshot) {
                return [
                    snapshot,
                    newContent
                ];
            } else {
                throw Error('Received thread message event with no existing snapshot');
            }
    }
    throw Error('Tried to accumulate a non-message event');
}, _AssistantStream_accumulateContent = function _AssistantStream_accumulateContent(contentElement, currentContent) {
    return _a.accumulateDelta(currentContent, contentElement);
}, _AssistantStream_handleRun = function _AssistantStream_handleRun(event) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _AssistantStream_currentRunSnapshot, event.data, "f");
    switch(event.event){
        case 'thread.run.created':
            break;
        case 'thread.run.queued':
            break;
        case 'thread.run.in_progress':
            break;
        case 'thread.run.requires_action':
        case 'thread.run.cancelled':
        case 'thread.run.failed':
        case 'thread.run.completed':
        case 'thread.run.expired':
        case 'thread.run.incomplete':
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _AssistantStream_finalRun, event.data, "f");
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_currentToolCall, "f")) {
                this._emit('toolCallDone', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AssistantStream_currentToolCall, "f"));
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _AssistantStream_currentToolCall, undefined, "f");
            }
            break;
        case 'thread.run.cancelling':
            break;
    }
};
function assertNever(_x) {} //# sourceMappingURL=AssistantStream.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/ResponsesParser.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addOutputText",
    ()=>addOutputText,
    "hasAutoParseableInput",
    ()=>hasAutoParseableInput,
    "isAutoParsableTool",
    ()=>isAutoParsableTool,
    "makeParseableResponseTool",
    ()=>makeParseableResponseTool,
    "maybeParseResponse",
    ()=>maybeParseResponse,
    "parseResponse",
    ()=>parseResponse,
    "shouldParseToolCall",
    ()=>shouldParseToolCall,
    "validateInputTools",
    ()=>validateInputTools
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/error.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/error.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/parser.mjs [app-route] (ecmascript)");
;
;
function maybeParseResponse(response, params) {
    if (!params || !hasAutoParseableInput(params)) {
        const parsed = {
            ...response,
            output_parsed: null,
            output: response.output.map((item)=>{
                if (item.type === 'function_call') {
                    return {
                        ...item,
                        parsed_arguments: null
                    };
                }
                if (item.type === 'message') {
                    return {
                        ...item,
                        content: item.content.map((content)=>({
                                ...content,
                                parsed: null
                            }))
                    };
                } else {
                    return item;
                }
            })
        };
        if (needsOutputText(response, parsed)) {
            addOutputText(parsed);
        }
        return parsed;
    }
    return parseResponse(response, params);
}
function parseResponse(response, params) {
    const shouldParse = !response.status || response.status === 'completed';
    const output = response.output.map((item)=>{
        if (item.type === 'function_call') {
            return shouldParse ? parseToolCall(params, item) : {
                ...item,
                parsed_arguments: null
            };
        }
        if (item.type === 'message') {
            const content = item.content.map((content)=>{
                if (content.type === 'output_text') {
                    return {
                        ...content,
                        parsed: shouldParse ? parseTextFormat(params, content.text) : null
                    };
                }
                return content;
            });
            return {
                ...item,
                content
            };
        }
        return item;
    });
    const parsed = Object.assign({}, response, {
        output
    });
    if (needsOutputText(response, parsed)) {
        addOutputText(parsed);
    }
    Object.defineProperty(parsed, 'output_parsed', {
        enumerable: true,
        get () {
            for (const output of parsed.output){
                if (output.type !== 'message') {
                    continue;
                }
                for (const content of output.content){
                    if (content.type === 'output_text' && content.parsed !== null) {
                        return content.parsed;
                    }
                }
            }
            return null;
        }
    });
    return parsed;
}
function parseTextFormat(params, content) {
    if (params.text?.format?.type !== 'json_schema') {
        return null;
    }
    if ('$parseRaw' in params.text?.format) {
        const text_format = params.text?.format;
        return text_format.$parseRaw(content);
    }
    return JSON.parse(content);
}
function hasAutoParseableInput(params) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAutoParsableResponseFormat"])(params.text?.format)) {
        return true;
    }
    return Array.isArray(params.tools) && params.tools.some((tool)=>isAutoParsableTool(tool) || tool.type === 'function' && tool.strict === true);
}
function makeParseableResponseTool(tool, { parser, callback }) {
    const obj = {
        ...tool
    };
    Object.defineProperties(obj, {
        $brand: {
            value: 'auto-parseable-tool',
            enumerable: false
        },
        $parseRaw: {
            value: parser,
            enumerable: false
        },
        $callback: {
            value: callback,
            enumerable: false
        }
    });
    return obj;
}
function isAutoParsableTool(tool) {
    return tool?.['$brand'] === 'auto-parseable-tool';
}
function getInputToolByName(input_tools, name) {
    return input_tools.find((tool)=>tool.type === 'function' && tool.name === name);
}
function parseToolCall(params, toolCall) {
    const inputTool = getInputToolByName(params.tools ?? [], toolCall.name);
    return {
        ...toolCall,
        ...toolCall,
        parsed_arguments: isAutoParsableTool(inputTool) ? inputTool.$parseRaw(toolCall.arguments) : inputTool?.strict ? JSON.parse(toolCall.arguments) : null
    };
}
function shouldParseToolCall(params, toolCall) {
    if (!params) {
        return false;
    }
    const inputTool = getInputToolByName(params.tools ?? [], toolCall.name);
    return isAutoParsableTool(inputTool) || inputTool?.strict || false;
}
function validateInputTools(tools) {
    for (const tool of tools ?? []){
        if (tool.type !== 'function') {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`Currently only \`function\` tool types support auto-parsing; Received \`${tool.type}\``);
        }
        if (tool.function.strict !== true) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`The \`${tool.function.name}\` tool is not marked with \`strict: true\`. Only strict function tools can be auto-parsed`);
        }
    }
}
function needsOutputText(response, target) {
    return !Object.getOwnPropertyDescriptor(response, 'output_text') || target.output_text == null;
}
function addOutputText(rsp) {
    const texts = [];
    for (const output of rsp.output){
        if (output.type !== 'message') {
            continue;
        }
        for (const content of output.content){
            if (content.type === 'output_text') {
                texts.push(content.text);
            }
        }
    }
    rsp.output_text = texts.join('');
} //# sourceMappingURL=ResponsesParser.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/responses/ResponseAccumulator.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "accumulateResponse",
    ()=>accumulateResponse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/error.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/error.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$ResponsesParser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/ResponsesParser.mjs [app-route] (ecmascript)");
;
;
function accumulateResponse(event, snapshot) {
    if (!snapshot) {
        if (event.type !== 'response.created') {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`When snapshot hasn't been set yet, expected 'response.created' event, got ${event.type}`);
        }
        return cloneResponse(event.response);
    }
    switch(event.type){
        case 'response.output_item.added':
            {
                snapshot.output.push(structuredClone(event.item));
                if (event.item.type === 'message') {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$ResponsesParser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addOutputText"])(snapshot);
                }
                break;
            }
        case 'response.output_item.done':
            {
                getOutput(snapshot, event.output_index);
                snapshot.output[event.output_index] = structuredClone(event.item);
                if (event.item.type === 'message') {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$ResponsesParser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addOutputText"])(snapshot);
                }
                break;
            }
        case 'response.content_part.added':
            {
                const output = getOutput(snapshot, event.output_index);
                const type = output.type;
                const part = event.part;
                if (type === 'message' && part.type !== 'reasoning_text') {
                    output.content.push(structuredClone(part));
                    if (part.type === 'output_text') {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$ResponsesParser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addOutputText"])(snapshot);
                    }
                } else if (type === 'reasoning' && part.type === 'reasoning_text') {
                    if (!output.content) {
                        output.content = [];
                    }
                    output.content.push(structuredClone(part));
                }
                break;
            }
        case 'response.content_part.done':
            {
                const output = getOutput(snapshot, event.output_index);
                const part = event.part;
                if (output.type === 'message' && part.type !== 'reasoning_text') {
                    getContent(output.content, event.content_index);
                    output.content[event.content_index] = structuredClone(part);
                    if (part.type === 'output_text') {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$ResponsesParser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addOutputText"])(snapshot);
                    }
                } else if (output.type === 'reasoning' && part.type === 'reasoning_text') {
                    const content = output.content;
                    if (!content) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`missing content at index ${event.content_index}`);
                    }
                    getContent(content, event.content_index);
                    content[event.content_index] = structuredClone(part);
                }
                break;
            }
        case 'response.output_text.delta':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'message') {
                    const content = getContent(output.content, event.content_index);
                    if (content.type !== 'output_text') {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`expected content to be 'output_text', got ${content.type}`);
                    }
                    content.text += event.delta;
                    snapshot.output_text += event.delta;
                }
                break;
            }
        case 'response.output_text.done':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'message') {
                    const content = getContent(output.content, event.content_index);
                    if (content.type !== 'output_text') {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`expected content to be 'output_text', got ${content.type}`);
                    }
                    content.text = event.text;
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$ResponsesParser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addOutputText"])(snapshot);
                }
                break;
            }
        case 'response.output_text.annotation.added':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'message') {
                    const content = getContent(output.content, event.content_index);
                    if (content.type !== 'output_text') {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`expected content to be 'output_text', got ${content.type}`);
                    }
                    content.annotations[event.annotation_index] = structuredClone(event.annotation);
                }
                break;
            }
        case 'response.refusal.delta':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'message') {
                    const content = getContent(output.content, event.content_index);
                    if (content.type !== 'refusal') {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`expected content to be 'refusal', got ${content.type}`);
                    }
                    content.refusal += event.delta;
                }
                break;
            }
        case 'response.refusal.done':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'message') {
                    const content = getContent(output.content, event.content_index);
                    if (content.type !== 'refusal') {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`expected content to be 'refusal', got ${content.type}`);
                    }
                    content.refusal = event.refusal;
                }
                break;
            }
        case 'response.function_call_arguments.delta':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'function_call') {
                    output.arguments += event.delta;
                }
                break;
            }
        case 'response.function_call_arguments.done':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'function_call') {
                    output.arguments = event.arguments;
                }
                break;
            }
        case 'response.reasoning_text.delta':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'reasoning') {
                    if (!output.content) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`missing content at index ${event.content_index}`);
                    }
                    const content = getContent(output.content, event.content_index);
                    if (content.type !== 'reasoning_text') {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`expected content to be 'reasoning_text', got ${content.type}`);
                    }
                    content.text += event.delta;
                }
                break;
            }
        case 'response.reasoning_text.done':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'reasoning') {
                    if (!output.content) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`missing content at index ${event.content_index}`);
                    }
                    const content = getContent(output.content, event.content_index);
                    if (content.type !== 'reasoning_text') {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`expected content to be 'reasoning_text', got ${content.type}`);
                    }
                    content.text = event.text;
                }
                break;
            }
        case 'response.reasoning_summary_part.added':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'reasoning') {
                    output.summary.push(structuredClone(event.part));
                }
                break;
            }
        case 'response.reasoning_summary_part.done':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'reasoning') {
                    getContent(output.summary, event.summary_index);
                    output.summary[event.summary_index] = structuredClone(event.part);
                }
                break;
            }
        case 'response.reasoning_summary_text.delta':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'reasoning') {
                    const part = getContent(output.summary, event.summary_index);
                    part.text += event.delta;
                }
                break;
            }
        case 'response.reasoning_summary_text.done':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'reasoning') {
                    const part = getContent(output.summary, event.summary_index);
                    part.text = event.text;
                }
                break;
            }
        case 'response.custom_tool_call_input.delta':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'custom_tool_call') {
                    output.input += event.delta;
                }
                break;
            }
        case 'response.custom_tool_call_input.done':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'custom_tool_call') {
                    output.input = event.input;
                }
                break;
            }
        case 'response.mcp_call_arguments.delta':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'mcp_call') {
                    output.arguments += event.delta;
                }
                break;
            }
        case 'response.mcp_call_arguments.done':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'mcp_call') {
                    output.arguments = event.arguments;
                }
                break;
            }
        case 'response.code_interpreter_call_code.delta':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'code_interpreter_call') {
                    output.code = (output.code ?? '') + event.delta;
                }
                break;
            }
        case 'response.code_interpreter_call_code.done':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'code_interpreter_call') {
                    output.code = event.code;
                }
                break;
            }
        case 'response.code_interpreter_call.in_progress':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'code_interpreter_call') {
                    output.status = 'in_progress';
                }
                break;
            }
        case 'response.code_interpreter_call.interpreting':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'code_interpreter_call') {
                    output.status = 'interpreting';
                }
                break;
            }
        case 'response.code_interpreter_call.completed':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'code_interpreter_call') {
                    output.status = 'completed';
                }
                break;
            }
        case 'response.file_search_call.in_progress':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'file_search_call') {
                    output.status = 'in_progress';
                }
                break;
            }
        case 'response.file_search_call.searching':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'file_search_call') {
                    output.status = 'searching';
                }
                break;
            }
        case 'response.file_search_call.completed':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'file_search_call') {
                    output.status = 'completed';
                }
                break;
            }
        case 'response.web_search_call.in_progress':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'web_search_call') {
                    output.status = 'in_progress';
                }
                break;
            }
        case 'response.web_search_call.searching':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'web_search_call') {
                    output.status = 'searching';
                }
                break;
            }
        case 'response.web_search_call.completed':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'web_search_call') {
                    output.status = 'completed';
                }
                break;
            }
        case 'response.image_generation_call.in_progress':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'image_generation_call') {
                    output.status = 'in_progress';
                }
                break;
            }
        case 'response.image_generation_call.generating':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'image_generation_call') {
                    output.status = 'generating';
                }
                break;
            }
        case 'response.image_generation_call.completed':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'image_generation_call') {
                    output.status = 'completed';
                }
                break;
            }
        case 'response.mcp_call.in_progress':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'mcp_call') {
                    output.status = 'in_progress';
                }
                break;
            }
        case 'response.mcp_call.completed':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'mcp_call') {
                    output.status = 'completed';
                }
                break;
            }
        case 'response.mcp_call.failed':
            {
                const output = getOutput(snapshot, event.output_index);
                if (output.type === 'mcp_call') {
                    output.status = 'failed';
                }
                break;
            }
        case 'response.created':
        case 'response.queued':
        case 'response.in_progress':
        case 'response.completed':
        case 'response.failed':
        case 'response.incomplete':
            {
                snapshot = cloneResponse(event.response);
                break;
            }
        case 'response.audio.delta':
        case 'response.audio.done':
        case 'response.audio.transcript.delta':
        case 'response.audio.transcript.done':
        case 'response.image_generation_call.partial_image':
        case 'response.mcp_list_tools.in_progress':
        case 'response.mcp_list_tools.completed':
        case 'response.mcp_list_tools.failed':
        case 'keepalive':
        case 'error':
            {
                break;
            }
        default:
            {
                assertNever(event);
            }
    }
    return snapshot;
}
function cloneResponse(response) {
    const snapshot = structuredClone(response);
    if (!Object.getOwnPropertyDescriptor(snapshot, 'output_text') || snapshot.output_text == null) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$ResponsesParser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addOutputText"])(snapshot);
    }
    return snapshot;
}
function getOutput(snapshot, outputIndex) {
    const output = snapshot.output[outputIndex];
    if (!output) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`missing output at index ${outputIndex}`);
    }
    return output;
}
function getContent(content, contentIndex) {
    const part = content[contentIndex];
    if (!part) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`missing content at index ${contentIndex}`);
    }
    return part;
}
function assertNever(value) {
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`Unhandled response stream event: ${JSON.stringify(value)}`);
} //# sourceMappingURL=ResponseAccumulator.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/responses/ResponseStream.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ResponseStream",
    ()=>ResponseStream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/tslib.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/error.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/error.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$EventStream$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/EventStream.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$responses$2f$ResponseAccumulator$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/responses/ResponseAccumulator.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$ResponsesParser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/ResponsesParser.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$streaming$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/streaming.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$streaming$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/streaming.mjs [app-route] (ecmascript)");
var _ResponseStream_instances, _ResponseStream_params, _ResponseStream_currentResponseSnapshot, _ResponseStream_finalResponse, _ResponseStream_beginRequest, _ResponseStream_addEvent, _ResponseStream_endRequest;
;
;
;
;
;
;
class ResponseStream extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$EventStream$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventStream"] {
    constructor(params){
        super();
        _ResponseStream_instances.add(this);
        _ResponseStream_params.set(this, void 0);
        _ResponseStream_currentResponseSnapshot.set(this, void 0);
        _ResponseStream_finalResponse.set(this, void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _ResponseStream_params, params, "f");
    }
    static createResponse(client, params, options) {
        const runner = new ResponseStream(params);
        runner._run(()=>runner._createOrRetrieveResponse(client, params, {
                ...options,
                headers: {
                    ...options?.headers,
                    'X-Stainless-Helper-Method': 'stream'
                }
            }));
        return runner;
    }
    static fromReadableStream(stream) {
        const runner = new ResponseStream(null);
        runner._run(()=>runner._fromReadableStream(stream));
        return runner;
    }
    async _createOrRetrieveResponse(client, params, options) {
        this._listenForAbort(options?.signal);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ResponseStream_instances, "m", _ResponseStream_beginRequest).call(this);
        let stream;
        let starting_after = null;
        if ('response_id' in params) {
            // Keep the full replay so that `accumulateResponse()` sees `response.created` and can build
            // complete snapshots before locally filtering events at `starting_after`.
            stream = await client.responses.retrieve(params.response_id, {
                stream: true
            }, {
                ...options,
                signal: this.controller.signal,
                stream: true
            });
            starting_after = params.starting_after ?? null;
        } else {
            stream = await client.responses.create({
                ...params,
                stream: true
            }, {
                ...options,
                signal: this.controller.signal
            });
        }
        this._connected();
        for await (const event of stream){
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ResponseStream_instances, "m", _ResponseStream_addEvent).call(this, event, starting_after);
        }
        if (stream.controller.signal?.aborted) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIUserAbortError"]();
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ResponseStream_instances, "m", _ResponseStream_endRequest).call(this);
    }
    async _fromReadableStream(readableStream, options) {
        this._listenForAbort(options?.signal);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ResponseStream_instances, "m", _ResponseStream_beginRequest).call(this);
        this._connected();
        const stream = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$streaming$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Stream"].fromReadableStream(readableStream, this.controller);
        for await (const event of stream){
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ResponseStream_instances, "m", _ResponseStream_addEvent).call(this, event, null);
        }
        if (stream.controller.signal?.aborted) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIUserAbortError"]();
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ResponseStream_instances, "m", _ResponseStream_endRequest).call(this);
    }
    [(_ResponseStream_params = new WeakMap(), _ResponseStream_currentResponseSnapshot = new WeakMap(), _ResponseStream_finalResponse = new WeakMap(), _ResponseStream_instances = new WeakSet(), _ResponseStream_beginRequest = function _ResponseStream_beginRequest() {
        if (this.ended) return;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _ResponseStream_currentResponseSnapshot, undefined, "f");
    }, _ResponseStream_addEvent = function _ResponseStream_addEvent(event, starting_after) {
        if (this.ended) return;
        const maybeEmit = (name, event)=>{
            if (starting_after == null || event.sequence_number > starting_after) {
                this._emit(name, event);
            }
        };
        const response = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$responses$2f$ResponseAccumulator$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["accumulateResponse"])(event, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ResponseStream_currentResponseSnapshot, "f"));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _ResponseStream_currentResponseSnapshot, response, "f");
        maybeEmit('event', event);
        switch(event.type){
            case 'response.output_text.delta':
                {
                    const output = response.output[event.output_index];
                    if (!output) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`missing output at index ${event.output_index}`);
                    }
                    if (output.type === 'message') {
                        const content = output.content[event.content_index];
                        if (!content) {
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`missing content at index ${event.content_index}`);
                        }
                        if (content.type !== 'output_text') {
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`expected content to be 'output_text', got ${content.type}`);
                        }
                        maybeEmit('response.output_text.delta', {
                            ...event,
                            snapshot: content.text
                        });
                    }
                    break;
                }
            case 'response.function_call_arguments.delta':
                {
                    const output = response.output[event.output_index];
                    if (!output) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`missing output at index ${event.output_index}`);
                    }
                    if (output.type === 'function_call') {
                        maybeEmit('response.function_call_arguments.delta', {
                            ...event,
                            snapshot: output.arguments
                        });
                    }
                    break;
                }
            default:
                maybeEmit(event.type, event);
                break;
        }
    }, _ResponseStream_endRequest = function _ResponseStream_endRequest() {
        if (this.ended) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`stream has ended, this shouldn't happen`);
        }
        const snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ResponseStream_currentResponseSnapshot, "f");
        if (!snapshot) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`request ended without sending any events`);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _ResponseStream_currentResponseSnapshot, undefined, "f");
        const parsedResponse = finalizeResponse(snapshot, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ResponseStream_params, "f"));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _ResponseStream_finalResponse, parsedResponse, "f");
        return parsedResponse;
    }, Symbol.asyncIterator)]() {
        const pushQueue = [];
        const readQueue = [];
        let done = false;
        this.on('event', (event)=>{
            const reader = readQueue.shift();
            if (reader) {
                reader.resolve(event);
            } else {
                pushQueue.push(event);
            }
        });
        this.on('end', ()=>{
            done = true;
            for (const reader of readQueue){
                reader.resolve(undefined);
            }
            readQueue.length = 0;
        });
        this.on('abort', (err)=>{
            done = true;
            for (const reader of readQueue){
                reader.reject(err);
            }
            readQueue.length = 0;
        });
        this.on('error', (err)=>{
            done = true;
            for (const reader of readQueue){
                reader.reject(err);
            }
            readQueue.length = 0;
        });
        return {
            next: async ()=>{
                if (!pushQueue.length) {
                    if (done) {
                        return {
                            value: undefined,
                            done: true
                        };
                    }
                    return new Promise((resolve, reject)=>readQueue.push({
                            resolve,
                            reject
                        })).then((event)=>event ? {
                            value: event,
                            done: false
                        } : {
                            value: undefined,
                            done: true
                        });
                }
                const event = pushQueue.shift();
                return {
                    value: event,
                    done: false
                };
            },
            return: async ()=>{
                this.abort();
                return {
                    value: undefined,
                    done: true
                };
            }
        };
    }
    /**
     * @returns a promise that resolves with the final Response, or rejects
     * if an error occurred or the stream ended prematurely without producing a REsponse.
     */ async finalResponse() {
        await this.done();
        const response = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _ResponseStream_finalResponse, "f");
        if (!response) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]('stream ended without producing a ChatCompletion');
        return response;
    }
}
function finalizeResponse(snapshot, params) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$ResponsesParser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["maybeParseResponse"])(snapshot, params);
} //# sourceMappingURL=ResponseStream.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/Util.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Like `Promise.allSettled()` but throws an error if any promises are rejected.
 */ __turbopack_context__.s([
    "allSettledWithThrow",
    ()=>allSettledWithThrow
]);
const allSettledWithThrow = async (promises)=>{
    const results = await Promise.allSettled(promises);
    const rejected = results.filter((result)=>result.status === 'rejected');
    if (rejected.length) {
        for (const result of rejected){
            console.error(result.reason);
        }
        throw new Error(`${rejected.length} promise(s) failed - see the above errors`);
    }
    // Note: TS was complaining about using `.filter().map()` here for some reason
    const values = [];
    for (const result of results){
        if (result.status === 'fulfilled') {
            values.push(result.value);
        }
    }
    return values;
}; //# sourceMappingURL=Util.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/transform.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assertNoNestedSchemaIds",
    ()=>assertNoNestedSchemaIds,
    "forEachJSONSchemaChild",
    ()=>forEachJSONSchemaChild,
    "hasOnlyRefAndAnnotations",
    ()=>hasOnlyRefAndAnnotations,
    "normalizeObjectAllOfForExclusivity",
    ()=>normalizeObjectAllOfForExclusivity,
    "resolveLocalRef",
    ()=>resolveLocalRef,
    "rewriteLocalRefsIntoMovedOneOfBranches",
    ()=>rewriteLocalRefsIntoMovedOneOfBranches,
    "toStrictJsonSchema",
    ()=>toStrictJsonSchema
]);
const JSON_SCHEMA_ANNOTATION_KEYWORDS = new Set([
    '$comment',
    'default',
    'description',
    'examples',
    'readOnly',
    'title',
    'writeOnly'
]);
const JSON_SCHEMA_ROOT_METADATA_KEYWORDS = new Set([
    '$id',
    '$schema'
]);
const JSON_SCHEMA_OBJECT_KEYWORDS = new Set([
    'additionalProperties',
    'dependencies',
    'maxProperties',
    'minProperties',
    'patternProperties',
    'properties',
    'propertyNames',
    'required'
]);
const JSON_SCHEMA_SINGLE_SCHEMA_KEYWORDS = [
    'additionalItems',
    'additionalProperties',
    'contains',
    'contentSchema',
    'else',
    'if',
    'not',
    'propertyNames',
    'then',
    'unevaluatedItems',
    'unevaluatedProperties'
];
const JSON_SCHEMA_ARRAY_SCHEMA_KEYWORDS = [
    'allOf',
    'anyOf',
    'items',
    'oneOf',
    'prefixItems'
];
const JSON_SCHEMA_MAP_SCHEMA_KEYWORDS = [
    '$defs',
    'definitions',
    'dependentSchemas',
    'dependencies',
    'patternProperties',
    'properties'
];
const JSON_SCHEMA_UNSUPPORTED_SCHEMA_KEYWORDS = new Set([
    '$anchor',
    '$dynamicAnchor',
    '$dynamicRef',
    '$recursiveAnchor',
    '$recursiveRef',
    'allOf',
    'contains',
    'contentEncoding',
    'contentMediaType',
    'contentSchema',
    'dependentRequired',
    'dependentSchemas',
    'dependencies',
    'else',
    'if',
    'maxContains',
    'maxProperties',
    'minContains',
    'minProperties',
    'not',
    'patternProperties',
    'prefixItems',
    'propertyNames',
    'then',
    'unevaluatedItems',
    'unevaluatedProperties',
    'uniqueItems'
]);
const MERGEABLE_OBJECT_ALL_OF_KEYWORDS = new Set([
    ...JSON_SCHEMA_ANNOTATION_KEYWORDS,
    'additionalProperties',
    'properties',
    'required',
    'type'
]);
function forEachJSONSchemaChild(schema, path, visit) {
    const record = schema;
    for (const keyword of JSON_SCHEMA_SINGLE_SCHEMA_KEYWORDS){
        if (keyword in record) {
            visit(record[keyword], [
                ...path,
                keyword
            ], keyword);
        }
    }
    for (const keyword of JSON_SCHEMA_ARRAY_SCHEMA_KEYWORDS){
        const children = record[keyword];
        if (Array.isArray(children)) {
            for (const [index, child] of children.entries()){
                visit(child, [
                    ...path,
                    keyword,
                    String(index)
                ], keyword);
            }
        } else if (children !== undefined) {
            visit(children, [
                ...path,
                keyword
            ], keyword);
        }
    }
    for (const keyword of JSON_SCHEMA_MAP_SCHEMA_KEYWORDS){
        const children = record[keyword];
        if (!isObject(children)) continue;
        for (const [key, child] of Object.entries(children)){
            // Draft 7 dependencies also permits property dependency arrays. They
            // are not schemas and must not be traversed as literal JSON payloads.
            if (keyword === 'dependencies' && !isSchemaDefinition(child)) continue;
            visit(child, [
                ...path,
                keyword,
                key
            ], keyword);
        }
    }
}
function toStrictJsonSchema(schema) {
    const schemaCopy = structuredClone(schema);
    // JSON serialization omits undefined object properties. Drop optional
    // placeholders before any structural checks so they cannot accidentally
    // look like validation-bearing schema keywords.
    stripUndefinedSchemaKeywords(schemaCopy);
    normalizeSingletonTypeArrays(schemaCopy);
    // Root ref/allOf normalization can promote a nested branch into the root.
    // Reject separate resource scopes while their original nesting is still
    // visible so branch-local definitions cannot be rebound at the root.
    assertNoNestedSchemaIds(schemaCopy);
    normalizeRootRefAndAllOf(schemaCopy);
    if (schemaCopy.type !== 'object') {
        throw new Error(`Root schema must have type: 'object' but got type: ${schemaCopy.type ? `'${schemaCopy.type}'` : 'undefined'}`);
    }
    if (schemaCopy.anyOf !== undefined) {
        throw new Error('Root schema must not use `anyOf` because strict Structured Outputs requires a root object without a union.');
    }
    validateRefSchemas(schemaCopy, [], schemaCopy);
    preserveAllOfRefTargets(schemaCopy);
    validateRefSchemas(schemaCopy, [], schemaCopy);
    rewriteLocalRefsIntoFilteredAnyOfBranches(schemaCopy);
    // Resolve representable object intersections before recursive
    // strictification closes referenced definitions. Otherwise a definition
    // reached through an allOf ref would be closed in isolation before its
    // sibling object properties can be merged.
    normalizeObjectAllOfBranches(schemaCopy, [], schemaCopy);
    const strictSchema = ensureStrictJsonSchema(schemaCopy, [], schemaCopy);
    validateRefSchemas(strictSchema, [], strictSchema);
    return strictSchema;
}
function stripUndefinedSchemaKeywords(schema, visited = new Set()) {
    if (typeof schema === 'boolean' || !isObject(schema) || visited.has(schema)) {
        return;
    }
    visited.add(schema);
    const schemaRecord = schema;
    for (const keyword of Object.keys(schemaRecord)){
        if (schemaRecord[keyword] === undefined) {
            delete schemaRecord[keyword];
        }
    }
    forEachJSONSchemaChild(schema, [], (child)=>{
        stripUndefinedSchemaKeywords(child, visited);
    });
}
/**
 * Root ref inlining and singleton allOf flattening can expose each other.
 * Iterate until flattening no longer produces another root ref so every
 * exactly representable chain reaches its final object form before the root
 * type check runs.
 */ function normalizeRootRefAndAllOf(schema) {
    const seenRefs = new Set();
    while(true){
        if (typeof schema.$ref === 'string') {
            if (seenRefs.has(schema.$ref)) {
                throw new Error('Cyclic local $ref at `<root>` is not supported: ' + JSON.stringify(schema.$ref));
            }
            seenRefs.add(schema.$ref);
        }
        inlineRootRefObject(schema);
        preserveAllOfRefTargets(schema, true);
        normalizeRootAllOf(schema);
        const normalizedAnyOf = normalizeRootAnyOf(schema);
        if (schema.$ref === undefined && !normalizedAnyOf) {
            return;
        }
    }
}
/**
 * Some Standard Schema converters emit the root object through a local ref,
 * with the referenced schema stored in a root definition map. Structured
 * Outputs requires the root itself to be an object, so inline that safe,
 * definition-only form while keeping the root maps available for every local
 * pointer in the schema.
 */ function inlineRootRefObject(schema) {
    let ref = schema.$ref;
    if (ref === undefined) {
        return;
    }
    assertLocalRootRef(ref);
    if (!hasOnlyRootRefAndDefinitions(schema)) {
        throw new Error('Schema $ref at `<root>` has non-metadata siblings that Draft 7 ignores and cannot be represented in strict Structured Outputs.');
    }
    const seenRefs = new Set();
    // Ref siblings are annotations in Draft 7, so keep them while following
    // aliases. Add outer annotations first so they win over inner aliases and
    // the final target when the effective root is assembled.
    const inheritedAnnotations = Object.fromEntries(Object.entries(schema).filter(([keyword])=>JSON_SCHEMA_ANNOTATION_KEYWORDS.has(keyword)));
    let resolved;
    while(true){
        if (seenRefs.has(ref)) {
            throw new Error('Cyclic local $ref at `<root>` is not supported: ' + JSON.stringify(ref));
        }
        seenRefs.add(ref);
        const target = resolveLocalRef(schema, ref);
        if (target === undefined) {
            throw new Error('Local $ref at `<root>` does not resolve to an object or boolean schema: ' + JSON.stringify(ref));
        }
        if (typeof target === 'boolean') {
            throw new TypeError('Expected object schema but got boolean; path=<root>');
        }
        const nextRef = target.$ref;
        if (nextRef === undefined) {
            resolved = target;
            break;
        }
        assertLocalRootRef(nextRef);
        if (seenRefs.has(nextRef)) {
            throw new Error('Cyclic local $ref at `<root>` is not supported: ' + JSON.stringify(nextRef));
        }
        if (!hasOnlyRefAndAnnotations(target)) {
            throw new Error('Schema $ref in root chain has non-annotation siblings that Draft 7 ignores and cannot be represented in strict Structured Outputs.');
        }
        for (const keyword of JSON_SCHEMA_ANNOTATION_KEYWORDS){
            if (!(keyword in inheritedAnnotations) && keyword in target) {
                inheritedAnnotations[keyword] = target[keyword];
            }
        }
        ref = nextRef;
    }
    const rootDefinitions = schema.$defs;
    const legacyDefinitions = schema.definitions;
    const rootMetadata = Object.fromEntries(Object.entries(schema).filter(([keyword])=>JSON_SCHEMA_ANNOTATION_KEYWORDS.has(keyword) || JSON_SCHEMA_ROOT_METADATA_KEYWORDS.has(keyword)));
    const inlined = structuredClone(resolved);
    // A target's definition map lives below the target's original pointer, not
    // at the document root. Keep the outer document map at the root so existing
    // absolute refs retain their meaning; the retained outer map also keeps the
    // target's nested map reachable at its original pointer.
    for (const keyword of [
        '$defs',
        'definitions'
    ]){
        if (schema[keyword] !== undefined && inlined[keyword] !== undefined) {
            delete inlined[keyword];
        }
    }
    const schemaRecord = schema;
    for (const keyword of Object.keys(schema)){
        delete schemaRecord[keyword];
    }
    Object.assign(schema, inlined, inheritedAnnotations, rootMetadata);
    if (rootDefinitions !== undefined) {
        schema.$defs = rootDefinitions;
    }
    if (legacyDefinitions !== undefined) {
        schema.definitions = legacyDefinitions;
    }
}
/**
 * Root object validation runs before recursive strictification, so normalize
 * the same exactly representable allOf forms here that the recursive pass
 * handles for nested schemas.
 */ function normalizeRootAllOf(schema) {
    while(schema.allOf !== undefined){
        // Root normalization runs before recursive strictification so the root
        // type check can see an inlined object. Normalize nested intersections in
        // its branches first for the same associative allOf case handled by the
        // later recursive pass.
        if (Array.isArray(schema.allOf)) {
            for (const [index, branch] of schema.allOf.entries()){
                normalizeObjectAllOfBranches(branch, [
                    'allOf',
                    String(index)
                ], schema);
            }
        }
        if (mergeObjectAllOf(schema, [], schema)) {
            continue;
        }
        const allOf = schema.allOf;
        if (!Array.isArray(allOf) || allOf.length !== 1 || !hasOnlyRootAllOfMetadataSiblings(schema)) {
            return;
        }
        const branch = allOf[0];
        if (typeof branch === 'boolean' || !isObject(branch)) {
            return;
        }
        const rootMetadata = {
            ...schema
        };
        delete rootMetadata.allOf;
        const normalized = structuredClone(branch);
        const schemaRecord = schema;
        for (const keyword of Object.keys(schema)){
            delete schemaRecord[keyword];
        }
        Object.assign(schema, normalized, rootMetadata);
    }
}
/**
 * A singleton root anyOf with no validating siblings is equivalent to its
 * only branch. Flatten it before the root-union check so converters that
 * retain a redundant object wrapper can still produce a strict root object.
 */ function normalizeRootAnyOf(schema) {
    const anyOf = schema.anyOf;
    if (!Array.isArray(anyOf) || !hasOnlyRootAnyOfMetadataSiblings(schema)) {
        return false;
    }
    // `false` contributes no instances to a union. Keep the original array in
    // place until promotion so refs into the surviving branch can be rewritten
    // from their original index, while refs into removed false branches become
    // dangling and remain fail closed after the wrapper disappears.
    const realBranches = anyOf.map((branch, index)=>({
            branch,
            index
        })).filter(({ branch })=>branch !== false);
    if (realBranches.length !== 1) {
        return false;
    }
    const { branch, index: branchIndex } = realBranches[0];
    if (typeof branch === 'boolean' || !isObject(branch) || !isObjectOnlySchema(branch, schema)) {
        return false;
    }
    const definitionRenames = planPromotedRootAnyOfDefinitionRenames(schema, branch);
    rewriteLocalRefsIntoPromotedRootAnyOfBranch(schema, branchIndex, definitionRenames);
    const rootMetadata = {
        ...schema
    };
    delete rootMetadata.anyOf;
    const normalized = structuredClone(branch);
    for (const keyword of [
        '$defs',
        'definitions'
    ]){
        const rootDefinitions = schema[keyword];
        const branchDefinitions = normalized[keyword];
        if (!isObject(rootDefinitions) || !isObject(branchDefinitions)) {
            continue;
        }
        const renames = definitionRenames.get(keyword);
        const mergedDefinitions = {
            ...rootDefinitions
        };
        for (const [name, definition] of Object.entries(branchDefinitions)){
            mergedDefinitions[renames?.get(name) ?? name] = definition;
        }
        normalized[keyword] = mergedDefinitions;
        delete rootMetadata[keyword];
    }
    const schemaRecord = schema;
    for (const keyword of Object.keys(schema)){
        delete schemaRecord[keyword];
    }
    Object.assign(schema, normalized, rootMetadata);
    return true;
}
/**
 * Root and promoted branch definition maps occupy the same pointer after
 * promotion. Give conflicting branch definitions stable aliases before refs
 * are rewritten so neither original target is rebound.
 */ function planPromotedRootAnyOfDefinitionRenames(root, branch) {
    const renames = new Map();
    for (const keyword of [
        '$defs',
        'definitions'
    ]){
        const rootDefinitions = root[keyword];
        const branchDefinitions = branch[keyword];
        if (!isObject(rootDefinitions) || !isObject(branchDefinitions)) {
            continue;
        }
        const usedNames = new Set([
            ...Object.keys(rootDefinitions),
            ...Object.keys(branchDefinitions)
        ]);
        const keywordRenames = new Map();
        let aliasIndex = 0;
        for (const [name, definition] of Object.entries(branchDefinitions)){
            if (!Object.prototype.hasOwnProperty.call(rootDefinitions, name) || schemasEqual(rootDefinitions[name], definition)) {
                continue;
            }
            let alias = '__openai_strict_anyOf_definition_' + aliasIndex++;
            while(usedNames.has(alias)){
                alias = '__openai_strict_anyOf_definition_' + aliasIndex++;
            }
            usedNames.add(alias);
            keywordRenames.set(name, alias);
        }
        if (keywordRenames.size > 0) {
            renames.set(keyword, keywordRenames);
        }
    }
    return renames;
}
/**
 * Promoting a singleton root anyOf branch removes the original anyOf/index
 * pointer prefix. Rewrite refs through that prefix while the old tree still
 * exists so the promoted schema keeps naming the same targets.
 */ function rewriteLocalRefsIntoPromotedRootAnyOfBranch(root, branchIndex, definitionRenames) {
    const rewriteRef = (ref)=>{
        const parts = parseLocalRef(ref);
        if (parts === undefined || parts[0] !== 'anyOf' || parts[1] !== String(branchIndex)) {
            return ref;
        }
        const promotedParts = parts.slice(2);
        const definitionKeyword = promotedParts[0];
        if (promotedParts.length > 1 && (definitionKeyword === '$defs' || definitionKeyword === 'definitions')) {
            const renamed = definitionRenames.get(definitionKeyword)?.get(promotedParts[1]);
            if (renamed !== undefined) {
                promotedParts[1] = renamed;
            }
        }
        return promotedParts.length === 0 ? '#' : '#/' + promotedParts.map(encodeJSONPointerTokenForURIFragment).join('/');
    };
    const rewriteRefs = (value)=>{
        if (typeof value === 'boolean' || !isObject(value)) {
            return;
        }
        if (typeof value.$ref === 'string') {
            value.$ref = rewriteRef(value.$ref);
        }
        forEachJSONSchemaChild(value, [], (child)=>{
            rewriteRefs(child);
        });
    };
    rewriteRefs(root);
}
function assertLocalRootRef(ref) {
    if (typeof ref !== 'string') {
        throw new TypeError('Received non-string $ref - ' + String(ref) + '; path=<root>');
    }
    if (!ref.startsWith('#')) {
        throw new Error('External $ref at `<root>` is not supported in strict Structured Outputs: ' + JSON.stringify(ref));
    }
}
function hasOnlyRootRefAndDefinitions(schema) {
    return Object.keys(schema).every((keyword)=>keyword === '$ref' || keyword === '$defs' || keyword === 'definitions' || JSON_SCHEMA_ROOT_METADATA_KEYWORDS.has(keyword) || JSON_SCHEMA_ANNOTATION_KEYWORDS.has(keyword));
}
/**
 * Draft 7 permits `type` to be either a string or an array of strings. A
 * singleton array has exactly the same validation semantics as its scalar
 * form, so canonicalize it before root validation and recursive strictifying.
 * Multi-type arrays carry real union semantics and must remain unchanged.
 */ function normalizeSingletonTypeArrays(schema) {
    if (typeof schema === 'boolean' || !isObject(schema)) {
        return;
    }
    if (Array.isArray(schema.type) && schema.type.length === 1) {
        schema.type = schema.type[0];
    }
    forEachJSONSchemaChild(schema, [], (child)=>{
        normalizeSingletonTypeArrays(child);
    });
}
function isNullable(schema, root, seenRefs = new Set()) {
    if (typeof schema === 'boolean') {
        return schema;
    }
    const ref = schema.$ref;
    if (ref !== undefined) {
        // Annotation keywords do not constrain validation, so they are safe beside
        // a local ref. Keep the proof conservative for every other sibling because
        // resolving those correctly would require intersecting the referenced
        // schema and its sibling constraints.
        if (typeof ref !== 'string' || !hasOnlyRefAndAnnotations(schema) || seenRefs.has(ref)) {
            return false;
        }
        const resolved = resolveLocalRef(root, ref);
        if (resolved === undefined) {
            return false;
        }
        return isNullable(resolved, root, new Set([
            ...seenRefs,
            ref
        ]));
    }
    if (schema.type !== undefined && schema.type !== 'null' && !(Array.isArray(schema.type) && schema.type.includes('null'))) {
        return false;
    }
    if ('const' in schema && schema.const !== null) {
        return false;
    }
    if (schema.enum !== undefined && (!Array.isArray(schema.enum) || !schema.enum.includes(null))) {
        return false;
    }
    if (schema.allOf !== undefined) {
        if (!Array.isArray(schema.allOf) || !schema.allOf.every((variant)=>isNullable(variant, root))) {
            return false;
        }
    }
    if (schema.anyOf !== undefined) {
        if (!Array.isArray(schema.anyOf) || !schema.anyOf.some((variant)=>isNullable(variant, root))) {
            return false;
        }
    }
    if (schema.oneOf !== undefined) {
        if (!Array.isArray(schema.oneOf) || schema.oneOf.filter((variant)=>isNullable(variant, root)).length !== 1) {
            return false;
        }
    }
    // Conditional and negated schemas need a full JSON Schema evaluator to prove
    // that null is allowed. Treat them conservatively instead of accepting an
    // optional field that may not actually accept null.
    if (schema.not !== undefined || schema.if !== undefined || schema.then !== undefined || schema.else !== undefined) {
        return false;
    }
    return true;
}
/**
 * Mutates the given JSON schema to ensure it conforms to the `strict` standard
 * that the API expects.
 */ function ensureStrictJsonSchema(jsonSchema, path, root) {
    if (typeof jsonSchema === 'boolean') {
        throw new TypeError(`Expected object schema but got boolean; path=${path.join('/')}`);
    }
    if (!isObject(jsonSchema)) {
        throw new TypeError(`Expected ${JSON.stringify(jsonSchema)} to be an object; path=${path.join('/')}`);
    }
    // Closing each object branch in an allOf independently changes the
    // intersection: sibling branches' properties become forbidden extras. Merge
    // the small object-intersection subset that can be represented exactly before
    // applying strict object closure, and fail closed for the rest.
    if (mergeObjectAllOf(jsonSchema, path, root)) {
        return ensureStrictJsonSchema(jsonSchema, path, root);
    }
    // false is the identity element for a union. Remove it before proving
    // whether an outer object/array wrapper is redundant so an impossible
    // alternative cannot hide the shape of every real branch. Keep all-false
    // and boolean-only unions intact so the existing boolean-schema rejection
    // remains fail closed.
    normalizeAnyOfFalseBranches(jsonSchema);
    // Closing a type: object wrapper around object union branches without any
    // own properties would turn it into an empty object and forbid every branch
    // property. A bare object type is redundant when every branch already proves
    // the value is an object, so remove only that exact constraint; fail closed
    // for wrappers whose object constraints cannot be preserved mechanically.
    normalizeObjectUnionWrapper(jsonSchema, path, root);
    // Add additionalProperties: false to object schemas. Draft 7 permits object
    // keywords without an explicit type, so those implicit object shapes need
    // the same strict handling as type: 'object'. Explicitly open object schemas
    // cannot be represented in Structured Outputs strict mode.
    if (hasObjectShape(jsonSchema)) {
        if (!('additionalProperties' in jsonSchema)) {
            jsonSchema.additionalProperties = false;
        } else if (jsonSchema.additionalProperties !== false) {
            throw new Error(`Object schema at \`${path.join('/') || '<root>'}\` must set \`additionalProperties: false\` to be compatible with strict Structured Outputs.`);
        }
    }
    const required = jsonSchema.required ?? [];
    if (!Array.isArray(required) || required.some((key)=>typeof key !== 'string')) {
        throw new TypeError(`Expected \`required\` to be an array of strings; path=${path.join('/') || '<root>'}`);
    }
    // Handle object properties
    const properties = jsonSchema.properties;
    if (hasObjectShape(jsonSchema)) {
        for (const key of required){
            if (!isObject(properties) || !Object.prototype.hasOwnProperty.call(properties, key)) {
                throw new Error(`Object schema at \`${path.join('/') || '<root>'}\` requires property \`${key}\` but does not declare it in \`properties\`.`);
            }
        }
    }
    if (isObject(properties)) {
        for (const [key, value] of Object.entries(properties)){
            if (!isNullable(value, root) && !required.includes(key)) {
                throw new Error(`Schema field at \`${[
                    ...path,
                    'properties',
                    key
                ].join('/')}\` uses \`.optional()\` without \`.nullable()\` which is not supported by the API. See: https://platform.openai.com/docs/guides/structured-outputs?api-mode=responses#all-fields-must-be-required`);
            }
        }
        jsonSchema.required = Object.keys(properties);
    }
    // Structured Outputs accepts one schema for every array item and does not
    // support Draft 7 tuples or additionalItems. Reject both forms rather than
    // advertising a schema whose array validation the API cannot preserve.
    const items = jsonSchema.items;
    const additionalItems = jsonSchema.additionalItems;
    if (Array.isArray(items)) {
        throw new Error(`Schema at \`${path.join('/') || '<root>'}\` uses tuple-form \`items\`, which cannot be represented in strict Structured Outputs.`);
    }
    if (additionalItems !== undefined) {
        throw new Error(`Schema at \`${path.join('/') || '<root>'}\` uses unsupported keyword \`additionalItems\` and cannot be represented in strict Structured Outputs.`);
    }
    // Handle intersections (allOf)
    const allOf = jsonSchema.allOf;
    if (Array.isArray(allOf)) {
        if (allOf.length === 1 && hasOnlyAnnotationSiblings(jsonSchema, 'allOf')) {
            const branch = allOf[0];
            if (branch === false) {
                throw new Error(`Schema at \`${path.join('/') || '<root>'}\` uses \`allOf: [false]\`, which cannot be represented in strict Structured Outputs.`);
            }
            if (branch === true) {
                // true is the neutral schema for an intersection, so removing this
                // branch preserves validation while retaining the parent annotations.
                delete jsonSchema.allOf;
            } else {
                const resolved = ensureStrictJsonSchema(branch, [
                    ...path,
                    'allOf',
                    '0'
                ], root);
                const annotations = {
                    ...jsonSchema
                };
                delete annotations.allOf;
                Object.assign(jsonSchema, resolved, annotations);
                delete jsonSchema.allOf;
            }
        }
    }
    normalizeArrayUnionWrapper(jsonSchema, root);
    const schemaRecord = jsonSchema;
    for (const keyword of JSON_SCHEMA_UNSUPPORTED_SCHEMA_KEYWORDS){
        // Optional converter output often keeps undefined placeholders on the
        // JavaScript object even though JSON serialization omits them. They carry
        // no validation semantics, so treat only undefined as absent; every
        // defined value remains unsupported.
        if (schemaRecord[keyword] !== undefined) {
            throw new Error(`Schema at \`${path.join('/') || '<root>'}\` uses unsupported keyword \`${keyword}\` and cannot be represented in strict Structured Outputs.`);
        }
        delete schemaRecord[keyword];
    }
    const type = jsonSchema.type;
    const currentItems = jsonSchema.items;
    if ((type === 'array' || Array.isArray(type) && type.includes('array')) && currentItems === undefined) {
        throw new Error(`Schema at \`${path.join('/') || '<root>'}\` declares an array without \`items\`, which cannot be represented in strict Structured Outputs.`);
    }
    forEachJSONSchemaChild(jsonSchema, path, (child, childPath, keyword)=>{
        // These boolean forms are already handled as parent-keyword semantics:
        // additionalProperties: false closes objects, while boolean
        // additionalItems does not contain a nested schema to strictify.
        if (typeof child === 'boolean' && (keyword === 'additionalProperties' || keyword === 'additionalItems')) {
            return;
        }
        ensureStrictJsonSchema(child, childPath, root);
    });
    // Strip `null` defaults as there's no meaningful distinction
    if (jsonSchema.default === null) {
        delete jsonSchema.default;
    }
    return jsonSchema;
}
function parseLocalRef(ref) {
    if (!ref.startsWith('#')) {
        return undefined;
    }
    let pointer;
    try {
        // A local $ref is a URI fragment containing a JSON Pointer. RFC 6901
        // decodes the complete fragment before tokenizing the pointer, so an
        // encoded slash is a separator rather than part of a literal key.
        pointer = decodeURIComponent(ref.slice(1));
    } catch  {
        return undefined;
    }
    if (pointer === '') {
        return [];
    }
    if (!pointer.startsWith('/')) {
        return undefined;
    }
    const parts = [];
    for (const encodedPart of pointer.slice(1).split('/')){
        // JSON Pointer only defines ~0 and ~1 escapes. Reject malformed escape
        // sequences instead of looking up a different literal key.
        if (/~(?:[^01]|$)/.test(encodedPart)) {
            return undefined;
        }
        parts.push(encodedPart.replace(/~1/g, '/').replace(/~0/g, '~'));
    }
    return parts;
}
function resolvePointerPart(resolved, part) {
    if (Array.isArray(resolved)) {
        if (!/^(?:0|[1-9]\d*)$/.test(part)) {
            return undefined;
        }
        const index = Number(part);
        if (!Object.prototype.hasOwnProperty.call(resolved, index)) {
            return undefined;
        }
        return resolved[index];
    }
    if (!isObject(resolved) || !Object.prototype.hasOwnProperty.call(resolved, part)) {
        return undefined;
    }
    return resolved[part];
}
function resolveLocalRef(root, ref) {
    const parts = parseLocalRef(ref);
    if (parts === undefined) {
        return undefined;
    }
    // Literal payloads such as `default`, `enum`, and `const` can contain
    // object-shaped values, but they are not schemas and are never traversed by
    // strictification. Resolve only the schema-bearing locations visited by
    // forEachJSONSchemaChild so every accepted target is normalized before we
    // advertise the result as strict.
    let resolved = root;
    for(let index = 0; index < parts.length;){
        if (!isObject(resolved)) {
            return undefined;
        }
        const keyword = parts[index];
        if (JSON_SCHEMA_SINGLE_SCHEMA_KEYWORDS.includes(keyword)) {
            resolved = resolvePointerPart(resolved, keyword);
            index += 1;
            continue;
        }
        if (JSON_SCHEMA_ARRAY_SCHEMA_KEYWORDS.includes(keyword)) {
            resolved = resolvePointerPart(resolved, keyword);
            index += 1;
            if (Array.isArray(resolved)) {
                if (index >= parts.length) {
                    return undefined;
                }
                resolved = resolvePointerPart(resolved, parts[index]);
                index += 1;
            }
            continue;
        }
        if (JSON_SCHEMA_MAP_SCHEMA_KEYWORDS.includes(keyword)) {
            const children = resolvePointerPart(resolved, keyword);
            index += 1;
            if (!isObject(children) || index >= parts.length) {
                return undefined;
            }
            resolved = resolvePointerPart(children, parts[index]);
            if (keyword === 'dependencies' && !isSchemaDefinition(resolved)) {
                return undefined;
            }
            index += 1;
            continue;
        }
        return undefined;
    }
    return isSchemaDefinition(resolved) ? resolved : undefined;
}
function isObject(obj) {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}
function isSchemaDefinition(value) {
    return typeof value === 'boolean' || isObject(value);
}
function isObjectOnlySchema(schema, root, seenRefs = new Set()) {
    if (typeof schema === 'boolean' || !isObject(schema)) {
        return false;
    }
    if (schema.$ref !== undefined) {
        if (typeof schema.$ref !== 'string' || !hasOnlyRefAndAnnotations(schema) || seenRefs.has(schema.$ref)) {
            return false;
        }
        const resolved = resolveLocalRef(root, schema.$ref);
        if (resolved === undefined) {
            return false;
        }
        return isObjectOnlySchema(resolved, root, new Set([
            ...seenRefs,
            schema.$ref
        ]));
    }
    if (schema.allOf !== undefined) {
        if (!Array.isArray(schema.allOf) || schema.allOf.length !== 1 || !hasOnlyAnnotationSiblings(schema, 'allOf')) {
            return false;
        }
        const branch = schema.allOf[0];
        return branch !== undefined && branch !== true && branch !== false ? isObjectOnlySchema(branch, root, seenRefs) : false;
    }
    return schema.type === 'object' || Array.isArray(schema.type) && schema.type.length === 1 && schema.type[0] === 'object';
}
function isArrayOnlySchema(schema, root, seenRefs = new Set()) {
    if (typeof schema === 'boolean' || !isObject(schema)) {
        return false;
    }
    if (schema.$ref !== undefined) {
        if (typeof schema.$ref !== 'string' || !hasOnlyRefAndAnnotations(schema) || seenRefs.has(schema.$ref)) {
            return false;
        }
        const resolved = resolveLocalRef(root, schema.$ref);
        if (resolved === undefined) {
            return false;
        }
        return isArrayOnlySchema(resolved, root, new Set([
            ...seenRefs,
            schema.$ref
        ]));
    }
    if (schema.allOf !== undefined) {
        if (!Array.isArray(schema.allOf) || schema.allOf.length !== 1 || !hasOnlyAnnotationSiblings(schema, 'allOf')) {
            return false;
        }
        const branch = schema.allOf[0];
        return branch !== undefined && branch !== true && branch !== false ? isArrayOnlySchema(branch, root, seenRefs) : false;
    }
    return schema.type === 'array' || Array.isArray(schema.type) && schema.type.length === 1 && schema.type[0] === 'array';
}
function hasOnlyRefAndAnnotations(schema) {
    return Object.keys(schema).every(// Definition maps do not add sibling validation constraints, and keeping
    // them in place preserves local pointers into a nested alias's scope.
    (keyword)=>keyword === '$ref' || keyword === '$defs' || keyword === 'definitions' || JSON_SCHEMA_ANNOTATION_KEYWORDS.has(keyword));
}
function hasOnlyAnnotationSiblings(schema, keyword) {
    const schemaRecord = schema;
    return Object.keys(schema).every(// Definition maps do not add sibling validation constraints. Keep them
    // beside a flattened singleton allOf so refs into this nested scope stay
    // reachable at their original pointers.
    (schemaKeyword)=>schemaKeyword === keyword || (schemaKeyword === '$defs' || schemaKeyword === 'definitions') && isObject(schemaRecord[schemaKeyword]) || JSON_SCHEMA_ANNOTATION_KEYWORDS.has(schemaKeyword));
}
function hasOnlyRootAllOfMetadataSiblings(schema) {
    return Object.keys(schema).every((keyword)=>keyword === 'allOf' || keyword === '$defs' || keyword === 'definitions' || JSON_SCHEMA_ROOT_METADATA_KEYWORDS.has(keyword) || JSON_SCHEMA_ANNOTATION_KEYWORDS.has(keyword));
}
function hasOnlyRootAnyOfMetadataSiblings(schema) {
    return Object.keys(schema).every((keyword)=>keyword === 'anyOf' || keyword === '$defs' || keyword === 'definitions' || keyword === 'type' && schema.type === 'object' || JSON_SCHEMA_ROOT_METADATA_KEYWORDS.has(keyword) || JSON_SCHEMA_ANNOTATION_KEYWORDS.has(keyword));
}
function hasObjectKeywords(schema) {
    return Object.keys(schema).some((keyword)=>JSON_SCHEMA_OBJECT_KEYWORDS.has(keyword));
}
function hasObjectShape(schema) {
    const typ = schema.type;
    return typ === 'object' || Array.isArray(typ) && typ.includes('object') || typ === undefined && hasObjectKeywords(schema);
}
function isRedundantUnionWrapperType(type, branchType) {
    return type === branchType || Array.isArray(type) && type.length === 2 && type.includes(branchType) && type.includes('null');
}
function normalizeObjectUnionWrapper(jsonSchema, path, root) {
    if (jsonSchema.anyOf === undefined) {
        return;
    }
    const hasEmptyProperties = isObject(jsonSchema.properties) && Object.keys(jsonSchema.properties).length === 0;
    const hasEmptyRequired = Array.isArray(jsonSchema.required) && jsonSchema.required.length === 0;
    if (hasEmptyProperties) {
        delete jsonSchema.properties;
    }
    if (hasEmptyRequired) {
        delete jsonSchema.required;
    }
    if (!hasObjectShape(jsonSchema)) {
        return;
    }
    const hasOwnObjectConstraints = Object.keys(jsonSchema).some((keyword)=>JSON_SCHEMA_OBJECT_KEYWORDS.has(keyword));
    if (isRedundantUnionWrapperType(jsonSchema.type, 'object') && !hasOwnObjectConstraints && Array.isArray(jsonSchema.anyOf) && jsonSchema.anyOf.every((branch)=>isObjectOnlySchema(branch, root))) {
        // The union already excludes null and every non-object value, so both a
        // scalar object wrapper and a nullable object wrapper are redundant under
        // Draft 7's conjunctive keyword semantics.
        delete jsonSchema.type;
        return;
    }
    throw new Error('Object anyOf schema at `' + (path.join('/') || '<root>') + '` cannot be represented in strict Structured Outputs without changing Draft 7 validation.');
}
function normalizeArrayUnionWrapper(jsonSchema, root) {
    if (isRedundantUnionWrapperType(jsonSchema.type, 'array') && jsonSchema.items === undefined && Array.isArray(jsonSchema.anyOf) && jsonSchema.anyOf.every((branch)=>isArrayOnlySchema(branch, root))) {
        // Every union branch already proves the value is an array and excludes
        // null. Keeping either redundant wrapper would require an outer items
        // schema that does not contribute any Draft 7 validation.
        delete jsonSchema.type;
    }
}
function normalizeAnyOfFalseBranches(jsonSchema) {
    if (!Array.isArray(jsonSchema.anyOf)) {
        return;
    }
    const realBranches = jsonSchema.anyOf.filter((branch)=>branch !== false);
    if (realBranches.length > 0 && realBranches.length !== jsonSchema.anyOf.length) {
        jsonSchema.anyOf = realBranches;
    }
}
function assertNoNestedSchemaIds(schema) {
    const visit = (value, path)=>{
        if (typeof value === 'boolean' || !isObject(value)) {
            return;
        }
        if (path.length > 0 && value.$id !== undefined) {
            throw new Error('Nested $id at ' + JSON.stringify(path.join('/')) + ' establishes a separate JSON Schema resource scope and cannot be represented in strict Structured Outputs.');
        }
        forEachJSONSchemaChild(value, path, (child, childPath)=>{
            visit(child, childPath);
        });
    };
    visit(schema, []);
}
function refTargetsAllOfBranch(root, ref) {
    const parts = parseLocalRef(ref);
    if (parts === undefined) {
        return false;
    }
    let resolved = root;
    for (const [index, part] of parts.entries()){
        if (part === 'allOf' && isObject(resolved) && Array.isArray(resolved['allOf']) && index < parts.length - 1) {
            return true;
        }
        resolved = resolvePointerPart(resolved, part);
        if (resolved === undefined) {
            return false;
        }
    }
    return false;
}
function escapeJSONPointerToken(token) {
    return token.replace(/~/g, '~0').replace(/\//g, '~1');
}
function encodeJSONPointerTokenForURIFragment(token) {
    // `$` is a valid URI fragment sub-delimiter and keeping it readable retains
    // the conventional `#/$defs/...` spelling. Everything else that could
    // invalidate or retokenize the fragment (notably `%` and spaces) is encoded
    // after JSON Pointer escaping.
    return encodeURIComponent(escapeJSONPointerToken(token)).replace(/%24/g, '$');
}
function rewriteLocalRefsIntoMovedOneOfBranches(root) {
    const rewriteRef = (ref)=>{
        const parts = parseLocalRef(ref);
        if (parts === undefined || parts.length === 0) {
            return ref;
        }
        let resolved = root;
        let changed = false;
        for (const [index, part] of parts.entries()){
            if (part === 'oneOf' && index < parts.length - 1 && isObject(resolved) && Array.isArray(resolved['oneOf'])) {
                parts[index] = 'anyOf';
                changed = true;
            }
            resolved = resolvePointerPart(resolved, part);
            if (resolved === undefined) {
                return ref;
            }
        }
        return changed ? '#/' + parts.map(encodeJSONPointerTokenForURIFragment).join('/') : ref;
    };
    const rewriteRefs = (value)=>{
        if (typeof value === 'boolean' || !isObject(value)) {
            return;
        }
        if (typeof value.$ref === 'string') {
            value.$ref = rewriteRef(value.$ref);
        }
        forEachJSONSchemaChild(value, [], (child)=>{
            rewriteRefs(child);
        });
    };
    rewriteRefs(root);
}
/**
 * Strictification removes false anyOf alternatives. Rewrite pointers into
 * surviving alternatives before that filtering happens so each local ref
 * still names the same schema after earlier indices disappear.
 */ function rewriteLocalRefsIntoFilteredAnyOfBranches(root) {
    const rewriteRef = (ref)=>{
        const originalParts = parseLocalRef(ref);
        if (originalParts === undefined || originalParts.length === 0) {
            return ref;
        }
        const rewrittenParts = [
            ...originalParts
        ];
        let resolved = root;
        let changed = false;
        for (const [index, part] of originalParts.entries()){
            const resolvedRecord = typeof resolved === 'object' && resolved !== null && !Array.isArray(resolved) ? resolved : undefined;
            if (part === 'anyOf' && index < originalParts.length - 1 && resolvedRecord !== undefined && Array.isArray(resolvedRecord['anyOf'])) {
                const branches = resolvedRecord['anyOf'];
                const branchIndexPart = originalParts[index + 1];
                if (!/^(?:0|[1-9]\d*)$/.test(branchIndexPart)) {
                    return ref;
                }
                const branchIndex = Number(branchIndexPart);
                if (!Object.prototype.hasOwnProperty.call(branches, branchIndex)) {
                    return ref;
                }
                const realBranches = branches.filter((branch)=>branch !== false);
                if (realBranches.length > 0 && realBranches.length !== branches.length) {
                    // A ref to a removed false schema is already rejected by the first
                    // ref-validation pass. Leave it untouched so it remains fail closed.
                    if (branches[branchIndex] === false) {
                        return ref;
                    }
                    const rewrittenIndex = branches.slice(0, branchIndex).filter((branch)=>branch !== false).length;
                    if (rewrittenIndex !== branchIndex) {
                        rewrittenParts[index + 1] = String(rewrittenIndex);
                        changed = true;
                    }
                }
            }
            // Resolve through the original pointer, not the rewritten one, so a
            // nested anyOf can also be remapped after its parent index shifts.
            resolved = resolvePointerPart(resolved, part);
            if (resolved === undefined) {
                return ref;
            }
        }
        return changed ? '#/' + rewrittenParts.map(encodeJSONPointerTokenForURIFragment).join('/') : ref;
    };
    const rewriteRefs = (value)=>{
        if (typeof value === 'boolean' || !isObject(value)) {
            return;
        }
        if (typeof value.$ref === 'string') {
            value.$ref = rewriteRef(value.$ref);
        }
        forEachJSONSchemaChild(value, [], (child)=>{
            rewriteRefs(child);
        });
    };
    rewriteRefs(root);
}
/**
 * Strictification removes every representable allOf. Preserve any schema
 * referenced through an allOf branch under a stable root definition first so
 * structural flattening cannot leave a dangling local pointer behind.
 */ function preserveAllOfRefTargets(root, rootOnly = false) {
    const refsToPreserve = new Set();
    const collectRefs = (value)=>{
        if (typeof value === 'boolean' || !isObject(value)) {
            return;
        }
        if (typeof value.$ref === 'string' && refTargetsAllOfBranch(root, value.$ref)) {
            const pointerParts = parseLocalRef(value.$ref);
            if (!rootOnly || pointerParts?.[0] === 'allOf') {
                refsToPreserve.add(value.$ref);
            }
        }
        forEachJSONSchemaChild(value, [], (child)=>{
            collectRefs(child);
        });
    };
    collectRefs(root);
    if (refsToPreserve.size === 0) {
        return;
    }
    if (root.$defs !== undefined && !isObject(root.$defs)) {
        throw new Error('Root schema has invalid $defs and cannot preserve local allOf references.');
    }
    const definitions = root.$defs ?? (root.$defs = {});
    const rewrittenRefs = new Map();
    let aliasIndex = 0;
    for (const ref of refsToPreserve){
        const target = resolveLocalRef(root, ref);
        if (!isSchemaDefinition(target)) {
            if (rootOnly) {
                continue;
            }
            throw new Error('Local $ref cannot be preserved before allOf flattening: ' + JSON.stringify(ref));
        }
        let alias = '__openai_strict_allOf_ref_' + aliasIndex++;
        while(Object.prototype.hasOwnProperty.call(definitions, alias)){
            alias = '__openai_strict_allOf_ref_' + aliasIndex++;
        }
        definitions[alias] = structuredClone(target);
        rewrittenRefs.set(ref, '#/$defs/' + escapeJSONPointerToken(alias));
    }
    const rewriteRefs = (value)=>{
        if (typeof value === 'boolean' || !isObject(value)) {
            return;
        }
        if (typeof value.$ref === 'string') {
            value.$ref = rewrittenRefs.get(value.$ref) ?? value.$ref;
        }
        forEachJSONSchemaChild(value, [], (child)=>{
            rewriteRefs(child);
        });
    };
    rewriteRefs(root);
}
/**
 * Closed allOf merges can discard optional property declarations. Preserve
 * only local refs into declarations that are about to disappear, then rewrite
 * those refs to stable root definitions before the merge removes their paths.
 */ function preserveDiscardedAllOfPropertyRefTargets(root, discardedPaths) {
    if (discardedPaths.length === 0) {
        return;
    }
    const refsToPreserve = new Set();
    const collectRefs = (value)=>{
        if (typeof value === 'boolean' || !isObject(value)) {
            return;
        }
        if (typeof value.$ref === 'string') {
            const parts = parseLocalRef(value.$ref);
            if (parts !== undefined && discardedPaths.some((discardedPath)=>parts.length >= discardedPath.length && discardedPath.every((part, index)=>parts[index] === part))) {
                refsToPreserve.add(value.$ref);
            }
        }
        forEachJSONSchemaChild(value, [], (child)=>{
            collectRefs(child);
        });
    };
    collectRefs(root);
    if (refsToPreserve.size === 0) {
        return;
    }
    if (root.$defs !== undefined && !isObject(root.$defs)) {
        throw new Error('Root schema has invalid $defs and cannot preserve discarded allOf properties.');
    }
    const definitions = root.$defs ?? (root.$defs = {});
    const rewrittenRefs = new Map();
    let aliasIndex = 0;
    for (const ref of refsToPreserve){
        const target = resolveLocalRef(root, ref);
        if (!isSchemaDefinition(target)) {
            throw new Error('Local $ref cannot be preserved before allOf property removal: ' + JSON.stringify(ref));
        }
        let alias = '__openai_strict_allOf_property_ref_' + aliasIndex++;
        while(Object.prototype.hasOwnProperty.call(definitions, alias)){
            alias = '__openai_strict_allOf_property_ref_' + aliasIndex++;
        }
        definitions[alias] = structuredClone(target);
        rewrittenRefs.set(ref, '#/$defs/' + escapeJSONPointerToken(alias));
    }
    const rewriteRefs = (value)=>{
        if (typeof value === 'boolean' || !isObject(value)) {
            return;
        }
        if (typeof value.$ref === 'string') {
            value.$ref = rewrittenRefs.get(value.$ref) ?? value.$ref;
        }
        forEachJSONSchemaChild(value, [], (child)=>{
            rewriteRefs(child);
        });
    };
    rewriteRefs(root);
}
function validateRefSchemas(schema, path, root) {
    if (typeof schema === 'boolean' || !isObject(schema)) {
        return;
    }
    const ref = schema.$ref;
    if (ref !== undefined) {
        if (typeof ref !== 'string') {
            throw new TypeError(`Received non-string $ref - ${ref}; path=${path.join('/')}`);
        }
        if (!ref.startsWith('#')) {
            throw new Error(`External $ref at \`${path.join('/') || '<root>'}\` is not supported in strict Structured Outputs: ${JSON.stringify(ref)}`);
        }
        const resolved = resolveLocalRef(root, ref);
        if (resolved === undefined || !isSchemaDefinition(resolved)) {
            throw new Error(`Local $ref at \`${path.join('/') || '<root>'}\` does not resolve to an object or boolean schema: ${JSON.stringify(ref)}`);
        }
        if (typeof resolved === 'boolean') {
            throw new TypeError(`Expected object schema but got boolean; path=${path.join('/')}`);
        }
        if (!hasOnlyRefAndAnnotations(schema)) {
            throw new Error(`Schema $ref at \`${path.join('/') || '<root>'}\` has non-annotation siblings that Draft 7 ignores and cannot be represented in strict Structured Outputs.`);
        }
    }
    forEachJSONSchemaChild(schema, path, (child, childPath)=>{
        validateRefSchemas(child, childPath, root);
    });
}
/**
 * Resolve only local aliases whose siblings carry no validation semantics.
 * Keeping this separate from general ref validation lets allOf merging inspect
 * the effective object shape without broadening which refs or sibling
 * constraints are accepted.
 */ function resolveObjectAllOfBranch(schema, root, normalizing) {
    const refChain = [
        schema
    ];
    const seenRefs = new Set();
    let resolved = schema;
    let resolvedPath = [];
    while(true){
        while(resolved.$ref !== undefined){
            const ref = resolved.$ref;
            if (typeof ref !== 'string' || !hasOnlyRefAndAnnotations(resolved) || seenRefs.has(ref)) {
                return undefined;
            }
            seenRefs.add(ref);
            const target = resolveLocalRef(root, ref);
            if (typeof target === 'boolean' || !isObject(target)) {
                return undefined;
            }
            const targetPath = parseLocalRef(ref);
            if (targetPath === undefined) {
                return undefined;
            }
            resolved = target;
            resolvedPath = targetPath;
            refChain.push(resolved);
        }
        // A ref can point forward to a target whose own mergeable allOf has not
        // been visited yet. Normalize that target before its consumer classifies
        // the resolved shape, making property order irrelevant. An active target
        // is a ref/allOf cycle; leave it wrapped so the caller still fails closed.
        if (resolved.allOf !== undefined && !normalizing.has(resolved)) {
            const previousAllOf = resolved.allOf;
            normalizeObjectAllOfBranches(resolved, resolvedPath, root, normalizing);
            // Singleton flattening can expose another local ref. Follow it through
            // the same guarded loop before returning the effective branch.
            if (resolved.$ref !== undefined || resolved.allOf !== previousAllOf) {
                continue;
            }
        }
        return {
            schema: resolved,
            refChain
        };
    }
}
function normalizeObjectAllOfBranches(schema, path, root, normalizing = new Set()) {
    if (typeof schema === 'boolean' || !isObject(schema)) {
        return;
    }
    if (normalizing.has(schema)) {
        return;
    }
    normalizing.add(schema);
    try {
        while(true){
            forEachJSONSchemaChild(schema, path, (child, childPath)=>{
                normalizeObjectAllOfBranches(child, childPath, root, normalizing);
            });
            // Intersections are associative, so normalize nested object
            // intersections before classifying their parents. Otherwise an inner
            // allOf wrapper has no directly visible object shape and makes an
            // exactly mergeable outer allOf fail closed.
            if (!mergeObjectAllOf(schema, path, root, normalizing)) {
                return;
            }
        }
    } finally{
        normalizing.delete(schema);
    }
}
function normalizeObjectAllOfForExclusivity(schema, root) {
    if (schema.allOf === undefined) {
        return undefined;
    }
    const normalized = structuredClone(schema);
    try {
        // Removing neutral branches or flattening a singleton can expose another
        // mergeable allOf wrapper. Keep applying the recursive merger and safe
        // singleton flattening until the proof sees the branch's final shape.
        while(normalized.allOf !== undefined){
            normalizeObjectAllOfBranches(normalized, [], root);
            if (normalized.allOf === undefined) {
                break;
            }
            const allOf = normalized.allOf;
            if (!Array.isArray(allOf) || allOf.length !== 1 || !hasOnlyAnnotationSiblings(normalized, 'allOf')) {
                return undefined;
            }
            const branch = allOf[0];
            if (typeof branch === 'boolean' || !isObject(branch)) {
                return undefined;
            }
            const siblings = {
                ...normalized
            };
            delete siblings.allOf;
            const flattened = structuredClone(branch);
            for (const keyword of Object.keys(normalized)){
                delete normalized[keyword];
            }
            Object.assign(normalized, flattened, siblings);
        }
        return normalized;
    } catch  {
        return undefined;
    }
}
function mergeObjectAllOf(jsonSchema, path, root, normalizing = new Set()) {
    const allOf = jsonSchema.allOf;
    if (!Array.isArray(allOf) || allOf.length === 0) {
        return false;
    }
    // Intersections are idempotent. Collapse structurally identical branches
    // before object-shape classification so duplicate scalar and array schemas
    // can reach the existing safe singleton-flattening path.
    const uniqueBranches = allOf.filter((branch, index)=>!allOf.slice(0, index).some((candidate)=>schemasEqual(candidate, branch)));
    if (uniqueBranches.length !== allOf.length) {
        jsonSchema.allOf = uniqueBranches;
        return true;
    }
    // `true` is the identity element for Draft 7 intersections. Remove it
    // before deciding whether the remaining branches are object-mergeable so a
    // neutral branch cannot make an otherwise exact merge fail closed.
    const nonNeutralBranches = allOf.filter((entry)=>entry !== true);
    if (nonNeutralBranches.length !== allOf.length) {
        if (nonNeutralBranches.length === 0) {
            delete jsonSchema.allOf;
        } else {
            jsonSchema.allOf = nonNeutralBranches;
        }
        return true;
    }
    const parentHasObjectShape = hasObjectShapeWithoutAllOf(jsonSchema);
    const resolvedEntries = allOf.map((entry)=>isObject(entry) ? resolveObjectAllOfBranch(entry, root, normalizing) : undefined);
    const objectBranches = resolvedEntries.map((entry)=>entry?.schema).filter((entry)=>entry !== undefined && hasObjectShapeWithoutAllOf(entry));
    if (!parentHasObjectShape && objectBranches.length === 0) {
        return false;
    }
    // A lone object branch with no object-valued parent is handled by the
    // existing safe single-allOf flattening path below.
    if (!parentHasObjectShape && allOf.length === 1) {
        return false;
    }
    const fail = ()=>{
        throw new Error(`Object allOf at \`${path.join('/') || '<root>'}\` cannot be merged without changing Draft 7 validation.`);
    };
    if (!parentHasObjectShape && [
        'additionalProperties',
        'properties',
        'required',
        'type'
    ].some((keyword)=>keyword in jsonSchema)) {
        fail();
    }
    for (const keyword of Object.keys(jsonSchema)){
        if (keyword !== 'allOf' && keyword !== '$defs' && keyword !== 'definitions' && !(path.length === 0 && JSON_SCHEMA_ROOT_METADATA_KEYWORDS.has(keyword)) && !MERGEABLE_OBJECT_ALL_OF_KEYWORDS.has(keyword)) {
            fail();
        }
    }
    const branches = [];
    if (parentHasObjectShape) {
        branches.push({
            schema: jsonSchema,
            sourcePath: path
        });
    }
    for (const [index, entry] of allOf.entries()){
        if (!isObject(entry)) {
            fail();
        }
        const resolvedEntry = resolvedEntries[index];
        if (resolvedEntry === undefined) {
            return fail();
        }
        const branch = resolvedEntry.schema;
        // Definition maps do not constrain instances. Any refs into an allOf
        // branch were preserved under stable root definitions before this merge,
        // so a valid definitions-only branch can now be discarded like an
        // annotation-only branch.
        if (hasObjectShapeWithoutAllOf(branch)) {
            branches.push({
                schema: branch,
                sourcePath: branch === entry ? [
                    ...path,
                    'allOf',
                    String(index)
                ] : undefined
            });
        } else if (!hasOnlyNeutralAllOfBranchKeywords(branch)) {
            fail();
        }
    }
    const merged = {};
    for (const keyword of [
        '$defs',
        'definitions'
    ]){
        if (jsonSchema[keyword] !== undefined) {
            merged[keyword] = jsonSchema[keyword];
        }
    }
    if (path.length === 0) {
        for (const keyword of JSON_SCHEMA_ROOT_METADATA_KEYWORDS){
            if (keyword in jsonSchema) {
                merged[keyword] = jsonSchema[keyword];
            }
        }
    }
    const mergedProperties = Object.create(null);
    const mergedRequired = new Set();
    const closedPropertySets = [];
    const propertyEntries = [];
    let sawProperties = false;
    let sawRequired = false;
    let hasExplicitObjectType = false;
    let hasExplicitNullableObjectType = false;
    const mergeAnnotations = (schema)=>{
        for (const keyword of JSON_SCHEMA_ANNOTATION_KEYWORDS){
            if (!(keyword in schema)) continue;
            // Annotation keywords do not affect Draft 7 validation. Preserve the
            // first value (the outer schema, then earlier branches) instead of
            // rejecting an otherwise exactly mergeable intersection.
            if (!(keyword in merged)) {
                merged[keyword] = schema[keyword];
            }
        }
    };
    mergeAnnotations(jsonSchema);
    for (const resolvedEntry of resolvedEntries){
        if (resolvedEntry === undefined) continue;
        for (const entry of resolvedEntry.refChain){
            mergeAnnotations(entry);
        }
    }
    for (const { schema: branch, sourcePath } of branches){
        for (const keyword of Object.keys(branch)){
            if (keyword === 'allOf' && branch === jsonSchema) continue;
            if ((keyword === '$defs' || keyword === 'definitions') && isObject(branch[keyword])) {
                continue;
            }
            if (branch === jsonSchema && path.length === 0 && JSON_SCHEMA_ROOT_METADATA_KEYWORDS.has(keyword)) {
                continue;
            }
            if (!MERGEABLE_OBJECT_ALL_OF_KEYWORDS.has(keyword)) {
                fail();
            }
        }
        if (branch.type !== undefined) {
            if (!isMergeableObjectType(branch.type)) {
                fail();
            }
            if (branch.type === 'object') {
                hasExplicitObjectType = true;
            } else {
                hasExplicitNullableObjectType = true;
            }
        }
        if (branch.properties !== undefined) {
            if (!isObject(branch.properties)) {
                fail();
            }
            sawProperties = true;
            for (const [key, propertySchema] of Object.entries(branch.properties)){
                propertyEntries.push({
                    key,
                    propertySchema,
                    sourcePath: sourcePath === undefined ? undefined : [
                        ...sourcePath,
                        'properties',
                        key
                    ]
                });
            }
        }
        if (branch.required !== undefined) {
            if (!Array.isArray(branch.required) || branch.required.some((key)=>typeof key !== 'string')) {
                fail();
            }
            sawRequired = true;
            for (const key of branch.required)mergedRequired.add(key);
        }
        if ('additionalProperties' in branch) {
            if (branch.additionalProperties !== false) {
                fail();
            }
            closedPropertySets.push(new Set(Object.keys(branch.properties ?? {})));
        }
    }
    // A closed branch forbids every property it does not declare. Intersect all
    // closed property sets before merging schemas so optional declarations
    // excluded by another closed branch are discarded, while required excluded
    // properties remain unrepresentable and fail closed.
    const allowedClosedProperties = closedPropertySets.length === 0 ? undefined : closedPropertySets.slice(1).reduce((allowed, keys)=>new Set([
            ...allowed
        ].filter((key)=>keys.has(key))), new Set(closedPropertySets[0]));
    const excludesRequiredProperty = allowedClosedProperties !== undefined && [
        ...mergedRequired
    ].some((key)=>!allowedClosedProperties.has(key));
    const collapsesToNull = excludesRequiredProperty && !hasExplicitObjectType && hasExplicitNullableObjectType;
    const discardedPropertyPaths = propertyEntries.filter(({ key, sourcePath })=>sourcePath !== undefined && (collapsesToNull || allowedClosedProperties !== undefined && !allowedClosedProperties.has(key))).map(({ sourcePath })=>sourcePath);
    preserveDiscardedAllOfPropertyRefTargets(root, discardedPropertyPaths);
    if (jsonSchema === root && root.$defs !== undefined) {
        merged.$defs = root.$defs;
    }
    if (excludesRequiredProperty) {
        // Object keywords do not constrain null. If every explicit object type
        // also admits null, the object portion is contradictory but null remains
        // an exact representation of the intersection.
        if (collapsesToNull) {
            merged.type = 'null';
            for (const keyword of Object.keys(jsonSchema)){
                delete jsonSchema[keyword];
            }
            Object.assign(jsonSchema, merged);
            return true;
        }
        fail();
    }
    for (const { key, propertySchema } of propertyEntries){
        if (allowedClosedProperties !== undefined && !allowedClosedProperties.has(key)) {
            continue;
        }
        if (Object.prototype.hasOwnProperty.call(mergedProperties, key) && !schemasEqual(mergedProperties[key], propertySchema)) {
            fail();
        }
        mergedProperties[key] = propertySchema;
    }
    if (hasExplicitObjectType || hasExplicitNullableObjectType) {
        merged.type = hasExplicitObjectType ? 'object' : [
            'object',
            'null'
        ];
    }
    if (sawProperties) merged.properties = Object.fromEntries(Object.entries(mergedProperties));
    if (sawRequired) merged.required = [
        ...mergedRequired
    ];
    if (closedPropertySets.length > 0) merged.additionalProperties = false;
    for (const keyword of Object.keys(jsonSchema)){
        delete jsonSchema[keyword];
    }
    Object.assign(jsonSchema, merged);
    return true;
}
function hasObjectShapeWithoutAllOf(schema) {
    if (schema.type !== undefined) {
        return isMergeableObjectType(schema.type);
    }
    return Object.keys(schema).some((keyword)=>JSON_SCHEMA_OBJECT_KEYWORDS.has(keyword));
}
function hasOnlyNeutralAllOfBranchKeywords(schema) {
    const schemaRecord = schema;
    return Object.keys(schema).every((keyword)=>JSON_SCHEMA_ANNOTATION_KEYWORDS.has(keyword) || (keyword === '$defs' || keyword === 'definitions') && isObject(schemaRecord[keyword]));
}
function isMergeableObjectType(type) {
    return type === 'object' || Array.isArray(type) && type.length === 2 && type.includes('object') && type.includes('null');
}
function schemasEqual(left, right) {
    if (left === right) {
        return true;
    }
    if (Array.isArray(left) || Array.isArray(right)) {
        if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) {
            return false;
        }
        return left.every((value, index)=>schemasEqual(value, right[index]));
    }
    if (typeof left !== 'object' || left === null || typeof right !== 'object' || right === null) {
        return false;
    }
    const leftRecord = left;
    const rightRecord = right;
    const leftKeys = Object.keys(leftRecord).sort();
    const rightKeys = Object.keys(rightRecord).sort();
    if (leftKeys.length !== rightKeys.length) {
        return false;
    }
    return leftKeys.every((key, index)=>key === rightKeys[index] && schemasEqual(leftRecord[key], rightRecord[key]));
} //# sourceMappingURL=transform.mjs.map
}),
];

//# sourceMappingURL=36524_openai_lib_3a87b85a._.js.map