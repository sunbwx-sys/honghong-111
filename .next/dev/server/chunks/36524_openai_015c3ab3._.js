module.exports = [
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/error.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "APIConnectionError",
    ()=>APIConnectionError,
    "APIConnectionTimeoutError",
    ()=>APIConnectionTimeoutError,
    "APIError",
    ()=>APIError,
    "APIUserAbortError",
    ()=>APIUserAbortError,
    "AuthenticationError",
    ()=>AuthenticationError,
    "BadRequestError",
    ()=>BadRequestError,
    "ConflictError",
    ()=>ConflictError,
    "ContentFilterFinishReasonError",
    ()=>ContentFilterFinishReasonError,
    "InternalServerError",
    ()=>InternalServerError,
    "InvalidWebhookSignatureError",
    ()=>InvalidWebhookSignatureError,
    "LengthFinishReasonError",
    ()=>LengthFinishReasonError,
    "NotFoundError",
    ()=>NotFoundError,
    "OAuthError",
    ()=>OAuthError,
    "OpenAIError",
    ()=>OpenAIError,
    "PermissionDeniedError",
    ()=>PermissionDeniedError,
    "RateLimitError",
    ()=>RateLimitError,
    "SubjectTokenProviderError",
    ()=>SubjectTokenProviderError,
    "UnprocessableEntityError",
    ()=>UnprocessableEntityError
]);
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/errors.mjs [app-route] (ecmascript)");
;
class OpenAIError extends Error {
}
class APIError extends OpenAIError {
    constructor(status, error, message, headers){
        super(`${APIError.makeMessage(status, error, message)}`);
        this.status = status;
        this.headers = headers;
        this.requestID = headers?.get('x-request-id');
        this.error = error;
        const data = error;
        this.code = data?.['code'];
        this.param = data?.['param'];
        this.type = data?.['type'];
    }
    static makeMessage(status, error, message) {
        const msg = error?.message ? typeof error.message === 'string' ? error.message : JSON.stringify(error.message) : error ? JSON.stringify(error) : message;
        if (status && msg) {
            return `${status} ${msg}`;
        }
        if (status) {
            return `${status} status code (no body)`;
        }
        if (msg) {
            return msg;
        }
        return '(no status code or body)';
    }
    static generate(status, errorResponse, message, headers) {
        if (!status || !headers) {
            return new APIConnectionError({
                message,
                cause: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["castToError"])(errorResponse)
            });
        }
        const error = errorResponse?.['error'];
        if (status === 400) {
            return new BadRequestError(status, error, message, headers);
        }
        if (status === 401) {
            return new AuthenticationError(status, error, message, headers);
        }
        if (status === 403) {
            return new PermissionDeniedError(status, error, message, headers);
        }
        if (status === 404) {
            return new NotFoundError(status, error, message, headers);
        }
        if (status === 409) {
            return new ConflictError(status, error, message, headers);
        }
        if (status === 422) {
            return new UnprocessableEntityError(status, error, message, headers);
        }
        if (status === 429) {
            return new RateLimitError(status, error, message, headers);
        }
        if (status >= 500) {
            return new InternalServerError(status, error, message, headers);
        }
        return new APIError(status, error, message, headers);
    }
}
class APIUserAbortError extends APIError {
    constructor({ message } = {}){
        super(undefined, undefined, message || 'Request was aborted.', undefined);
    }
}
class APIConnectionError extends APIError {
    constructor({ message, cause }){
        super(undefined, undefined, message || 'Connection error.', undefined);
        // in some environments the 'cause' property is already declared
        // @ts-ignore
        if (cause) this.cause = cause;
    }
}
class APIConnectionTimeoutError extends APIConnectionError {
    constructor({ message } = {}){
        super({
            message: message ?? 'Request timed out.'
        });
    }
}
class BadRequestError extends APIError {
}
class AuthenticationError extends APIError {
}
class PermissionDeniedError extends APIError {
}
class NotFoundError extends APIError {
}
class ConflictError extends APIError {
}
class UnprocessableEntityError extends APIError {
}
class RateLimitError extends APIError {
}
class InternalServerError extends APIError {
}
class LengthFinishReasonError extends OpenAIError {
    constructor(){
        super(`Could not parse response content as the length limit was reached`);
    }
}
class ContentFilterFinishReasonError extends OpenAIError {
    constructor(){
        super(`Could not parse response content as the request was rejected by the content filter`);
    }
}
class InvalidWebhookSignatureError extends Error {
    constructor(message){
        super(message);
    }
}
class OAuthError extends APIError {
    constructor(status, error, headers){
        let finalMessage = 'OAuth2 authentication error';
        let error_code = undefined;
        if (error && typeof error === 'object') {
            const errorData = error;
            error_code = errorData['error'];
            const description = errorData['error_description'];
            if (description && typeof description === 'string') {
                finalMessage = description;
            } else if (error_code) {
                finalMessage = error_code;
            }
        }
        super(status, error, finalMessage, headers);
        this.error_code = error_code;
    }
}
class SubjectTokenProviderError extends OpenAIError {
    constructor(message, provider, cause){
        super(message);
        this.provider = provider;
        this.cause = cause;
    }
} //# sourceMappingURL=error.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/streaming.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Stream",
    ()=>Stream,
    "_iterSSEMessages",
    ()=>_iterSSEMessages
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/tslib.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/error.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$shims$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/shims.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$decoders$2f$line$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/decoders/line.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/errors.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$bytes$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/utils/bytes.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/utils/log.mjs [app-route] (ecmascript)");
var _Stream_client;
;
;
;
;
;
;
;
;
;
class Stream {
    constructor(iterator, controller, client){
        this.iterator = iterator;
        _Stream_client.set(this, void 0);
        this.controller = controller;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _Stream_client, client, "f");
    }
    static fromSSEResponse(response, controller, client, synthesizeEventData) {
        let consumed = false;
        const logger = client ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(client) : console;
        async function* iterator() {
            if (consumed) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]('Cannot iterate over a consumed stream, use `.tee()` to split the stream.');
            }
            consumed = true;
            let done = false;
            try {
                for await (const sse of _iterSSEMessages(response, controller)){
                    if (done) continue;
                    if (sse.data.startsWith('[DONE]')) {
                        done = true;
                        continue;
                    }
                    if (sse.event === null || !sse.event.startsWith('thread.')) {
                        let data;
                        try {
                            data = JSON.parse(sse.data);
                        } catch (e) {
                            logger.error(`Could not parse message into JSON:`, sse.data);
                            logger.error(`From chunk:`, sse.raw);
                            throw e;
                        }
                        if (data && data.error) {
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"](undefined, data.error, undefined, response.headers);
                        }
                        yield synthesizeEventData ? {
                            event: sse.event,
                            data
                        } : data;
                    } else {
                        let data;
                        try {
                            data = JSON.parse(sse.data);
                        } catch (e) {
                            console.error(`Could not parse message into JSON:`, sse.data);
                            console.error(`From chunk:`, sse.raw);
                            throw e;
                        }
                        // TODO: Is this where the error should be thrown?
                        if (sse.event == 'error') {
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"](undefined, data.error, data.message, undefined);
                        }
                        yield {
                            event: sse.event,
                            data: data
                        };
                    }
                }
                done = true;
            } catch (e) {
                // If the user calls `stream.controller.abort()`, we should exit without throwing.
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAbortError"])(e)) return;
                throw e;
            } finally{
                // If the user `break`s, abort the ongoing request.
                if (!done) controller.abort();
            }
        }
        return new Stream(iterator, controller, client);
    }
    /**
     * Generates a Stream from a newline-separated ReadableStream
     * where each item is a JSON value.
     */ static fromReadableStream(readableStream, controller, client) {
        let consumed = false;
        async function* iterLines() {
            const lineDecoder = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$decoders$2f$line$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LineDecoder"]();
            const reader = readableStream.getReader();
            let closed = false;
            let cancelPromise;
            const cancel = ()=>{
                cancelPromise ?? (cancelPromise = reader.cancel());
                cancelPromise.catch(()=>{});
            };
            controller.signal.addEventListener('abort', cancel, {
                once: true
            });
            try {
                if (controller.signal.aborted) {
                    cancel();
                    return;
                }
                while(true){
                    const { value: chunk, done } = await reader.read();
                    if (done) {
                        closed = true;
                        break;
                    }
                    if (controller.signal.aborted) return;
                    for (const line of lineDecoder.decode(chunk)){
                        if (controller.signal.aborted) return;
                        yield line;
                    }
                }
                if (controller.signal.aborted) return;
                for (const line of lineDecoder.flush()){
                    if (controller.signal.aborted) return;
                    yield line;
                }
            } finally{
                controller.signal.removeEventListener('abort', cancel);
                if (!closed) cancel();
                reader.releaseLock();
            }
        }
        async function* iterator() {
            if (consumed) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]('Cannot iterate over a consumed stream, use `.tee()` to split the stream.');
            }
            consumed = true;
            let done = false;
            try {
                for await (const line of iterLines()){
                    if (done) continue;
                    if (line) yield JSON.parse(line);
                }
                done = true;
            } catch (e) {
                // If the user calls `stream.controller.abort()`, we should exit without throwing.
                if (controller.signal.aborted || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAbortError"])(e)) return;
                throw e;
            } finally{
                // If the user `break`s, abort the ongoing request.
                if (!done) controller.abort();
            }
        }
        return new Stream(iterator, controller, client);
    }
    [(_Stream_client = new WeakMap(), Symbol.asyncIterator)]() {
        return this.iterator();
    }
    /**
     * Splits the stream into two streams which can be
     * independently read from at different speeds.
     */ tee() {
        const left = [];
        const right = [];
        const iterator = this.iterator();
        const teeIterator = (queue)=>{
            return {
                next: ()=>{
                    if (queue.length === 0) {
                        const result = iterator.next();
                        left.push(result);
                        right.push(result);
                    }
                    return queue.shift();
                }
            };
        };
        return [
            new Stream(()=>teeIterator(left), this.controller, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Stream_client, "f")),
            new Stream(()=>teeIterator(right), this.controller, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _Stream_client, "f"))
        ];
    }
    /**
     * Converts this stream to a newline-separated ReadableStream of
     * JSON stringified values in the stream
     * which can be turned back into a Stream with `Stream.fromReadableStream()`.
     */ toReadableStream() {
        const self = this;
        let iter;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$shims$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["makeReadableStream"])({
            async start () {
                iter = self[Symbol.asyncIterator]();
            },
            async pull (ctrl) {
                try {
                    const { value, done } = await iter.next();
                    if (done) return ctrl.close();
                    const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$bytes$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeUTF8"])(JSON.stringify(value) + '\n');
                    ctrl.enqueue(bytes);
                } catch (err) {
                    ctrl.error(err);
                }
            },
            async cancel () {
                await iter.return?.();
            }
        });
    }
}
async function* _iterSSEMessages(response, controller) {
    if (!response.body) {
        controller.abort();
        if (typeof globalThis.navigator !== 'undefined' && globalThis.navigator.product === 'ReactNative') {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api`);
        }
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`Attempted to iterate over a response with no body`);
    }
    const sseDecoder = new SSEDecoder();
    const lineDecoder = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$decoders$2f$line$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LineDecoder"]();
    const iter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$shims$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReadableStreamToAsyncIterable"])(response.body);
    for await (const sseChunk of iterSSEChunks(iter)){
        for (const line of lineDecoder.decode(sseChunk)){
            const sse = sseDecoder.decode(line);
            if (sse) yield sse;
        }
    }
    for (const line of lineDecoder.flush()){
        const sse = sseDecoder.decode(line);
        if (sse) yield sse;
    }
}
/**
 * Given an async iterable iterator, iterates over it and yields full
 * SSE chunks, i.e. yields when a double new-line is encountered.
 */ async function* iterSSEChunks(iterator) {
    let data = new Uint8Array();
    for await (const chunk of iterator){
        if (chunk == null) {
            continue;
        }
        const binaryChunk = chunk instanceof ArrayBuffer ? new Uint8Array(chunk) : typeof chunk === 'string' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$bytes$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeUTF8"])(chunk) : chunk;
        let newData = new Uint8Array(data.length + binaryChunk.length);
        newData.set(data);
        newData.set(binaryChunk, data.length);
        data = newData;
        let patternIndex;
        while((patternIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$decoders$2f$line$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findDoubleNewlineIndex"])(data)) !== -1){
            yield data.slice(0, patternIndex);
            data = data.slice(patternIndex);
        }
    }
    if (data.length > 0) {
        yield data;
    }
}
class SSEDecoder {
    constructor(){
        this.event = null;
        this.data = [];
        this.chunks = [];
    }
    decode(line) {
        if (line.endsWith('\r')) {
            line = line.substring(0, line.length - 1);
        }
        if (!line) {
            // empty line and we didn't previously encounter any messages
            if (!this.event && !this.data.length) return null;
            const sse = {
                event: this.event,
                data: this.data.join('\n'),
                raw: this.chunks
            };
            this.event = null;
            this.data = [];
            this.chunks = [];
            return sse;
        }
        this.chunks.push(line);
        if (line.startsWith(':')) {
            return null;
        }
        let [fieldname, _, value] = partition(line, ':');
        if (value.startsWith(' ')) {
            value = value.substring(1);
        }
        if (fieldname === 'event') {
            this.event = value;
        } else if (fieldname === 'data') {
            this.data.push(value);
        }
        return null;
    }
}
function partition(str, delimiter) {
    const index = str.indexOf(delimiter);
    if (index !== -1) {
        return [
            str.substring(0, index),
            delimiter,
            str.substring(index + delimiter.length)
        ];
    }
    return [
        str,
        '',
        ''
    ];
} //# sourceMappingURL=streaming.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/api-promise.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "APIPromise",
    ()=>APIPromise
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/tslib.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$parse$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/parse.mjs [app-route] (ecmascript)");
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var _APIPromise_client;
;
;
class APIPromise extends Promise {
    constructor(client, responsePromise, parseResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$parse$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultParseResponse"]){
        super((resolve)=>{
            // this is maybe a bit weird but this has to be a no-op to not implicitly
            // parse the response body; instead .then, .catch, .finally are overridden
            // to parse the response
            resolve(null);
        });
        this.responsePromise = responsePromise;
        this.parseResponse = parseResponse;
        _APIPromise_client.set(this, void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _APIPromise_client, client, "f");
    }
    _thenUnwrap(transform) {
        return new APIPromise((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _APIPromise_client, "f"), this.responsePromise, async (client, props)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$parse$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addRequestID"])(transform(await this.parseResponse(client, props), props), props.response));
    }
    /**
     * Gets the raw `Response` instance instead of parsing the response
     * data.
     *
     * If you want to parse the response body but still get the `Response`
     * instance, you can use {@link withResponse()}.
     *
     * 👋 Getting the wrong TypeScript type for `Response`?
     * Try setting `"moduleResolution": "NodeNext"` or add `"lib": ["DOM"]`
     * to your `tsconfig.json`.
     */ asResponse() {
        return this.responsePromise.then((p)=>p.response);
    }
    /**
     * Gets the parsed response data, the raw `Response` instance and the ID of the request,
     * returned via the X-Request-ID header which is useful for debugging requests and reporting
     * issues to OpenAI.
     *
     * If you just want to get the raw `Response` instance without parsing it,
     * you can use {@link asResponse()}.
     *
     * 👋 Getting the wrong TypeScript type for `Response`?
     * Try setting `"moduleResolution": "NodeNext"` or add `"lib": ["DOM"]`
     * to your `tsconfig.json`.
     */ async withResponse() {
        const [data, response] = await Promise.all([
            this.parse(),
            this.asResponse()
        ]);
        return {
            data,
            response,
            request_id: response.headers.get('x-request-id')
        };
    }
    parse() {
        if (!this.parsedPromise) {
            this.parsedPromise = this.responsePromise.then((data)=>this.parseResponse((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _APIPromise_client, "f"), data));
        }
        return this.parsedPromise;
    }
    then(onfulfilled, onrejected) {
        return this.parse().then(onfulfilled, onrejected);
    }
    catch(onrejected) {
        return this.parse().catch(onrejected);
    }
    finally(onfinally) {
        return this.parse().finally(onfinally);
    }
}
_APIPromise_client = new WeakMap(); //# sourceMappingURL=api-promise.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/pagination.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AbstractPage",
    ()=>AbstractPage,
    "ConversationCursorPage",
    ()=>ConversationCursorPage,
    "CursorPage",
    ()=>CursorPage,
    "NextCursorPage",
    ()=>NextCursorPage,
    "Page",
    ()=>Page,
    "PagePromise",
    ()=>PagePromise
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/tslib.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/error.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$parse$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/parse.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$api$2d$promise$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/api-promise.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/utils/values.mjs [app-route] (ecmascript)");
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var _AbstractPage_client;
;
;
;
;
;
class AbstractPage {
    constructor(client, response, body, options){
        _AbstractPage_client.set(this, void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _AbstractPage_client, client, "f");
        this.options = options;
        this.response = response;
        this.body = body;
    }
    hasNextPage() {
        const items = this.getPaginatedItems();
        if (!items.length) return false;
        return this.nextPageRequestOptions() != null;
    }
    async getNextPage() {
        const nextOptions = this.nextPageRequestOptions();
        if (!nextOptions) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]('No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.');
        }
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _AbstractPage_client, "f").requestAPIList(this.constructor, nextOptions);
    }
    async *iterPages() {
        let page = this;
        yield page;
        while(page.hasNextPage()){
            page = await page.getNextPage();
            yield page;
        }
    }
    async *[(_AbstractPage_client = new WeakMap(), Symbol.asyncIterator)]() {
        for await (const page of this.iterPages()){
            for (const item of page.getPaginatedItems()){
                yield item;
            }
        }
    }
}
class PagePromise extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$api$2d$promise$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIPromise"] {
    constructor(client, request, Page){
        super(client, request, async (client, props)=>new Page(client, props.response, await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$parse$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultParseResponse"])(client, props), props.options));
    }
    /**
     * Allow auto-paginating iteration on an unawaited list call, eg:
     *
     *    for await (const item of client.items.list()) {
     *      console.log(item)
     *    }
     */ async *[Symbol.asyncIterator]() {
        const page = await this;
        for await (const item of page){
            yield item;
        }
    }
}
class Page extends AbstractPage {
    constructor(client, response, body, options){
        super(client, response, body, options);
        this.data = body.data || [];
        this.object = body.object;
    }
    getPaginatedItems() {
        return this.data ?? [];
    }
    nextPageRequestOptions() {
        return null;
    }
}
class CursorPage extends AbstractPage {
    constructor(client, response, body, options){
        super(client, response, body, options);
        this.data = body.data || [];
        this.has_more = body.has_more || false;
    }
    getPaginatedItems() {
        return this.data ?? [];
    }
    hasNextPage() {
        if (this.has_more === false) {
            return false;
        }
        return super.hasNextPage();
    }
    nextPageRequestOptions() {
        const data = this.getPaginatedItems();
        const id = data[data.length - 1]?.id;
        if (!id) {
            return null;
        }
        return {
            ...this.options,
            query: {
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["maybeObj"])(this.options.query),
                after: id
            }
        };
    }
}
class ConversationCursorPage extends AbstractPage {
    constructor(client, response, body, options){
        super(client, response, body, options);
        this.data = body.data || [];
        this.has_more = body.has_more || false;
        this.last_id = body.last_id || '';
    }
    getPaginatedItems() {
        return this.data ?? [];
    }
    hasNextPage() {
        if (this.has_more === false) {
            return false;
        }
        return super.hasNextPage();
    }
    nextPageRequestOptions() {
        const cursor = this.last_id;
        if (!cursor) {
            return null;
        }
        return {
            ...this.options,
            query: {
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["maybeObj"])(this.options.query),
                after: cursor
            }
        };
    }
}
class NextCursorPage extends AbstractPage {
    constructor(client, response, body, options){
        super(client, response, body, options);
        this.data = body.data || [];
        this.has_more = body.has_more || false;
        this.next = body.next || null;
    }
    getPaginatedItems() {
        return this.data ?? [];
    }
    hasNextPage() {
        if (this.has_more === false) {
            return false;
        }
        return super.hasNextPage();
    }
    nextPageRequestOptions() {
        const cursor = this.next;
        if (!cursor) {
            return null;
        }
        return {
            ...this.options,
            query: {
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["maybeObj"])(this.options.query),
                after: cursor
            }
        };
    }
} //# sourceMappingURL=pagination.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/uploads.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$uploads$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/uploads.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$to$2d$file$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/to-file.mjs [app-route] (ecmascript)"); //# sourceMappingURL=uploads.mjs.map
;
;
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/resource.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s([
    "APIResource",
    ()=>APIResource
]);
class APIResource {
    constructor(client){
        this._client = client;
    }
} //# sourceMappingURL=resource.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/version.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VERSION",
    ()=>VERSION
]);
const VERSION = '6.49.0'; // x-release-please-version
 //# sourceMappingURL=version.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/auth/workload-identity-auth.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WorkloadIdentityAuth",
    ()=>WorkloadIdentityAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$shims$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/shims.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/error.mjs [app-route] (ecmascript)");
;
;
const SUBJECT_TOKEN_TYPES = {
    jwt: 'urn:ietf:params:oauth:token-type:jwt',
    id: 'urn:ietf:params:oauth:token-type:id_token'
};
const TOKEN_EXCHANGE_GRANT_TYPE = 'urn:ietf:params:oauth:grant-type:token-exchange';
class WorkloadIdentityAuth {
    constructor(config, fetch){
        this.cachedToken = null;
        this.refreshPromise = null;
        this.tokenExchangeUrl = 'https://auth.openai.com/oauth/token';
        this.config = config;
        this.fetch = fetch ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$shims$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultFetch"]();
    }
    async getToken() {
        if (!this.cachedToken || this.isTokenExpired(this.cachedToken)) {
            if (this.refreshPromise) {
                return await this.refreshPromise;
            }
            this.refreshPromise = this.refreshToken();
            try {
                const token = await this.refreshPromise;
                return token;
            } finally{
                this.refreshPromise = null;
            }
        }
        if (this.needsRefresh(this.cachedToken) && !this.refreshPromise) {
            this.refreshPromise = this.refreshToken().finally(()=>{
                this.refreshPromise = null;
            });
        }
        return this.cachedToken.token;
    }
    async refreshToken() {
        const subjectToken = await this.config.provider.getToken();
        const body = {
            grant_type: TOKEN_EXCHANGE_GRANT_TYPE,
            subject_token: subjectToken,
            subject_token_type: SUBJECT_TOKEN_TYPES[this.config.provider.tokenType],
            identity_provider_id: this.config.identityProviderId,
            service_account_id: this.config.serviceAccountId
        };
        if (this.config.clientId) {
            body['client_id'] = this.config.clientId;
        }
        const response = await this.fetch(this.tokenExchangeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            const errorText = await response.text();
            let body = undefined;
            try {
                body = JSON.parse(errorText);
            } catch  {}
            if (response.status === 400 || response.status === 401 || response.status === 403) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OAuthError"](response.status, body, response.headers);
            }
            throw __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"].generate(response.status, body, `Token exchange failed with status ${response.status}`, response.headers);
        }
        const tokenResponse = await response.json();
        if (typeof tokenResponse !== 'object' || tokenResponse === null || !('access_token' in tokenResponse) || typeof tokenResponse.access_token !== 'string' || tokenResponse.access_token.trim().length === 0) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]("Token exchange response missing 'access_token' field");
        }
        const accessToken = tokenResponse.access_token;
        const expiresIn = tokenResponse.expires_in ?? 3600;
        const expiresAt = Date.now() + expiresIn * 1000;
        this.cachedToken = {
            token: accessToken,
            expiresAt
        };
        return accessToken;
    }
    isTokenExpired(cachedToken) {
        return Date.now() >= cachedToken.expiresAt;
    }
    needsRefresh(cachedToken) {
        const bufferSeconds = this.config.refreshBufferSeconds ?? 1200;
        const bufferMs = bufferSeconds * 1000;
        return Date.now() >= cachedToken.expiresAt - bufferMs;
    }
    invalidateToken() {
        this.cachedToken = null;
        this.refreshPromise = null;
    }
} //# sourceMappingURL=workload-identity-auth.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/error.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
/** @deprecated Import from ./core/error instead */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/error.mjs [app-route] (ecmascript)"); //# sourceMappingURL=error.mjs.map
;
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/streaming.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
/** @deprecated Import from ./core/streaming instead */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$streaming$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/streaming.mjs [app-route] (ecmascript)"); //# sourceMappingURL=streaming.mjs.map
;
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/client.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OpenAI",
    ()=>OpenAI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/tslib.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$uuid$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/utils/uuid.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/utils/values.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$sleep$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/utils/sleep.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/errors.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$detect$2d$platform$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/detect-platform.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$shims$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/shims.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$request$2d$options$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/request-options.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$query$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/utils/query.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$version$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/version.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/error.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$pagination$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/pagination.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$auth$2f$workload$2d$identity$2d$auth$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/auth/workload-identity-auth.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$uploads$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/uploads.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$to$2d$file$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/to-file.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$uploads$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/uploads.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$completions$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/completions.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$chat$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/chat/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$embeddings$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/embeddings.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$files$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/files.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$images$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/images.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$audio$2f$audio$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/audio/audio.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$moderations$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/moderations.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$models$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/models.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$fine$2d$tuning$2f$fine$2d$tuning$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/fine-tuning/fine-tuning.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$graders$2f$graders$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/graders/graders.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$vector$2d$stores$2f$vector$2d$stores$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/vector-stores/vector-stores.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$webhooks$2f$webhooks$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/webhooks/webhooks.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$beta$2f$beta$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/beta/beta.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$batches$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/batches.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$uploads$2f$uploads$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/uploads/uploads.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$admin$2f$admin$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/admin/admin.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$responses$2f$responses$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/responses/responses.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$realtime$2f$realtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/realtime/realtime.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$conversations$2f$conversations$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/conversations/conversations.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$evals$2f$evals$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/evals/evals.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$containers$2f$containers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/containers/containers.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$skills$2f$skills$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/skills/skills.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$videos$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/videos.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$api$2d$promise$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/api-promise.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$chat$2f$chat$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/chat/chat.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$headers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/headers.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$provider$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/provider.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/utils/env.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/utils/log.mjs [app-route] (ecmascript)");
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var _OpenAI_instances, _a, _OpenAI_encoder, _OpenAI_baseURLOverridden;
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
const WORKLOAD_IDENTITY_API_KEY_PLACEHOLDER = 'workload-identity-auth';
class OpenAI {
    /**
     * API Client for interfacing with the OpenAI API.
     *
     * @param {string | null | undefined} [opts.apiKey=process.env['OPENAI_API_KEY'] ?? null]
     * @param {string | null | undefined} [opts.adminAPIKey=process.env['OPENAI_ADMIN_KEY'] ?? null]
     * @param {string | null | undefined} [opts.organization=process.env['OPENAI_ORG_ID'] ?? null]
     * @param {string | null | undefined} [opts.project=process.env['OPENAI_PROJECT_ID'] ?? null]
     * @param {string | null | undefined} [opts.webhookSecret=process.env['OPENAI_WEBHOOK_SECRET'] ?? null]
     * @param {string} [opts.baseURL=process.env['OPENAI_BASE_URL'] ?? https://api.openai.com/v1] - Override the default base URL for the API.
     * @param {Provider} [opts.provider] - Configure a third-party API provider. Mutually exclusive with top-level authentication and base URL options.
     * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
     * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
     * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
     * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
     * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
     * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
     * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
     */ constructor(clientOptions = {}){
        _OpenAI_instances.add(this);
        _OpenAI_encoder.set(this, void 0);
        /**
         * Given a prompt, the model will return one or more predicted completions, and can also return the probabilities of alternative tokens at each position.
         */ this.completions = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$completions$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Completions"](this);
        this.chat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$chat$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Chat"](this);
        /**
         * Get a vector representation of a given input that can be easily consumed by machine learning models and algorithms.
         */ this.embeddings = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$embeddings$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Embeddings"](this);
        /**
         * Files are used to upload documents that can be used with features like Assistants and Fine-tuning.
         */ this.files = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$files$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Files"](this);
        /**
         * Given a prompt and/or an input image, the model will generate a new image.
         */ this.images = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$images$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Images"](this);
        this.audio = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$audio$2f$audio$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Audio"](this);
        /**
         * Given text and/or image inputs, classifies if those inputs are potentially harmful.
         */ this.moderations = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$moderations$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Moderations"](this);
        /**
         * List and describe the various models available in the API.
         */ this.models = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$models$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Models"](this);
        this.fineTuning = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$fine$2d$tuning$2f$fine$2d$tuning$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FineTuning"](this);
        this.graders = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$graders$2f$graders$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Graders"](this);
        this.vectorStores = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$vector$2d$stores$2f$vector$2d$stores$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VectorStores"](this);
        this.webhooks = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$webhooks$2f$webhooks$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Webhooks"](this);
        this.beta = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$beta$2f$beta$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Beta"](this);
        /**
         * Create large batches of API requests to run asynchronously.
         */ this.batches = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$batches$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Batches"](this);
        /**
         * Use Uploads to upload large files in multiple parts.
         */ this.uploads = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$uploads$2f$uploads$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Uploads"](this);
        this.admin = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$admin$2f$admin$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Admin"](this);
        this.responses = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$responses$2f$responses$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Responses"](this);
        this.realtime = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$realtime$2f$realtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Realtime"](this);
        /**
         * Manage conversations and conversation items.
         */ this.conversations = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$conversations$2f$conversations$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Conversations"](this);
        /**
         * Manage and run evals in the OpenAI platform.
         */ this.evals = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$evals$2f$evals$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Evals"](this);
        this.containers = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$containers$2f$containers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Containers"](this);
        this.skills = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$skills$2f$skills$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Skills"](this);
        this.videos = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$videos$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Videos"](this);
        const provider = clientOptions.provider;
        if (provider) {
            const conflictingOptions = [
                'apiKey',
                'adminAPIKey',
                'workloadIdentity',
                'baseURL'
            ].filter((key)=>clientOptions[key] != null);
            if (conflictingOptions.length) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`The \`provider\` option cannot be used with ${conflictingOptions.map((key)=>`\`${key}\``).join(', ')}. Configure authentication and the base URL through the provider instead.`);
            }
        }
        const { baseURL = provider ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readEnv"])('OPENAI_BASE_URL'), apiKey = provider ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readEnv"])('OPENAI_API_KEY') ?? null, adminAPIKey = provider ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readEnv"])('OPENAI_ADMIN_KEY') ?? null, organization = provider ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readEnv"])('OPENAI_ORG_ID') ?? null, project = provider ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readEnv"])('OPENAI_PROJECT_ID') ?? null, webhookSecret = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readEnv"])('OPENAI_WEBHOOK_SECRET') ?? null, workloadIdentity, ...opts } = clientOptions;
        const providerRuntime = provider ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$provider$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["configureProvider"])(provider) : undefined;
        const options = {
            apiKey,
            adminAPIKey,
            organization,
            project,
            webhookSecret,
            workloadIdentity,
            provider,
            ...opts,
            baseURL: providerRuntime?.baseURL ?? (baseURL || `https://api.openai.com/v1`)
        };
        if (apiKey && workloadIdentity) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]('The `apiKey` and `workloadIdentity` options are mutually exclusive');
        }
        if (!providerRuntime && !apiKey && !adminAPIKey && !workloadIdentity) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]('Missing credentials. Please pass an `apiKey`, `workloadIdentity`, `adminAPIKey`, or set the `OPENAI_API_KEY` or `OPENAI_ADMIN_KEY` environment variable.');
        }
        if (!options.dangerouslyAllowBrowser && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$detect$2d$platform$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isRunningInBrowser"])()) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]("It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`, e.g.,\n\nnew OpenAI({ apiKey, dangerouslyAllowBrowser: true });\n\nhttps://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety\n");
        }
        this.baseURL = options.baseURL;
        this.timeout = options.timeout ?? _a.DEFAULT_TIMEOUT /* 10 minutes */ ;
        this.logger = options.logger ?? console;
        const defaultLogLevel = 'warn';
        // Set default logLevel early so that we can log a warning in parseLogLevel.
        this.logLevel = defaultLogLevel;
        this.logLevel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseLogLevel"])(options.logLevel, 'ClientOptions.logLevel', this) ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseLogLevel"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readEnv"])('OPENAI_LOG'), "process.env['OPENAI_LOG']", this) ?? defaultLogLevel;
        this.fetchOptions = options.fetchOptions;
        this.maxRetries = options.maxRetries ?? 2;
        this.fetch = options.fetch ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$shims$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultFetch"]();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldSet"])(this, _OpenAI_encoder, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$request$2d$options$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FallbackEncoder"], "f");
        const customHeadersEnv = provider ? undefined : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readEnv"])('OPENAI_CUSTOM_HEADERS');
        if (customHeadersEnv) {
            const parsed = {};
            for (const line of customHeadersEnv.split('\n')){
                const colon = line.indexOf(':');
                if (colon >= 0) {
                    parsed[line.substring(0, colon).trim()] = line.substring(colon + 1).trim();
                }
            }
            options.defaultHeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$headers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildHeaders"])([
                parsed,
                options.defaultHeaders
            ]);
        }
        this._options = options;
        this._provider = providerRuntime;
        if (workloadIdentity) {
            this._workloadIdentityAuth = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$auth$2f$workload$2d$identity$2d$auth$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WorkloadIdentityAuth"](workloadIdentity, this.fetch);
        }
        this.apiKey = typeof apiKey === 'string' ? apiKey : null;
        this.adminAPIKey = adminAPIKey;
        this.organization = organization;
        this.project = project;
        this.webhookSecret = webhookSecret;
    }
    /**
     * Create a new client instance re-using the same options given to the current client with optional overriding.
     */ withOptions(options) {
        const inheritedProvider = this._options.provider;
        const provider = options.provider ?? inheritedProvider;
        const inheritedOptions = {
            ...this._options,
            baseURL: this.baseURL,
            maxRetries: this.maxRetries,
            timeout: this.timeout,
            logger: this.logger,
            logLevel: this.logLevel,
            fetch: this.fetch,
            fetchOptions: this.fetchOptions,
            apiKey: this._options.apiKey,
            adminAPIKey: this.adminAPIKey,
            workloadIdentity: this._options.workloadIdentity,
            organization: this.organization,
            project: this.project,
            webhookSecret: this.webhookSecret
        };
        if (provider) {
            delete inheritedOptions.apiKey;
            delete inheritedOptions.adminAPIKey;
            delete inheritedOptions.workloadIdentity;
            delete inheritedOptions.baseURL;
            if (provider !== inheritedProvider) {
                delete inheritedOptions.organization;
                delete inheritedOptions.project;
                delete inheritedOptions.defaultHeaders;
            }
        }
        const client = new this.constructor({
            ...inheritedOptions,
            ...options,
            provider
        });
        return client;
    }
    defaultQuery() {
        return this._options.defaultQuery;
    }
    validateHeaders({ values, nulls }, schemes = {
        bearerAuth: true,
        adminAPIKeyAuth: true
    }) {
        if (values.get('authorization') || values.get('api-key')) {
            return;
        }
        if (nulls.has('authorization') || nulls.has('api-key')) {
            return;
        }
        if (this._workloadIdentityAuth && schemes.bearerAuth) {
            return;
        }
        throw new Error('Could not resolve authentication method. Expected either apiKey or adminAPIKey to be set. Or for one of the "Authorization" or "api-key" headers to be explicitly omitted');
    }
    async authHeaders(opts, schemes = {
        bearerAuth: true,
        adminAPIKeyAuth: true
    }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$headers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildHeaders"])([
            schemes.bearerAuth ? await this.bearerAuth(opts) : null,
            schemes.adminAPIKeyAuth ? await this.adminAPIKeyAuth(opts) : null
        ]);
    }
    async bearerAuth(opts) {
        if (this._workloadIdentityAuth) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$headers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildHeaders"])([
                {
                    Authorization: `Bearer ${await this._workloadIdentityAuth.getToken()}`
                }
            ]);
        }
        if (this.apiKey == null) {
            return undefined;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$headers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildHeaders"])([
            {
                Authorization: `Bearer ${this.apiKey}`
            }
        ]);
    }
    async adminAPIKeyAuth(opts) {
        if (this.adminAPIKey == null) {
            return undefined;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$headers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildHeaders"])([
            {
                Authorization: `Bearer ${this.adminAPIKey}`
            }
        ]);
    }
    stringifyQuery(query) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$query$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringifyQuery"])(query);
    }
    getUserAgent() {
        return `${this.constructor.name}/JS ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$version$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VERSION"]}`;
    }
    defaultIdempotencyKey() {
        return `stainless-node-retry-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$uuid$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uuid4"])()}`;
    }
    makeStatusError(status, error, message, headers) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"].generate(status, error, message, headers);
    }
    async _callApiKey() {
        if (this._provider) return false;
        const apiKey = this._options.apiKey;
        if (typeof apiKey !== 'function') return false;
        let token;
        try {
            token = await apiKey();
        } catch (err) {
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]) throw err;
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`Failed to get token from 'apiKey' function: ${err.message}`, // @ts-ignore
            {
                cause: err
            });
        }
        if (typeof token !== 'string' || !token) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"](`Expected 'apiKey' function argument to return a string but it returned ${token}`);
        }
        this.apiKey = token;
        return true;
    }
    buildURL(path, query, defaultBaseURL) {
        const baseURL = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _OpenAI_instances, "m", _OpenAI_baseURLOverridden).call(this) && defaultBaseURL || this.baseURL;
        const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAbsoluteURL"])(path) ? new URL(path) : new URL(baseURL + (baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path));
        const defaultQuery = this.defaultQuery();
        const pathQuery = Object.fromEntries(url.searchParams);
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isEmptyObj"])(defaultQuery) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isEmptyObj"])(pathQuery)) {
            query = {
                ...pathQuery,
                ...defaultQuery,
                ...query
            };
        }
        if (typeof query === 'object' && query && !Array.isArray(query)) {
            url.search = this.stringifyQuery(query);
        }
        return url.toString();
    }
    /**
     * Used as a callback for mutating the given `FinalRequestOptions` object.
     */ async prepareOptions(options) {
        if (this._provider) return;
        const security = options.__security ?? {
            bearerAuth: true
        };
        if (security.bearerAuth) {
            await this._callApiKey();
        }
    }
    /**
     * Used as a callback for mutating the given `RequestInit` object.
     *
     * This is useful for cases where you want to add certain headers based off of
     * the request properties, e.g. `method` or `url`.
     */ async prepareRequest(request, { url, options }) {}
    get(path, opts) {
        return this.methodRequest('get', path, opts);
    }
    post(path, opts) {
        return this.methodRequest('post', path, opts);
    }
    patch(path, opts) {
        return this.methodRequest('patch', path, opts);
    }
    put(path, opts) {
        return this.methodRequest('put', path, opts);
    }
    delete(path, opts) {
        return this.methodRequest('delete', path, opts);
    }
    methodRequest(method, path, opts) {
        return this.request(Promise.resolve(opts).then((opts)=>{
            return {
                method,
                path,
                ...opts
            };
        }));
    }
    request(options, remainingRetries = null) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$api$2d$promise$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIPromise"](this, this.makeRequest(options, remainingRetries, undefined));
    }
    async makeRequest(optionsInput, retriesRemaining, retryOfRequestLogID) {
        const options = await optionsInput;
        const maxRetries = options.maxRetries ?? this.maxRetries;
        if (retriesRemaining == null) {
            retriesRemaining = maxRetries;
        }
        await this.prepareOptions(options);
        const { req, url, timeout } = await this.buildRequest(options, {
            retryCount: maxRetries - retriesRemaining
        });
        const hasStreamingBody = options.__metadata?.['hasStreamingBody'] === true;
        await this.prepareRequest(req, {
            url,
            options
        });
        await this._provider?.prepareRequest?.(req, {
            url,
            options
        });
        /** Not an API request ID, just for correlating local log entries. */ const requestLogID = 'log_' + (Math.random() * (1 << 24) | 0).toString(16).padStart(6, '0');
        const retryLogStr = retryOfRequestLogID === undefined ? '' : `, retryOf: ${retryOfRequestLogID}`;
        const startTime = Date.now();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).debug(`[${requestLogID}] sending request`, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatRequestDetails"])({
            retryOfRequestLogID,
            method: options.method,
            url,
            options,
            headers: req.headers
        }));
        if (options.signal?.aborted) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIUserAbortError"]();
        }
        const security = options.__security ?? {
            bearerAuth: true
        };
        const controller = new AbortController();
        const response = await this.fetchWithAuth(url, req, timeout, controller, security).catch(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["castToError"]);
        const headersTime = Date.now();
        if (response instanceof globalThis.Error) {
            const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
            if (options.signal?.aborted) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIUserAbortError"]();
            }
            // detect native connection timeout errors
            // deno throws "TypeError: error sending request for url (https://example/): client error (Connect): tcp connect error: Operation timed out (os error 60): Operation timed out (os error 60)"
            // undici throws "TypeError: fetch failed" with cause "ConnectTimeoutError: Connect Timeout Error (attempted address: example:443, timeout: 1ms)"
            // others do not provide enough information to distinguish timeouts from other connection errors
            const isTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAbortError"])(response) || /timed? ?out/i.test(String(response) + ('cause' in response ? String(response.cause) : ''));
            if (retriesRemaining && !hasStreamingBody) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).info(`[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - ${retryMessage}`);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).debug(`[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (${retryMessage})`, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatRequestDetails"])({
                    retryOfRequestLogID,
                    url,
                    durationMs: headersTime - startTime,
                    message: response.message
                }));
                return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID);
            }
            const terminalMessage = hasStreamingBody ? 'error; streaming body cannot be retried' : 'error; no more retries left';
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).info(`[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - ${terminalMessage}`);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).debug(`[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (${terminalMessage})`, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatRequestDetails"])({
                retryOfRequestLogID,
                url,
                durationMs: headersTime - startTime,
                message: response.message
            }));
            if (response instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OAuthError"] || response instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SubjectTokenProviderError"]) {
                throw response;
            }
            if (isTimeout) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIConnectionTimeoutError"]();
            }
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIConnectionError"]({
                message: getConnectionErrorMessage(response),
                cause: response
            });
        }
        const specialHeaders = [
            ...response.headers.entries()
        ].filter(([name])=>name === 'x-request-id').map(([name, value])=>', ' + name + ': ' + JSON.stringify(value)).join('');
        const responseInfo = `[${requestLogID}${retryLogStr}${specialHeaders}] ${req.method} ${url} ${response.ok ? 'succeeded' : 'failed'} with status ${response.status} in ${headersTime - startTime}ms`;
        if (!response.ok) {
            if (response.status === 401 && this._workloadIdentityAuth && security.bearerAuth && !options.__metadata?.['hasStreamingBody'] && !options.__metadata?.['workloadIdentityTokenRefreshed']) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$shims$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CancelReadableStream"](response.body);
                this._workloadIdentityAuth.invalidateToken();
                return this.makeRequest({
                    ...options,
                    __metadata: {
                        ...options.__metadata,
                        workloadIdentityTokenRefreshed: true
                    }
                }, retriesRemaining, retryOfRequestLogID ?? requestLogID);
            }
            const shouldRetry = await this.shouldRetry(response);
            if (retriesRemaining && shouldRetry && !hasStreamingBody) {
                const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
                // We don't need the body of this response.
                await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$shims$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CancelReadableStream"](response.body);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).info(`${responseInfo} - ${retryMessage}`);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).debug(`[${requestLogID}] response error (${retryMessage})`, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatRequestDetails"])({
                    retryOfRequestLogID,
                    url: response.url,
                    status: response.status,
                    headers: response.headers,
                    durationMs: headersTime - startTime
                }));
                return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID, response.headers);
            }
            const retryMessage = shouldRetry ? hasStreamingBody ? `error; streaming body cannot be retried` : `error; no more retries left` : `error; not retryable`;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).info(`${responseInfo} - ${retryMessage}`);
            const errText = await response.text().catch((err)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["castToError"])(err).message);
            const errJSON = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeJSON"])(errText);
            const errMessage = errJSON ? undefined : errText;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).debug(`[${requestLogID}] response error (${retryMessage})`, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatRequestDetails"])({
                retryOfRequestLogID,
                url: response.url,
                status: response.status,
                headers: response.headers,
                message: errMessage,
                durationMs: Date.now() - startTime
            }));
            const err = this.makeStatusError(response.status, errJSON, errMessage, response.headers);
            throw err;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).info(responseInfo);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loggerFor"])(this).debug(`[${requestLogID}] response start`, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$log$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatRequestDetails"])({
            retryOfRequestLogID,
            url: response.url,
            status: response.status,
            headers: response.headers,
            durationMs: headersTime - startTime
        }));
        return {
            response,
            options,
            controller,
            requestLogID,
            retryOfRequestLogID,
            startTime
        };
    }
    getAPIList(path, Page, opts) {
        return this.requestAPIList(Page, opts && 'then' in opts ? opts.then((opts)=>({
                method: 'get',
                path,
                ...opts
            })) : {
            method: 'get',
            path,
            ...opts
        });
    }
    requestAPIList(Page, options) {
        const request = this.makeRequest(options, null, undefined);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$pagination$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PagePromise"](this, request, Page);
    }
    async fetchWithAuth(url, init, timeout, controller, schemes = {
        bearerAuth: true,
        adminAPIKeyAuth: true
    }) {
        if (this._workloadIdentityAuth && schemes.bearerAuth) {
            const headers = init.headers;
            const authHeader = headers.get('Authorization');
            if (!authHeader || authHeader === `Bearer ${WORKLOAD_IDENTITY_API_KEY_PLACEHOLDER}`) {
                const token = await this._workloadIdentityAuth.getToken();
                headers.set('Authorization', `Bearer ${token}`);
            }
        }
        const response = await this.fetchWithTimeout(url, init, timeout, controller);
        return response;
    }
    async fetchWithTimeout(url, init, ms, controller) {
        const { signal, method, ...options } = init || {};
        const abort = this._makeAbort(controller);
        if (signal) signal.addEventListener('abort', abort, {
            once: true
        });
        const timeout = setTimeout(abort, ms);
        const isReadableBody = globalThis.ReadableStream && options.body instanceof globalThis.ReadableStream || typeof options.body === 'object' && options.body !== null && Symbol.asyncIterator in options.body;
        const fetchOptions = {
            signal: controller.signal,
            ...isReadableBody ? {
                duplex: 'half'
            } : {},
            method: 'GET',
            ...options
        };
        if (method) {
            // Custom methods like 'patch' need to be uppercased
            // See https://github.com/nodejs/undici/issues/2294
            fetchOptions.method = method.toUpperCase();
        }
        try {
            // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
            return await this.fetch.call(undefined, url, fetchOptions);
        } finally{
            clearTimeout(timeout);
        }
    }
    async shouldRetry(response) {
        // Note this is not a standard header.
        const shouldRetryHeader = response.headers.get('x-should-retry');
        // If the server explicitly says whether or not to retry, obey.
        if (shouldRetryHeader === 'true') return true;
        if (shouldRetryHeader === 'false') return false;
        // Retry on request timeouts.
        if (response.status === 408) return true;
        // Retry on lock timeouts.
        if (response.status === 409) return true;
        // Retry on rate limits.
        if (response.status === 429) return true;
        // Retry internal errors.
        if (response.status >= 500) return true;
        return false;
    }
    async retryRequest(options, retriesRemaining, requestLogID, responseHeaders) {
        let timeoutMillis;
        // Note the `retry-after-ms` header may not be standard, but is a good idea and we'd like proactive support for it.
        const retryAfterMillisHeader = responseHeaders?.get('retry-after-ms');
        if (retryAfterMillisHeader) {
            const timeoutMs = parseFloat(retryAfterMillisHeader);
            if (!Number.isNaN(timeoutMs)) {
                timeoutMillis = timeoutMs;
            }
        }
        // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
        const retryAfterHeader = responseHeaders?.get('retry-after');
        if (retryAfterHeader && !timeoutMillis) {
            const timeoutSeconds = parseFloat(retryAfterHeader);
            if (!Number.isNaN(timeoutSeconds)) {
                timeoutMillis = timeoutSeconds * 1000;
            } else {
                timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
            }
        }
        // If the API asks us to wait a certain amount of time, just do what it
        // says, but otherwise calculate a default
        if (timeoutMillis === undefined) {
            const maxRetries = options.maxRetries ?? this.maxRetries;
            timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$sleep$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sleep"])(timeoutMillis);
        return this.makeRequest(options, retriesRemaining - 1, requestLogID);
    }
    calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries) {
        const initialRetryDelay = 0.5;
        const maxRetryDelay = 8.0;
        const numRetries = maxRetries - retriesRemaining;
        // Apply exponential backoff, but not more than the max.
        const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);
        // Apply some jitter, take up to at most 25 percent of the retry time.
        const jitter = 1 - Math.random() * 0.25;
        return sleepSeconds * jitter * 1000;
    }
    async buildRequest(inputOptions, { retryCount = 0 } = {}) {
        const options = {
            ...inputOptions
        };
        const { method, path, query, defaultBaseURL } = options;
        const url = this.buildURL(path, query, defaultBaseURL);
        if ('timeout' in options) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validatePositiveInteger"])('timeout', options.timeout);
        options.timeout = options.timeout ?? this.timeout;
        const { bodyHeaders, body, isStreamingBody } = this.buildBody({
            options
        });
        if (isStreamingBody) {
            inputOptions.__metadata = {
                ...inputOptions.__metadata,
                hasStreamingBody: true
            };
        }
        const reqHeaders = await this.buildHeaders({
            options: inputOptions,
            method,
            bodyHeaders,
            retryCount
        });
        const req = {
            method,
            headers: reqHeaders,
            ...options.signal && {
                signal: options.signal
            },
            ...globalThis.ReadableStream && body instanceof globalThis.ReadableStream && {
                duplex: 'half'
            },
            ...body && {
                body
            },
            ...this.fetchOptions ?? {},
            ...options.fetchOptions ?? {}
        };
        return {
            req,
            url,
            timeout: options.timeout
        };
    }
    async buildHeaders({ options, method, bodyHeaders, retryCount }) {
        let idempotencyHeaders = {};
        if (this.idempotencyHeader && method !== 'get') {
            if (!options.idempotencyKey) options.idempotencyKey = this.defaultIdempotencyKey();
            idempotencyHeaders[this.idempotencyHeader] = options.idempotencyKey;
        }
        const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$headers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildHeaders"])([
            idempotencyHeaders,
            {
                Accept: 'application/json',
                'User-Agent': this.getUserAgent(),
                'X-Stainless-Retry-Count': String(retryCount),
                ...options.timeout ? {
                    'X-Stainless-Timeout': String(Math.trunc(options.timeout / 1000))
                } : {},
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$detect$2d$platform$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPlatformHeaders"])(),
                'OpenAI-Organization': this.organization,
                'OpenAI-Project': this.project
            },
            this._provider ? undefined : await this.authHeaders(options, options.__security ?? {
                bearerAuth: true
            }),
            this._options.defaultHeaders,
            bodyHeaders,
            options.headers
        ]);
        if (!this._provider) {
            this.validateHeaders(headers, options.__security ?? {
                bearerAuth: true
            });
        }
        return headers.values;
    }
    _makeAbort(controller) {
        // note: we can't just inline this method inside `fetchWithTimeout()` because then the closure
        //       would capture all request options, and cause a memory leak.
        return ()=>controller.abort();
    }
    buildBody({ options }) {
        const { body, headers: rawHeaders } = options;
        if (!body) {
            // A resource method always passes a `body` key when its operation defines a
            // request body, even if the caller omitted an optional body param. Keep the
            // content-type for those, and only elide it for operations with no body at
            // all (e.g. GET/DELETE).
            if (body === undefined && 'body' in options) {
                return {
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _OpenAI_encoder, "f").call(this, {
                        body,
                        headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$headers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildHeaders"])([
                            rawHeaders
                        ])
                    }),
                    isStreamingBody: false
                };
            }
            return {
                bodyHeaders: undefined,
                body: undefined,
                isStreamingBody: false
            };
        }
        const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$headers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildHeaders"])([
            rawHeaders
        ]);
        const isReadableStream = typeof globalThis.ReadableStream !== 'undefined' && body instanceof globalThis.ReadableStream;
        const isRetryableBody = !isReadableStream && (typeof body === 'string' || body instanceof ArrayBuffer || ArrayBuffer.isView(body) || typeof globalThis.Blob !== 'undefined' && body instanceof globalThis.Blob || body instanceof URLSearchParams || body instanceof FormData);
        if (// Pass raw type verbatim
        ArrayBuffer.isView(body) || body instanceof ArrayBuffer || body instanceof DataView || typeof body === 'string' && // Preserve legacy string encoding behavior for now
        headers.values.has('content-type') || globalThis.Blob && body instanceof globalThis.Blob || // `FormData` -> `multipart/form-data`
        body instanceof FormData || // `URLSearchParams` -> `application/x-www-form-urlencoded`
        body instanceof URLSearchParams || // Send chunked stream (each chunk has own `length`)
        isReadableStream) {
            return {
                bodyHeaders: undefined,
                body: body,
                isStreamingBody: !isRetryableBody
            };
        } else if (typeof body === 'object' && (Symbol.asyncIterator in body || Symbol.iterator in body && 'next' in body && typeof body.next === 'function')) {
            return {
                bodyHeaders: undefined,
                body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$shims$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReadableStreamFrom"](body),
                isStreamingBody: true
            };
        } else if (typeof body === 'object' && headers.values.get('content-type') === 'application/x-www-form-urlencoded') {
            return {
                bodyHeaders: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                body: this.stringifyQuery(body),
                isStreamingBody: false
            };
        } else {
            return {
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$tslib$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__classPrivateFieldGet"])(this, _OpenAI_encoder, "f").call(this, {
                    body,
                    headers
                }),
                isStreamingBody: false
            };
        }
    }
}
_a = OpenAI, _OpenAI_encoder = new WeakMap(), _OpenAI_instances = new WeakSet(), _OpenAI_baseURLOverridden = function _OpenAI_baseURLOverridden() {
    return this._provider !== undefined || this.baseURL !== 'https://api.openai.com/v1';
};
OpenAI.OpenAI = _a;
OpenAI.DEFAULT_TIMEOUT = 600000; // 10 minutes
OpenAI.OpenAIError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"];
OpenAI.APIError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"];
OpenAI.APIConnectionError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIConnectionError"];
OpenAI.APIConnectionTimeoutError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIConnectionTimeoutError"];
OpenAI.APIUserAbortError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIUserAbortError"];
OpenAI.NotFoundError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NotFoundError"];
OpenAI.ConflictError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConflictError"];
OpenAI.RateLimitError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RateLimitError"];
OpenAI.BadRequestError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BadRequestError"];
OpenAI.AuthenticationError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthenticationError"];
OpenAI.InternalServerError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InternalServerError"];
OpenAI.PermissionDeniedError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PermissionDeniedError"];
OpenAI.UnprocessableEntityError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnprocessableEntityError"];
OpenAI.InvalidWebhookSignatureError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidWebhookSignatureError"];
OpenAI.toFile = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$to$2d$file$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toFile"];
OpenAI.toStreamingFile = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$uploads$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toStreamingFile"];
OpenAI.Completions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$completions$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Completions"];
OpenAI.Chat = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$chat$2f$chat$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Chat"];
OpenAI.Embeddings = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$embeddings$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Embeddings"];
OpenAI.Files = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$files$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Files"];
OpenAI.Images = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$images$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Images"];
OpenAI.Audio = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$audio$2f$audio$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Audio"];
OpenAI.Moderations = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$moderations$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Moderations"];
OpenAI.Models = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$models$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Models"];
OpenAI.FineTuning = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$fine$2d$tuning$2f$fine$2d$tuning$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FineTuning"];
OpenAI.Graders = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$graders$2f$graders$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Graders"];
OpenAI.VectorStores = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$vector$2d$stores$2f$vector$2d$stores$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VectorStores"];
OpenAI.Webhooks = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$webhooks$2f$webhooks$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Webhooks"];
OpenAI.Beta = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$beta$2f$beta$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Beta"];
OpenAI.Batches = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$batches$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Batches"];
OpenAI.Uploads = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$uploads$2f$uploads$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Uploads"];
OpenAI.Admin = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$admin$2f$admin$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Admin"];
OpenAI.Responses = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$responses$2f$responses$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Responses"];
OpenAI.Realtime = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$realtime$2f$realtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Realtime"];
OpenAI.Conversations = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$conversations$2f$conversations$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Conversations"];
OpenAI.Evals = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$evals$2f$evals$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Evals"];
OpenAI.Containers = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$containers$2f$containers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Containers"];
OpenAI.Skills = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$skills$2f$skills$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Skills"];
OpenAI.Videos = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$videos$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Videos"];
function getConnectionErrorMessage(error) {
    if (isUndiciDispatcherVersionMismatchError(error)) {
        return `Connection error. This may be caused by passing an undici dispatcher, such as ProxyAgent, that is incompatible with the fetch implementation. If you are using undici's ProxyAgent, pass the fetch implementation from the same undici package: import { fetch, ProxyAgent } from 'undici'; new OpenAI({ fetch, fetchOptions: { dispatcher: new ProxyAgent(...) } });`;
    }
    return undefined;
}
function isUndiciDispatcherVersionMismatchError(error) {
    let current = error;
    for(let i = 0; i < 8 && current && typeof current === 'object'; i++){
        const err = current;
        if (err.code === 'UND_ERR_INVALID_ARG' && typeof err.message === 'string' && err.message.includes('invalid onRequestStart method')) {
            return true;
        }
        current = err.cause;
    }
    return false;
} //# sourceMappingURL=client.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/azure.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AzureOpenAI",
    ()=>AzureOpenAI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$headers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/headers.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/error.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/error.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/utils.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/utils/values.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/utils/env.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/client.mjs [app-route] (ecmascript)");
