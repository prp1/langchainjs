import { BaseDocumentCompressor } from "./document_compressors/index.js";
import { Document } from "../document.js";
import { BaseRetriever, BaseRetrieverInput } from "../schema/retriever.js";
import { CallbackManagerForRetrieverRun } from "../callbacks/manager.js";
export interface ContextualCompressionRetrieverArgs extends BaseRetrieverInput {
  baseCompressor: BaseDocumentCompressor;
  baseRetriever: BaseRetriever;
}
export declare class ContextualCompressionRetriever extends BaseRetriever {
  lc_namespace: string[];
  baseCompressor: BaseDocumentCompressor;
  baseRetriever: BaseRetriever;
  constructor(fields: ContextualCompressionRetrieverArgs);
  _getRelevantDocuments(
    query: string,
    runManager?: CallbackManagerForRetrieverRun
  ): Promise<Document[]>;
}
