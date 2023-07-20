import { LLMChain } from "../../chains/llm_chain.js";
import { PromptTemplate } from "../../prompts/index.js";
import { BaseLLM } from "../../llms/base.js";
import { Document } from "../../document.js";
import { TimeWeightedVectorStoreRetriever } from "../../retrievers/time_weighted.js";
import { BaseMemory, InputValues, OutputValues } from "../../memory/base.js";
export type GenerativeAgentMemoryConfig = {
  reflectionThreshold?: number;
  importanceWeight?: number;
  verbose?: boolean;
  maxTokensLimit?: number;
};
export declare class GenerativeAgentMemory extends BaseMemory {
  llm: BaseLLM;
  memoryRetriever: TimeWeightedVectorStoreRetriever;
  verbose: boolean;
  reflectionThreshold?: number;
  currentPlan: string[];
  importanceWeight: number;
  private aggregateImportance;
  private maxTokensLimit;
  queriesKey: string;
  mostRecentMemoriesTokenKey: string;
  addMemoryKey: string;
  relevantMemoriesKey: string;
  relevantMemoriesSimpleKey: string;
  mostRecentMemoriesKey: string;
  nowKey: string;
  reflecting: boolean;
  constructor(
    llm: BaseLLM,
    memoryRetriever: TimeWeightedVectorStoreRetriever,
    config?: GenerativeAgentMemoryConfig
  );
  getRelevantMemoriesKey(): string;
  getMostRecentMemoriesTokenKey(): string;
  getAddMemoryKey(): string;
  getCurrentTimeKey(): string;
  get memoryKeys(): string[];
  chain(prompt: PromptTemplate): LLMChain;
  static parseList(text: string): string[];
  getTopicsOfReflection(lastK?: number): Promise<string[]>;
  getInsightsOnTopic(topic: string, now?: Date): Promise<string[]>;
  pauseToReflect(now?: Date): Promise<string[]>;
  scoreMemoryImportance(memoryContent: string): Promise<number>;
  addMemory(memoryContent: string, now?: Date): Promise<void>;
  fetchMemories(observation: string, _now?: Date): Promise<Document[]>;
  formatMemoriesDetail(relevantMemories: Document[]): string;
  formatMemoriesSimple(relevantMemories: Document[]): string;
  getMemoriesUntilLimit(consumedTokens: number): Promise<string>;
  get memoryVariables(): string[];
  loadMemoryVariables(inputs: InputValues): Promise<Record<string, string>>;
  saveContext(_inputs: InputValues, outputs: OutputValues): Promise<void>;
  clear(): void;
}
