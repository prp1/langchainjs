import { Embeddings } from "../embeddings/base.js";
import { Document } from "../document.js";
import { BaseRetriever, BaseRetrieverInput } from "../schema/retriever.js";
import { Serializable } from "../load/serializable.js";
import {
  CallbackManagerForRetrieverRun,
  Callbacks,
} from "../callbacks/manager.js";
type AddDocumentOptions = Record<string, any>;
export interface VectorStoreRetrieverInput<V extends VectorStore>
  extends BaseRetrieverInput {
  vectorStore: V;
  k?: number;
  filter?: V["FilterType"];
}
export declare class VectorStoreRetriever<
  V extends VectorStore = VectorStore
> extends BaseRetriever {
  get lc_namespace(): string[];
  vectorStore: V;
  k: number;
  filter?: V["FilterType"];
  _vectorstoreType(): string;
  constructor(fields: VectorStoreRetrieverInput<V>);
  _getRelevantDocuments(
    query: string,
    runManager?: CallbackManagerForRetrieverRun
  ): Promise<Document[]>;
  addDocuments(
    documents: Document[],
    options?: AddDocumentOptions
  ): Promise<string[] | void>;
}
export declare abstract class VectorStore extends Serializable {
  FilterType: object;
  lc_namespace: string[];
  embeddings: Embeddings;
  constructor(embeddings: Embeddings, dbConfig: Record<string, any>);
  abstract _vectorstoreType(): string;
  abstract addVectors(
    vectors: number[][],
    documents: Document[],
    options?: AddDocumentOptions
  ): Promise<string[] | void>;
  abstract addDocuments(
    documents: Document[],
    options?: AddDocumentOptions
  ): Promise<string[] | void>;
  delete(_params?: Record<string, any>): Promise<void>;
  abstract similaritySearchVectorWithScore(
    query: number[],
    k: number,
    filter?: this["FilterType"]
  ): Promise<[Document, number][]>;
  similaritySearch(
    query: string,
    k?: number,
    filter?: this["FilterType"] | undefined,
    _callbacks?: Callbacks | undefined
  ): Promise<Document[]>;
  similaritySearchWithScore(
    query: string,
    k?: number,
    filter?: this["FilterType"] | undefined,
    _callbacks?: Callbacks | undefined
  ): Promise<[Document, number][]>;
  static fromTexts(
    _texts: string[],
    _metadatas: object[] | object,
    _embeddings: Embeddings,
    _dbConfig: Record<string, any>
  ): Promise<VectorStore>;
  static fromDocuments(
    _docs: Document[],
    _embeddings: Embeddings,
    _dbConfig: Record<string, any>
  ): Promise<VectorStore>;
  asRetriever(
    kOrFields?: number | VectorStoreRetrieverInput<this>,
    filter?: this["FilterType"],
    callbacks?: Callbacks,
    tags?: string[],
    metadata?: Record<string, unknown>,
    verbose?: boolean
  ): VectorStoreRetriever<this>;
}
export declare abstract class SaveableVectorStore extends VectorStore {
  abstract save(directory: string): Promise<void>;
  static load(
    _directory: string,
    _embeddings: Embeddings
  ): Promise<SaveableVectorStore>;
}
export {};
