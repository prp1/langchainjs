import { Tool } from "./base.js";
export interface WikipediaQueryRunParams {
  topKResults?: number;
  maxDocContentLength?: number;
  baseUrl?: string;
}
type UrlParameters = Record<
  string,
  string | number | boolean | undefined | null
>;
export declare class WikipediaQueryRun extends Tool {
  name: string;
  description: string;
  protected topKResults: number;
  protected maxDocContentLength: number;
  protected baseUrl: string;
  constructor(params?: WikipediaQueryRunParams);
  _call(query: string): Promise<string>;
  content(page: string, redirect?: boolean): Promise<string>;
  protected buildUrl<P extends UrlParameters>(parameters: P): string;
  private _fetchSearchResults;
  private _fetchPage;
}
export {};
