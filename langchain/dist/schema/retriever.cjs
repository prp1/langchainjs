"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRetriever = void 0;
const manager_js_1 = require("../callbacks/manager.cjs");
const serializable_js_1 = require("../load/serializable.cjs");
class BaseRetriever extends serializable_js_1.Serializable {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "callbacks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "verbose", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.callbacks = fields?.callbacks;
        this.tags = fields?.tags ?? [];
        this.metadata = fields?.metadata ?? {};
        this.verbose = fields?.verbose ?? false;
    }
    /**
     * TODO: This should be an abstract method, but we'd like to avoid breaking
     * changes to people currently using subclassed custom retrievers.
     * Change it on next major release.
     */
    _getRelevantDocuments(_query, _callbacks) {
        throw new Error("Not implemented!");
    }
    async getRelevantDocuments(query, config) {
        const parsedConfig = (0, manager_js_1.parseCallbackConfigArg)(config);
        const callbackManager_ = await manager_js_1.CallbackManager.configure(parsedConfig.callbacks, this.callbacks, parsedConfig.tags, this.tags, parsedConfig.metadata, this.metadata, { verbose: this.verbose });
        const runManager = await callbackManager_?.handleRetrieverStart(this.toJSON(), query);
        try {
            const results = await this._getRelevantDocuments(query, runManager);
            await runManager?.handleRetrieverEnd(results);
            return results;
        }
        catch (error) {
            await runManager?.handleRetrieverError(error);
            throw error;
        }
    }
}
exports.BaseRetriever = BaseRetriever;
