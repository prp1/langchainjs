"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GooglePaLMEmbeddings = void 0;
const generativelanguage_1 = require("@google-ai/generativelanguage");
const google_auth_library_1 = require("google-auth-library");
const base_js_1 = require("./base.cjs");
const env_js_1 = require("../util/env.cjs");
class GooglePaLMEmbeddings extends base_js_1.Embeddings {
    constructor(fields) {
        super(fields ?? {});
        Object.defineProperty(this, "apiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "models/embedding-gecko-001"
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.modelName = fields?.modelName ?? this.modelName;
        this.apiKey =
            fields?.apiKey ?? (0, env_js_1.getEnvironmentVariable)("GOOGLE_PALM_API_KEY");
        if (!this.apiKey) {
            throw new Error("Please set an API key for Google Palm 2 in the environment variable GOOGLE_PALM_API_KEY or in the `apiKey` field of the GooglePalm constructor");
        }
        this.client = new generativelanguage_1.TextServiceClient({
            authClient: new google_auth_library_1.GoogleAuth().fromAPIKey(this.apiKey),
        });
    }
    async _embedText(text) {
        // replace newlines, which can negatively affect performance.
        const cleanedText = text.replace(/\n/g, " ");
        const res = await this.client.embedText({
            model: this.modelName,
            text: cleanedText,
        });
        return res[0].embedding?.value ?? [];
    }
    embedQuery(document) {
        return this.caller.callWithOptions({}, this._embedText.bind(this), document);
    }
    embedDocuments(documents) {
        return Promise.all(documents.map((document) => this._embedText(document)));
    }
}
exports.GooglePaLMEmbeddings = GooglePaLMEmbeddings;
