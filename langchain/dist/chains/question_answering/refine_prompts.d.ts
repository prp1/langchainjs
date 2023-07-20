import { PromptTemplate, ChatPromptTemplate } from "../../prompts/index.js";
import { ConditionalPromptSelector } from "../../prompts/selectors/conditional.js";
export declare const DEFAULT_REFINE_PROMPT_TMPL =
  "The original question is as follows: {question}\nWe have provided an existing answer: {existing_answer}\nWe have the opportunity to refine the existing answer\n(only if needed) with some more context below.\n------------\n{context}\n------------\nGiven the new context, refine the original answer to better answer the question. \nIf the context isn't useful, return the original answer.";
export declare const DEFAULT_REFINE_PROMPT: PromptTemplate;
export declare const CHAT_REFINE_PROMPT: ChatPromptTemplate;
export declare const REFINE_PROMPT_SELECTOR: ConditionalPromptSelector;
export declare const DEFAULT_TEXT_QA_PROMPT_TMPL =
  "Context information is below. \n---------------------\n{context}\n---------------------\nGiven the context information and not prior knowledge, answer the question: {question}";
export declare const DEFAULT_TEXT_QA_PROMPT: PromptTemplate;
export declare const CHAT_QUESTION_PROMPT: ChatPromptTemplate;
export declare const QUESTION_PROMPT_SELECTOR: ConditionalPromptSelector;
