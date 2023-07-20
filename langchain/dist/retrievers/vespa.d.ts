import { Document } from "../document.js";
import {
  RemoteRetriever,
  RemoteRetrieverValues,
  RemoteRetrieverParams,
} from "./remote/base.js";
export interface VespaRetrieverParams extends RemoteRetrieverParams {
  /**
   * The body of the query to send to Vespa
   */
  query_body: object;
  /**
   * The name of the field the content resides in
   */
  content_field: string;
}
export declare class VespaRetriever extends RemoteRetriever {
  lc_namespace: string[];
  query_body: object;
  content_field: string;
  constructor(fields: VespaRetrieverParams);
  createJsonBody(query: string): RemoteRetrieverValues;
  processJsonResponse(json: RemoteRetrieverValues): Document[];
}
