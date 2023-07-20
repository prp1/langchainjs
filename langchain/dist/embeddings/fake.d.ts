import { Embeddings, EmbeddingsParams } from "./base.js";
export declare class FakeEmbeddings extends Embeddings {
  constructor(params?: EmbeddingsParams);
  embedDocuments(documents: string[]): Promise<number[][]>;
  embedQuery(_: string): Promise<number[]>;
}
interface SyntheticEmbeddingsParams extends EmbeddingsParams {
  vectorSize: number;
}
export declare class SyntheticEmbeddings
  extends Embeddings
  implements SyntheticEmbeddingsParams
{
  vectorSize: number;
  constructor(params?: SyntheticEmbeddingsParams);
  embedDocuments(documents: string[]): Promise<number[][]>;
  embedQuery(document: string): Promise<number[]>;
}
export {};
