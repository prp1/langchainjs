import { BaseRetriever, BaseRetrieverInput } from "../schema/retriever.js";
import { Document } from "../document.js";
import { AsyncCaller, AsyncCallerParams } from "../util/async_caller.js";
export interface DataberryRetrieverArgs
  extends AsyncCallerParams,
    BaseRetrieverInput {
  datastoreUrl: string;
  topK?: number;
  apiKey?: string;
}
export declare class DataberryRetriever extends BaseRetriever {
  lc_namespace: string[];
  get lc_secrets(): {
    apiKey: string;
  };
  get lc_aliases(): {
    apiKey: string;
  };
  caller: AsyncCaller;
  datastoreUrl: string;
  topK?: number;
  apiKey?: string;
  constructor(fields: DataberryRetrieverArgs);
  _getRelevantDocuments(query: string): Promise<Document[]>;
}