;
;
;
;
class AzureOpenAI extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAI"] {
    /**
     * API Client for interfacing with the Azure OpenAI API.
     *
     * @param {string | undefined} [opts.apiVersion=process.env['OPENAI_API_VERSION'] ?? undefined]
     * @param {string | undefined} [opts.endpoint=process.env['AZURE_OPENAI_ENDPOINT'] ?? undefined] - Your Azure endpoint, including the resource, e.g. `https://example-resource.azure.openai.com/`
     * @param {string | undefined} [opts.apiKey=process.env['AZURE_OPENAI_API_KEY'] ?? undefined]
     * @param {string | undefined} opts.deployment - A model deployment, if given, sets the base client URL to include `/deployments/{deployment}`.
     * @param {string | null | undefined} [opts.organization=process.env['OPENAI_ORG_ID'] ?? null]
     * @param {string} [opts.baseURL=process.env['OPENAI_BASE_URL']] - Sets the base URL for the API, e.g. `https://example-resource.azure.openai.com/openai/`.
     * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
     * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
     * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
     * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
     * @param {Headers} opts.defaultHeaders - Default headers to include with every request to the API.
     * @param {DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
     * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
     */ constructor({ baseURL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readEnv"])('OPENAI_BASE_URL'), apiKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readEnv"])('AZURE_OPENAI_API_KEY'), apiVersion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readEnv"])('OPENAI_API_VERSION'), endpoint, deployment, azureADTokenProvider, dangerouslyAllowBrowser, ...opts } = {}){
        if (!apiVersion) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]("The OPENAI_API_VERSION environment variable is missing or empty; either provide it, or instantiate the AzureOpenAI client with an apiVersion option, like new AzureOpenAI({ apiVersion: 'My API Version' }).");
        }
        if (typeof azureADTokenProvider === 'function') {
            dangerouslyAllowBrowser = true;
        }
        if (!azureADTokenProvider && !apiKey) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]('Missing credentials. Please pass one of `apiKey` and `azureADTokenProvider`, or set the `AZURE_OPENAI_API_KEY` environment variable.');
        }
        if (azureADTokenProvider && apiKey) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]('The `apiKey` and `azureADTokenProvider` arguments are mutually exclusive; only one can be passed at a time.');
        }
        opts.defaultQuery = {
            ...opts.defaultQuery,
            'api-version': apiVersion
        };
        if (!baseURL) {
            if (!endpoint) {
                endpoint = process.env['AZURE_OPENAI_ENDPOINT'];
            }
            if (!endpoint) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]('Must provide one of the `baseURL` or `endpoint` arguments, or the `AZURE_OPENAI_ENDPOINT` environment variable');
            }
            let endpointEnd = endpoint.length;
            while(endpointEnd > 0 && endpoint[endpointEnd - 1] === '/'){
                endpointEnd--;
            }
            baseURL = `${endpoint.slice(0, endpointEnd)}/openai`;
        } else {
            if (endpoint) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]('baseURL and endpoint are mutually exclusive');
            }
        }
        super({
            apiKey: azureADTokenProvider ?? apiKey,
            baseURL,
            ...opts,
            ...dangerouslyAllowBrowser !== undefined ? {
                dangerouslyAllowBrowser
            } : {}
        });
        this.apiVersion = '';
        this.apiVersion = apiVersion;
        this.deploymentName = deployment;
    }
    async buildRequest(options, props = {}) {
        if (_deployments_endpoints.has(options.path) && options.method === 'post' && options.body !== undefined) {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$values$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isObj"])(options.body)) {
                throw new Error('Expected request body to be an object');
            }
            const model = this.deploymentName || options.body['model'] || options.__metadata?.['model'];
            if (model !== undefined && !this.baseURL.includes('/deployments')) {
                options.path = `/deployments/${model}${options.path}`;
            }
        }
        return super.buildRequest(options, props);
    }
    async authHeaders(opts, schemes) {
        const security = schemes ?? {
            bearerAuth: true,
            adminAPIKeyAuth: true
        };
        if (security.bearerAuth && typeof this._options.apiKey === 'string') {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$headers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildHeaders"])([
                {
                    'api-key': this.apiKey
                }
            ]);
        }
        return super.authHeaders(opts, security);
    }
}
const _deployments_endpoints = new Set([
    '/completions',
    '/chat/completions',
    '/embeddings',
    '/audio/transcriptions',
    '/audio/translations',
    '/audio/speech',
    '/images/generations',
    '/batches',
    '/images/edits'
]); //# sourceMappingURL=azure.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/bedrock.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BedrockOpenAI",
    ()=>BedrockOpenAI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/error.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/error.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/client.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$headers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/headers.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/utils.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/internal/utils/env.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$ResponsesParser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/ResponsesParser.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$responses$2f$responses$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/resources/responses/responses.mjs [app-route] (ecmascript)");
