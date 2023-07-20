import { z } from "zod";
import type { JsonSchema7ObjectType } from "zod-to-json-schema/src/parsers/object.js";
import { Document } from "../document.js";
import { BaseChain } from "../chains/base.js";
import { BaseDocumentTransformer } from "../schema/document.js";
import { TaggingChainOptions } from "../chains/openai_functions/index.js";
import { ChatOpenAI } from "../chat_models/openai.js";
export declare class MetadataTagger extends BaseDocumentTransformer {
  protected taggingChain: BaseChain;
  constructor(fields: { taggingChain: BaseChain });
  transformDocuments(documents: Document[]): Promise<Document[]>;
}
export declare function createMetadataTagger(
  schema: JsonSchema7ObjectType,
  options: TaggingChainOptions & {
    llm?: ChatOpenAI;
  }
): MetadataTagger;
export declare function createMetadataTaggerFromZod(
  schema: z.AnyZodObject,
  options: TaggingChainOptions & {
    llm?: ChatOpenAI;
  }
): MetadataTagger;
