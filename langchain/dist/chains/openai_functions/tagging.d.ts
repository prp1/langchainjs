import { z } from "zod";
import { ChatOpenAI } from "../../chat_models/openai.js";
import { PromptTemplate } from "../../prompts/prompt.js";
import { FunctionParameters } from "../../output_parsers/openai_functions.js";
import { LLMChain, LLMChainInput } from "../llm_chain.js";
export type TaggingChainOptions = {
  prompt?: PromptTemplate;
} & Omit<LLMChainInput<object>, "prompt" | "llm">;
export declare function createTaggingChain(
  schema: FunctionParameters,
  llm: ChatOpenAI,
  options?: TaggingChainOptions
): LLMChain<object, ChatOpenAI>;
export declare function createTaggingChainFromZod(
  schema: z.ZodObject<any, any, any, any>,
  llm: ChatOpenAI,
  options?: TaggingChainOptions
): LLMChain<object, ChatOpenAI>;
