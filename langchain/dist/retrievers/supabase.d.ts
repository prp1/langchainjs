import type { SupabaseClient } from "@supabase/supabase-js";
import { Embeddings } from "../embeddings/base.js";
import { Document } from "../document.js";
import { BaseRetriever, BaseRetrieverInput } from "../schema/retriever.js";
import {
  CallbackManagerForRetrieverRun,
  Callbacks,
} from "../callbacks/manager.js";
type SearchResult = [Document, number, number];
export interface SupabaseLibArgs extends BaseRetrieverInput {
  client: SupabaseClient;
  /**
   * The table name on Supabase. Defaults to "documents".
   */
  tableName?: string;
  /**
   * The name of the Similarity search function on Supabase. Defaults to "match_documents".
   */
  similarityQueryName?: string;
  /**
   * The name of the Keyword search function on Supabase. Defaults to "kw_match_documents".
   */
  keywordQueryName?: string;
  /**
   * The number of documents to return from the similarity search. Defaults to 2.
   */
  similarityK?: number;
  /**
   * The number of documents to return from the keyword search. Defaults to 2.
   */
  keywordK?: number;
}
export interface SupabaseHybridSearchParams {
  query: string;
  similarityK: number;
  keywordK: number;
}
export declare class SupabaseHybridSearch extends BaseRetriever {
  lc_namespace: string[];
  similarityK: number;
  query: string;
  keywordK: number;
  similarityQueryName: string;
  client: SupabaseClient;
  tableName: string;
  keywordQueryName: string;
  embeddings: Embeddings;
  constructor(embeddings: Embeddings, args: SupabaseLibArgs);
  protected similaritySearch(
    query: string,
    k: number,
    _callbacks?: Callbacks
  ): Promise<SearchResult[]>;
  protected keywordSearch(query: string, k: number): Promise<SearchResult[]>;
  protected hybridSearch(
    query: string,
    similarityK: number,
    keywordK: number,
    callbacks?: Callbacks
  ): Promise<SearchResult[]>;
  _getRelevantDocuments(
    query: string,
    runManager?: CallbackManagerForRetrieverRun
  ): Promise<Document[]>;
}
export {};