;
;
;
;
;
;
/** Resolve the default Bedrock Mantle API root from the configured AWS region. */ function deriveBedrockBaseURL(awsRegion) {
    const region = awsRegion?.trim();
    if (!region) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]('Must provide one of the `baseURL` or `awsRegion` arguments, or set the `AWS_BEDROCK_BASE_URL`, `AWS_REGION`, or `AWS_DEFAULT_REGION` environment variable.');
    }
    return `https://bedrock-mantle.${region}.api.aws/openai/v1`;
}
/** Normalize a Bedrock Responses URL variant back to the provider API root. */ function normalizeBedrockBaseURL(baseURL) {
    const url = new URL(baseURL);
    const responsesMatch = url.pathname.match(/\/responses(?:\/.*)?$/);
    if (responsesMatch?.index !== undefined) {
        url.pathname = url.pathname.slice(0, responsesMatch.index) || '/';
    }
    return url.toString().replace(/\/$/, '');
}
/** Restore the SDK convenience property when Bedrock omits it from a streamed final response. */ function addBedrockOutputText(response) {
    if (!Object.getOwnPropertyDescriptor(response, 'output_text')) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$ResponsesParser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addOutputText"])(response);
    }
    return response;
}
/** Keep the standard Responses surface while repairing Bedrock streamed final responses. */ function restoreBedrockStreamOutputText(responses) {
    const stream = responses.stream.bind(responses);
    responses.stream = (body, options)=>{
        const responseStream = stream(body, options);
        const finalResponse = responseStream.finalResponse.bind(responseStream);
        responseStream.finalResponse = async ()=>addBedrockOutputText(await finalResponse());
        return responseStream;
    };
    return responses;
}
class BedrockOpenAI extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAI"] {
    /**
     * API Client for interfacing with Amazon Bedrock's OpenAI-compatible endpoint.
     *
     * @param {string | null | undefined} [opts.apiKey=process.env['AWS_BEARER_TOKEN_BEDROCK'] ?? null]
     * @param {string | null | undefined} [opts.baseURL=process.env['AWS_BEDROCK_BASE_URL'] ?? derived from opts.awsRegion or AWS_REGION/AWS_DEFAULT_REGION]
     * @param {string | undefined} [opts.awsRegion=process.env['AWS_REGION'] ?? process.env['AWS_DEFAULT_REGION'] ?? undefined]
     * @param {ApiKeySetter | undefined} opts.bedrockTokenProvider - A function that returns a Bedrock bearer token and is invoked before each request.
     */ constructor({ baseURL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readEnv"])('AWS_BEDROCK_BASE_URL'), apiKey, awsRegion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readEnv"])('AWS_REGION') ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readEnv"])('AWS_DEFAULT_REGION'), bedrockTokenProvider, adminAPIKey, workloadIdentity, ...opts } = {}){
        if (adminAPIKey || workloadIdentity) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]('BedrockOpenAI only supports Bedrock bearer token authentication.');
        }
        if (apiKey === undefined && !bedrockTokenProvider) {
            apiKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$utils$2f$env$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readEnv"])('AWS_BEARER_TOKEN_BEDROCK') ?? null;
        }
        if (typeof apiKey === 'function') {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]('Pass refreshable Bedrock credentials via `bedrockTokenProvider`, not `apiKey`.');
        }
        if (apiKey && bedrockTokenProvider) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]('The `apiKey` and `bedrockTokenProvider` arguments are mutually exclusive; only one can be passed at a time.');
        }
        if (!apiKey && !bedrockTokenProvider) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OpenAIError"]('Missing credentials. Please pass an `apiKey` or `bedrockTokenProvider`, or set the `AWS_BEARER_TOKEN_BEDROCK` environment variable.');
        }
        const configuredBaseURL = baseURL?.trim() ? baseURL : deriveBedrockBaseURL(awsRegion);
        super({
            apiKey: bedrockTokenProvider ?? apiKey,
            adminAPIKey: null,
            baseURL: normalizeBedrockBaseURL(configuredBaseURL),
            ...opts
        });
        this.bedrockTokenProvider = bedrockTokenProvider;
        this.responses = restoreBedrockStreamOutputText(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$resources$2f$responses$2f$responses$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Responses"](this));
    }
    async prepareOptions(options) {
        const security = options.__security ?? {
            bearerAuth: true
        };
        if (security.adminAPIKeyAuth && !security.bearerAuth) {
            await this._callApiKey();
        }
        await super.prepareOptions(options);
    }
    async authHeaders(opts, schemes) {
        const security = schemes ?? {
            bearerAuth: true,
            adminAPIKeyAuth: true
        };
        if ((security.bearerAuth || security.adminAPIKeyAuth) && this.apiKey !== null) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$internal$2f$headers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildHeaders"])([
                {
                    Authorization: `Bearer ${this.apiKey}`
                }
            ]);
        }
        return super.authHeaders(opts, security);
    }
    withOptions(options) {
        const bedrockTokenProvider = options.apiKey !== undefined ? undefined : options.bedrockTokenProvider ?? this.bedrockTokenProvider;
        return super.withOptions({
            ...options,
            ...bedrockTokenProvider ? {
                apiKey: undefined,
                bedrockTokenProvider
            } : {}
        });
    }
} //# sourceMappingURL=bedrock.mjs.map
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/index.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/client.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$uploads$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/uploads.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$api$2d$promise$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/api-promise.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$pagination$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/pagination.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$core$2f$error$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/core/error.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$azure$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/azure.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$bedrock$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/bedrock.mjs [app-route] (ecmascript)"); //# sourceMappingURL=index.mjs.map
;
;
;
;
;
;
;
;
}),
"[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/helpers/zod.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "zodFunction",
    ()=>zodFunction,
    "zodRealtimeFunction",
    ()=>zodRealtimeFunction,
    "zodResponseFormat",
    ()=>zodResponseFormat,
    "zodResponsesFunction",
    ()=>zodResponsesFunction,
    "zodTextFormat",
    ()=>zodTextFormat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/external.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/parse.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/parser.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$zodToJsonSchema$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/_vendor/zod-to-json-schema/zodToJsonSchema.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$ResponsesParser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/ResponsesParser.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$transform$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/openai@6.49.0_@aws-sdk+credential-provider-node@3.972.2_@smithy+hash-node@4.2.8_@smithy+signa_p27yasadph5nretepzbdp3f2xi/node_modules/openai/lib/transform.mjs [app-route] (ecmascript)");
