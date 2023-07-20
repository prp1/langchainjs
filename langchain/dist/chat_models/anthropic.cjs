"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatAnthropic = void 0;
const AnthropicApi = __importStar(require("@anthropic-ai/sdk"));
const index_js_1 = require("../schema/index.cjs");
const env_js_1 = require("../util/env.cjs");
const base_js_1 = require("./base.cjs");
// Anthropic's 0.5.3 SDK currently has a collision with the default exported class
// and an exported namespace that causes issues when transpiling to CommonJS
const AnthropicClientConstructor = AnthropicApi.Anthropic ?? AnthropicApi.default;
function getAnthropicPromptFromMessage(type) {
    switch (type) {
        case "ai":
            return AnthropicApi.AI_PROMPT;
        case "human":
            return AnthropicApi.HUMAN_PROMPT;
        case "system":
            return "";
        default:
            throw new Error(`Unknown message type: ${type}`);
    }
}
const DEFAULT_STOP_SEQUENCES = [AnthropicApi.HUMAN_PROMPT];
/**
 * Wrapper around Anthropic large language models.
 *
 * To use you should have the `@anthropic-ai/sdk` package installed, with the
 * `ANTHROPIC_API_KEY` environment variable set.
 *
 * @remarks
 * Any parameters that are valid to be passed to {@link
 * https://console.anthropic.com/docs/api/reference |
 * `anthropic.complete`} can be passed through {@link invocationKwargs},
 * even if not explicitly available on this class.
 *
 */
class ChatAnthropic extends base_js_1.BaseChatModel {
    get lc_secrets() {
        return {
            anthropicApiKey: "ANTHROPIC_API_KEY",
        };
    }
    get lc_aliases() {
        return {
            modelName: "model",
        };
    }
    constructor(fields) {
        super(fields ?? {});
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "anthropicApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "temperature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "topK", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: -1
        });
        Object.defineProperty(this, "topP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: -1
        });
        Object.defineProperty(this, "maxTokensToSample", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 2048
        });
        Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "claude-v1"
        });
        Object.defineProperty(this, "invocationKwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stopSequences", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "streaming", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        // Used for non-streaming requests
        Object.defineProperty(this, "batchClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // Used for streaming requests
        Object.defineProperty(this, "streamingClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.anthropicApiKey =
            fields?.anthropicApiKey ?? (0, env_js_1.getEnvironmentVariable)("ANTHROPIC_API_KEY");
        if (!this.anthropicApiKey) {
            throw new Error("Anthropic API key not found");
        }
        // Support overriding the default API URL (i.e., https://api.anthropic.com)
        this.apiUrl = fields?.anthropicApiUrl;
        this.modelName = fields?.modelName ?? this.modelName;
        this.invocationKwargs = fields?.invocationKwargs ?? {};
        this.temperature = fields?.temperature ?? this.temperature;
        this.topK = fields?.topK ?? this.topK;
        this.topP = fields?.topP ?? this.topP;
        this.maxTokensToSample =
            fields?.maxTokensToSample ?? this.maxTokensToSample;
        this.stopSequences = fields?.stopSequences ?? this.stopSequences;
        this.streaming = fields?.streaming ?? false;
    }
    /**
     * Get the parameters used to invoke the model
     */
    invocationParams(options) {
        return {
            model: this.modelName,
            temperature: this.temperature,
            top_k: this.topK,
            top_p: this.topP,
            stop_sequences: options?.stop?.concat(DEFAULT_STOP_SEQUENCES) ??
                this.stopSequences ??
                DEFAULT_STOP_SEQUENCES,
            max_tokens_to_sample: this.maxTokensToSample,
            stream: this.streaming,
            ...this.invocationKwargs,
        };
    }
    /** @ignore */
    _identifyingParams() {
        return {
            model_name: this.modelName,
            ...this.invocationParams(),
        };
    }
    /**
     * Get the identifying parameters for the model
     */
    identifyingParams() {
        return {
            model_name: this.modelName,
            ...this.invocationParams(),
        };
    }
    formatMessagesAsPrompt(messages) {
        return (messages
            .map((message) => {
            const messagePrompt = getAnthropicPromptFromMessage(message._getType());
            return `${messagePrompt} ${message.content}`;
        })
            .join("") + AnthropicApi.AI_PROMPT);
    }
    /** @ignore */
    async _generate(messages, options, runManager) {
        if (this.stopSequences && options.stop) {
            throw new Error(`"stopSequence" parameter found in input and default params`);
        }
        const params = this.invocationParams(options);
        const response = await this.completionWithRetry({
            ...params,
            prompt: this.formatMessagesAsPrompt(messages),
        }, { signal: options.signal }, runManager);
        const generations = response.completion
            .split(AnthropicApi.AI_PROMPT)
            .map((message) => ({
            text: message,
            message: new index_js_1.AIMessage(message),
        }));
        return {
            generations,
        };
    }
    /** @ignore */
    async completionWithRetry(request, options, runManager) {
        if (!this.anthropicApiKey) {
            throw new Error("Missing Anthropic API key.");
        }
        let makeCompletionRequest;
        let asyncCallerOptions = {};
        if (request.stream) {
            if (!this.streamingClient) {
                const options = this.apiUrl ? { apiUrl: this.apiUrl } : undefined;
                this.streamingClient = new AnthropicClientConstructor({
                    ...options,
                    apiKey: this.anthropicApiKey,
                });
            }
            makeCompletionRequest = async () => {
                const stream = await this.streamingClient.completions.create({
                    ...request,
                });
                const completion = {
                    completion: "",
                    model: "",
                    stop_reason: "",
                };
                for await (const data of stream) {
                    completion.stop_reason = data.stop_reason;
                    completion.model = data.model;
                    if (options.signal?.aborted) {
                        stream.controller.abort();
                        throw new Error("AbortError: User aborted the request.");
                    }
                    if (data.stop_reason) {
                        break;
                    }
                    const part = data.completion;
                    if (part) {
                        completion.completion += part;
                        // eslint-disable-next-line no-void
                        void runManager?.handleLLMNewToken(part ?? "");
                    }
                }
                return completion;
            };
        }
        else {
            if (!this.batchClient) {
                const options = this.apiUrl ? { apiUrl: this.apiUrl } : undefined;
                this.batchClient = new AnthropicClientConstructor({
                    ...options,
                    apiKey: this.anthropicApiKey,
                });
            }
            asyncCallerOptions = { signal: options.signal };
            makeCompletionRequest = async () => this.batchClient.completions.create({ ...request });
        }
        return this.caller.callWithOptions(asyncCallerOptions, makeCompletionRequest);
    }
    _llmType() {
        return "anthropic";
    }
    /** @ignore */
    _combineLLMOutput() {
        return [];
    }
}
exports.ChatAnthropic = ChatAnthropic;
