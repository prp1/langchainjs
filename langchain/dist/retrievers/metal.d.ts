import Metal from "@getmetal/metal-sdk";
import { BaseRetriever, BaseRetrieverInput } from "../schema/retriever.js";
import { Document } from "../document.js";
export interface MetalRetrieverFields extends BaseRetrieverInput {
  client: Metal;
}
export declare class MetalRetriever extends BaseRetriever {
  lc_namespace: string[];
  private client;
  constructor(fields: MetalRetrieverFields);
  _getRelevantDocuments(query: string): Promise<Document[]>;
}
