import { Embeddings, EmbeddingsParams } from "./base.js";
export interface GooglePaLMEmbeddingsParams extends EmbeddingsParams {
  /**
   * Model Name to use
   *
   * Note: The format must follow the pattern - `models/{model}`
   */
  modelName?: string;
  /**
   * Google Palm API key to use
   */
  apiKey?: string;
}
export declare class GooglePaLMEmbeddings
  extends Embeddings
  implements GooglePaLMEmbeddingsParams
{
  apiKey?: string;
  modelName: string;
  private client;
  constructor(fields?: GooglePaLMEmbeddingsParams);
  protected _embedText(text: string): Promise<number[]>;
  embedQuery(document: string): Promise<number[]>;
  embedDocuments(documents: string[]): Promise<number[][]>;
}
