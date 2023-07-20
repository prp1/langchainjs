import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";
/**
 * See https://docs.sort.xyz/docs/api-keys to get your free Sort API key.
 * See https://docs.sort.xyz for more information on the available queries.
 * See https://docs.sort.xyz/reference for more information about Sort's REST API.
 */
export interface Query {
  type: "NFTMetadata" | "latestTransactions";
  contractAddress: string;
  blockchain: "ethereum" | "polygon" | "goerli";
  limit?: number;
}
export interface SortXYZBlockchainLoaderParams {
  apiKey: string;
  query: Query | string;
}
export interface SortXYZBlockchainAPIResponse {
  code: number;
  data: {
    durationMs: number;
    id: string;
    query: string;
    records: Record<string, unknown>[];
    recordCount: number;
  };
}
export declare class SortXYZBlockchainLoader extends BaseDocumentLoader {
  readonly contractAddress: string;
  readonly blockchain: string;
  readonly apiKey: string;
  readonly queryType: string;
  readonly sql: string;
  readonly limit: number;
  constructor({ apiKey, query }: SortXYZBlockchainLoaderParams);
  load(): Promise<Document[]>;
}
