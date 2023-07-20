import {
  AttributeFilter,
  DocumentAttribute,
  DocumentAttributeValue,
  KendraClient,
  KendraClientConfig,
  QueryCommandOutput,
  QueryResultItem,
  RetrieveCommandOutput,
  RetrieveResultItem,
} from "@aws-sdk/client-kendra";
import { BaseRetriever } from "../schema/retriever.js";
import { Document } from "../document.js";
export interface AmazonKendraRetrieverArgs {
  indexId: string;
  topK: number;
  region: string;
  attributeFilter?: AttributeFilter;
  clientOptions?: KendraClientConfig;
}
export declare class AmazonKendraRetriever extends BaseRetriever {
  lc_namespace: string[];
  indexId: string;
  topK: number;
  kendraClient: KendraClient;
  attributeFilter?: AttributeFilter;
  constructor({
    indexId,
    topK,
    clientOptions,
    attributeFilter,
    region,
  }: AmazonKendraRetrieverArgs);
  combineText(title?: string, excerpt?: string): string;
  cleanResult(resText: string): string;
  getDocAttributeValue(
    value: DocumentAttributeValue
  ): string | number | string[] | Date;
  getDocAttributes(documentAttributes?: DocumentAttribute[]): {
    [key: string]: unknown;
  };
  convertRetrieverItem(item: RetrieveResultItem): Document<{
    source: string | undefined;
    title: string;
    excerpt: string;
    document_attributes: {
      [key: string]: unknown;
    };
  }>;
  getRetrieverDocs(
    response: RetrieveCommandOutput,
    pageSize: number
  ): Document[];
  getQueryItemExcerpt(item: QueryResultItem): string;
  convertQueryItem(item: QueryResultItem): Document<{
    source: string | undefined;
    title: string;
    excerpt: string;
    document_attributes: {
      [key: string]: unknown;
    };
  }>;
  getQueryDocs(
    response: QueryCommandOutput,
    pageSize: number
  ): Document<{
    source: string | undefined;
    title: string;
    excerpt: string;
    document_attributes: {
      [key: string]: unknown;
    };
  }>[];
  queryKendra(
    query: string,
    topK: number,
    attributeFilter?: AttributeFilter
  ): Promise<
    | Document<Record<string, any>>[]
    | Document<{
        source: string | undefined;
        title: string;
        excerpt: string;
        document_attributes: {
          [key: string]: unknown;
        };
      }>[]
  >;
  _getRelevantDocuments(query: string): Promise<Document[]>;
}
