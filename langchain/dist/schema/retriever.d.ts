import {
  BaseCallbackConfig,
  CallbackManagerForRetrieverRun,
  Callbacks,
} from "../callbacks/manager.js";
import { Document } from "../document.js";
import { Serializable } from "../load/serializable.js";
/**
 * Base Index class. All indexes should extend this class.
 */
export interface BaseRetrieverInput {
  callbacks?: Callbacks;
  tags?: string[];
  metadata?: Record<string, unknown>;
  verbose?: boolean;
}
export declare abstract class BaseRetriever extends Serializable {
  callbacks?: Callbacks;
  tags?: string[];
  metadata?: Record<string, unknown>;
  verbose?: boolean;
  constructor(fields?: BaseRetrieverInput);
  /**
   * TODO: This should be an abstract method, but we'd like to avoid breaking
   * changes to people currently using subclassed custom retrievers.
   * Change it on next major release.
   */
  _getRelevantDocuments(
    _query: string,
    _callbacks?: CallbackManagerForRetrieverRun
  ): Promise<Document[]>;
  getRelevantDocuments(
    query: string,
    config?: Callbacks | BaseCallbackConfig
  ): Promise<Document[]>;
}
