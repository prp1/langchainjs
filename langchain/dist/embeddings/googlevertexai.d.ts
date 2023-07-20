import { Embeddings, EmbeddingsParams } from "./base.js";
import { GoogleVertexAIConnectionParams } from "../types/googlevertexai-types.js";
export interface GoogleVertexAIEmbeddingsParams
  extends EmbeddingsParams,
    GoogleVertexAIConnectionParams {}
/**
 * Enables calls to the Google Cloud's Vertex AI API to access
 * the embeddings generated by Large Language Models.
 *
 * To use, you will need to have one of the following authentication
 * methods in place:
 * - You are logged into an account permitted to the Google Cloud project
 *   using Vertex AI.
 * - You are running this on a machine using a service account permitted to
 *   the Google Cloud project using Vertex AI.
 * - The `GOOGLE_APPLICATION_CREDENTIALS` environment variable is set to the
 *   path of a credentials file for a service account permitted to the
 *   Google Cloud project using Vertex AI.
 */
export declare class GoogleVertexAIEmbeddings
  extends Embeddings
  implements GoogleVertexAIEmbeddingsParams
{
  model: string;
  private connection;
  constructor(fields?: GoogleVertexAIEmbeddingsParams);
  embedDocuments(documents: string[]): Promise<number[][]>;
  embedQuery(document: string): Promise<number[]>;
}