;
;
;
;
;
function encodeSchemaDefinitionRefToken(token) {
    return encodeURIComponent(token.replace(/~/g, '~0').replace(/\//g, '~1'));
}
function validateSchemaDefinitions(schemaDefinitions) {
    if (schemaDefinitions && Object.prototype.hasOwnProperty.call(schemaDefinitions, '__proto__')) {
        throw new Error('schemaDefinitions cannot include "__proto__" as a definition name');
    }
}
function escapeSchemaDefinitionRefs(schema, schemaDefinitions) {
    const refReplacements = new Map(Object.keys(schemaDefinitions ?? {}).map((name)=>[
            `#/definitions/${name}`,
            `#/definitions/${encodeSchemaDefinitionRefToken(name)}`
        ]));
    const visit = (value)=>{
        if (!value || typeof value !== 'object') return;
        if (Array.isArray(value)) {
            for (const child of value)visit(child);
            return;
        }
        const record = value;
        const ref = record['$ref'];
        if (typeof ref === 'string') {
            record['$ref'] = refReplacements.get(ref) ?? ref;
        }
        for (const child of Object.values(record))visit(child);
    };
    visit(schema);
    return schema;
}
function getZodV3RootName(name, schemaDefinitions) {
    let rootName = name;
    while(schemaDefinitions && Object.prototype.hasOwnProperty.call(schemaDefinitions, rootName)){
        rootName = `${rootName}_root`;
    }
    return rootName;
}
function zodV3ToJsonSchema(schema, options) {
    const rootName = getZodV3RootName(options.name, options.schemaDefinitions);
    const jsonSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$zodToJsonSchema$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["zodToJsonSchema"])(schema, {
        openaiStrictMode: true,
        name: rootName,
        nameStrategy: 'duplicate-ref',
        $refStrategy: 'extract-to-root',
        nullableStrategy: 'property',
        ...options.schemaDefinitions ? {
            definitions: options.schemaDefinitions
        } : undefined
    });
    return escapeSchemaDefinitionRefs(jsonSchema, options.schemaDefinitions);
}
function zodV4ToJsonSchema(schema, options = {}) {
    const metadata = options.schemaDefinitions ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registry"]() : undefined;
    for (const [name, definition] of Object.entries(options.schemaDefinitions ?? {})){
        metadata?.add(definition, {
            id: name
        });
    }
    const jsonSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toJSONSchema"](schema, {
        target: 'draft-7',
        ...metadata ? {
            metadata
        } : undefined,
        override: ({ zodSchema, jsonSchema })=>{
            const def = zodSchema._zod.def;
            if (def.type === 'union' && 'discriminator' in def && Array.isArray(jsonSchema.oneOf)) {
                if (jsonSchema.anyOf !== undefined) {
                    throw new Error('Zod discriminated union generated both `anyOf` and `oneOf`, which cannot be represented in an OpenAI strict schema');
                }
                // Discriminator values are mutually exclusive, so anyOf preserves the
                // union while staying inside the API's supported JSON Schema subset.
                jsonSchema.anyOf = jsonSchema.oneOf;
                delete jsonSchema.oneOf;
            }
        }
    });
    const escapedSchema = escapeSchemaDefinitionRefs(jsonSchema, options.schemaDefinitions);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$transform$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toStrictJsonSchema"])(escapedSchema);
}
function zodV3ToNonStrictJsonSchema(schema, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$_vendor$2f$zod$2d$to$2d$json$2d$schema$2f$zodToJsonSchema$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["zodToJsonSchema"])(schema, {
        name: options.name,
        nameStrategy: 'duplicate-ref',
        $refStrategy: 'extract-to-root',
        pipeStrategy: 'input'
    });
}
function zodV4ToNonStrictJsonSchema(schema) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toJSONSchema"](schema, {
        target: 'draft-7',
        io: 'input'
    });
}
function isZodV4(zodObject) {
    return '_zod' in zodObject;
}
function parseZodObject(zodObject, content) {
    const parsed = JSON.parse(content);
    const parser = zodObject.parse;
    if (typeof parser === 'function') {
        return parser.call(zodObject, parsed);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parse"](zodObject, parsed);
}
function zodResponseFormat(zodObject, name, props) {
    const zodSchema = zodObject;
    const { schemaDefinitions, ...responseFormatProps } = props ?? {};
    validateSchemaDefinitions(schemaDefinitions);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["makeParseableResponseFormat"])({
        type: 'json_schema',
        json_schema: {
            ...responseFormatProps,
            name,
            strict: true,
            schema: isZodV4(zodSchema) ? zodV4ToJsonSchema(zodSchema, {
                schemaDefinitions
            }) : zodV3ToJsonSchema(zodSchema, {
                name,
                schemaDefinitions
            })
        }
    }, (content)=>parseZodObject(zodObject, content));
}
function zodTextFormat(zodObject, name, props) {
    const zodSchema = zodObject;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["makeParseableTextFormat"])({
        type: 'json_schema',
        ...props,
        name,
        strict: true,
        schema: isZodV4(zodSchema) ? zodV4ToJsonSchema(zodSchema) : zodV3ToJsonSchema(zodSchema, {
            name
        })
    }, (content)=>parseZodObject(zodObject, content));
}
function zodFunction(options) {
    const zodSchema = options.parameters;
    // @ts-expect-error TODO
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$parser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["makeParseableTool"])({
        type: 'function',
        function: {
            name: options.name,
            parameters: isZodV4(zodSchema) ? zodV4ToJsonSchema(zodSchema) : zodV3ToJsonSchema(zodSchema, {
                name: options.name
            }),
            strict: true,
            ...options.description ? {
                description: options.description
            } : undefined
        }
    }, {
        callback: options.function,
        parser: (args)=>parseZodObject(options.parameters, args)
    });
}
function zodResponsesFunction(options) {
    const zodSchema = options.parameters;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$openai$40$6$2e$49$2e$0_$40$aws$2d$sdk$2b$credential$2d$provider$2d$node$40$3$2e$972$2e$2_$40$smithy$2b$hash$2d$node$40$4$2e$2$2e$8_$40$smithy$2b$signa_p27yasadph5nretepzbdp3f2xi$2f$node_modules$2f$openai$2f$lib$2f$ResponsesParser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["makeParseableResponseTool"])({
        type: 'function',
        name: options.name,
        parameters: isZodV4(zodSchema) ? zodV4ToJsonSchema(zodSchema) : zodV3ToJsonSchema(zodSchema, {
            name: options.name
        }),
        strict: true,
        ...options.description ? {
            description: options.description
        } : undefined
    }, {
        callback: options.function,
        parser: (args)=>parseZodObject(options.parameters, args)
    });
}
function zodRealtimeFunction(options) {
    const zodSchema = options.parameters;
    return {
        type: 'function',
        name: options.name,
        parameters: isZodV4(zodSchema) ? zodV4ToNonStrictJsonSchema(zodSchema) : zodV3ToNonStrictJsonSchema(zodSchema, {
            name: options.name
        }),
        ...options.description ? {
            description: options.description
        } : undefined
    };
} //# sourceMappingURL=zod.mjs.map
}),
];

//# sourceMappingURL=36524_openai_015c3ab3._.js.map