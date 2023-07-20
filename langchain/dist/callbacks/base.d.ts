import {
  AgentAction,
  AgentFinish,
  BaseMessage,
  ChainValues,
  LLMResult,
} from "../schema/index.js";
import {
  Serializable,
  Serialized,
  SerializedNotImplemented,
} from "../load/serializable.js";
import { SerializedFields } from "../load/map_keys.js";
import { Document } from "../document.js";
type Error = any;
export interface BaseCallbackHandlerInput {
  ignoreLLM?: boolean;
  ignoreChain?: boolean;
  ignoreAgent?: boolean;
  ignoreRetriever?: boolean;
}
export interface NewTokenIndices {
  prompt: number;
  completion: number;
}
declare abstract class BaseCallbackHandlerMethodsClass {
  /**
   * Called at the start of an LLM or Chat Model run, with the prompt(s)
   * and the run ID.
   */
  handleLLMStart?(
    llm: Serialized,
    prompts: string[],
    runId: string,
    parentRunId?: string,
    extraParams?: Record<string, unknown>,
    tags?: string[],
    metadata?: Record<string, unknown>
  ): Promise<void> | void;
  /**
   * Called when an LLM/ChatModel in `streaming` mode produces a new token
   */
  handleLLMNewToken?(
    token: string,
    /**
     * idx.prompt is the index of the prompt that produced the token
     *   (if there are multiple prompts)
     * idx.completion is the index of the completion that produced the token
     *   (if multiple completions per prompt are requested)
     */
    idx: NewTokenIndices,
    runId: string,
    parentRunId?: string,
    tags?: string[]
  ): Promise<void> | void;
  /**
   * Called if an LLM/ChatModel run encounters an error
   */
  handleLLMError?(
    err: Error,
    runId: string,
    parentRunId?: string,
    tags?: string[]
  ): Promise<void> | void;
  /**
   * Called at the end of an LLM/ChatModel run, with the output and the run ID.
   */
  handleLLMEnd?(
    output: LLMResult,
    runId: string,
    parentRunId?: string,
    tags?: string[]
  ): Promise<void> | void;
  /**
   * Called at the start of a Chat Model run, with the prompt(s)
   * and the run ID.
   */
  handleChatModelStart?(
    llm: Serialized,
    messages: BaseMessage[][],
    runId: string,
    parentRunId?: string,
    extraParams?: Record<string, unknown>,
    tags?: string[],
    metadata?: Record<string, unknown>
  ): Promise<void> | void;
  /**
   * Called at the start of a Chain run, with the chain name and inputs
   * and the run ID.
   */
  handleChainStart?(
    chain: Serialized,
    inputs: ChainValues,
    runId: string,
    parentRunId?: string,
    tags?: string[],
    metadata?: Record<string, unknown>
  ): Promise<void> | void;
  /**
   * Called if a Chain run encounters an error
   */
  handleChainError?(
    err: Error,
    runId: string,
    parentRunId?: string,
    tags?: string[]
  ): Promise<void> | void;
  /**
   * Called at the end of a Chain run, with the outputs and the run ID.
   */
  handleChainEnd?(
    outputs: ChainValues,
    runId: string,
    parentRunId?: string,
    tags?: string[]
  ): Promise<void> | void;
  /**
   * Called at the start of a Tool run, with the tool name and input
   * and the run ID.
   */
  handleToolStart?(
    tool: Serialized,
    input: string,
    runId: string,
    parentRunId?: string,
    tags?: string[],
    metadata?: Record<string, unknown>
  ): Promise<void> | void;
  /**
   * Called if a Tool run encounters an error
   */
  handleToolError?(
    err: Error,
    runId: string,
    parentRunId?: string,
    tags?: string[]
  ): Promise<void> | void;
  /**
   * Called at the end of a Tool run, with the tool output and the run ID.
   */
  handleToolEnd?(
    output: string,
    runId: string,
    parentRunId?: string,
    tags?: string[]
  ): Promise<void> | void;
  handleText?(
    text: string,
    runId: string,
    parentRunId?: string,
    tags?: string[]
  ): Promise<void> | void;
  /**
   * Called when an agent is about to execute an action,
   * with the action and the run ID.
   */
  handleAgentAction?(
    action: AgentAction,
    runId: string,
    parentRunId?: string,
    tags?: string[]
  ): Promise<void> | void;
  /**
   * Called when an agent finishes execution, before it exits.
   * with the final output and the run ID.
   */
  handleAgentEnd?(
    action: AgentFinish,
    runId: string,
    parentRunId?: string,
    tags?: string[]
  ): Promise<void> | void;
  handleRetrieverStart?(
    retriever: Serialized,
    query: string,
    runId: string,
    parentRunId?: string,
    tags?: string[],
    metadata?: Record<string, unknown>
  ): Promise<void> | void;
  handleRetrieverEnd?(
    documents: Document[],
    runId: string,
    parentRunId?: string,
    tags?: string[]
  ): Promise<void> | void;
  handleRetrieverError?(
    err: Error,
    runId: string,
    parentRunId?: string,
    tags?: string[]
  ): Promise<void> | void;
}
/**
 * Base interface for callbacks. All methods are optional. If a method is not
 * implemented, it will be ignored. If a method is implemented, it will be
 * called at the appropriate time. All methods are called with the run ID of
 * the LLM/ChatModel/Chain that is running, which is generated by the
 * CallbackManager.
 *
 * @interface
 */
export type CallbackHandlerMethods = BaseCallbackHandlerMethodsClass;
export declare abstract class BaseCallbackHandler
  extends BaseCallbackHandlerMethodsClass
  implements BaseCallbackHandlerInput, Serializable
{
  lc_serializable: boolean;
  get lc_namespace(): ["langchain", "callbacks", string];
  get lc_secrets():
    | {
        [key: string]: string;
      }
    | undefined;
  get lc_attributes():
    | {
        [key: string]: string;
      }
    | undefined;
  get lc_aliases():
    | {
        [key: string]: string;
      }
    | undefined;
  lc_kwargs: SerializedFields;
  abstract name: string;
  ignoreLLM: boolean;
  ignoreChain: boolean;
  ignoreAgent: boolean;
  ignoreRetriever: boolean;
  awaitHandlers: boolean;
  constructor(input?: BaseCallbackHandlerInput);
  copy(): BaseCallbackHandler;
  toJSON(): Serialized;
  toJSONNotImplemented(): SerializedNotImplemented;
  static fromMethods(methods: CallbackHandlerMethods): {
    name: string;
    lc_serializable: boolean;
    readonly lc_namespace: ["langchain", "callbacks", string];
    readonly lc_secrets:
      | {
          [key: string]: string;
        }
      | undefined;
    readonly lc_attributes:
      | {
          [key: string]: string;
        }
      | undefined;
    readonly lc_aliases:
      | {
          [key: string]: string;
        }
      | undefined;
    lc_kwargs: SerializedFields;
    ignoreLLM: boolean;
    ignoreChain: boolean;
    ignoreAgent: boolean;
    ignoreRetriever: boolean;
    awaitHandlers: boolean;
    copy(): BaseCallbackHandler;
    toJSON(): Serialized;
    toJSONNotImplemented(): SerializedNotImplemented;
    /**
     * Called at the start of an LLM or Chat Model run, with the prompt(s)
     * and the run ID.
     */
    handleLLMStart?(
      llm: Serialized,
      prompts: string[],
      runId: string,
      parentRunId?: string | undefined,
      extraParams?: Record<string, unknown> | undefined,
      tags?: string[] | undefined,
      metadata?: Record<string, unknown> | undefined
    ): void | Promise<void>;
    /**
     * Called when an LLM/ChatModel in `streaming` mode produces a new token
     */
    handleLLMNewToken?(
      token: string,
      idx: NewTokenIndices,
      runId: string,
      parentRunId?: string | undefined,
      tags?: string[] | undefined
    ): void | Promise<void>;
    /**
     * Called if an LLM/ChatModel run encounters an error
     */
    handleLLMError?(
      err: any,
      runId: string,
      parentRunId?: string | undefined,
      tags?: string[] | undefined
    ): void | Promise<void>;
    /**
     * Called at the end of an LLM/ChatModel run, with the output and the run ID.
     */
    handleLLMEnd?(
      output: LLMResult,
      runId: string,
      parentRunId?: string | undefined,
      tags?: string[] | undefined
    ): void | Promise<void>;
    /**
     * Called at the start of a Chat Model run, with the prompt(s)
     * and the run ID.
     */
    handleChatModelStart?(
      llm: Serialized,
      messages: BaseMessage[][],
      runId: string,
      parentRunId?: string | undefined,
      extraParams?: Record<string, unknown> | undefined,
      tags?: string[] | undefined,
      metadata?: Record<string, unknown> | undefined
    ): void | Promise<void>;
    /**
     * Called at the start of a Chain run, with the chain name and inputs
     * and the run ID.
     */
    handleChainStart?(
      chain: Serialized,
      inputs: ChainValues,
      runId: string,
      parentRunId?: string | undefined,
      tags?: string[] | undefined,
      metadata?: Record<string, unknown> | undefined
    ): void | Promise<void>;
    /**
     * Called if a Chain run encounters an error
     */
    handleChainError?(
      err: any,
      runId: string,
      parentRunId?: string | undefined,
      tags?: string[] | undefined
    ): void | Promise<void>;
    /**
     * Called at the end of a Chain run, with the outputs and the run ID.
     */
    handleChainEnd?(
      outputs: ChainValues,
      runId: string,
      parentRunId?: string | undefined,
      tags?: string[] | undefined
    ): void | Promise<void>;
    /**
     * Called at the start of a Tool run, with the tool name and input
     * and the run ID.
     */
    handleToolStart?(
      tool: Serialized,
      input: string,
      runId: string,
      parentRunId?: string | undefined,
      tags?: string[] | undefined,
      metadata?: Record<string, unknown> | undefined
    ): void | Promise<void>;
    /**
     * Called if a Tool run encounters an error
     */
    handleToolError?(
      err: any,
      runId: string,
      parentRunId?: string | undefined,
      tags?: string[] | undefined
    ): void | Promise<void>;
    /**
     * Called at the end of a Tool run, with the tool output and the run ID.
     */
    handleToolEnd?(
      output: string,
      runId: string,
      parentRunId?: string | undefined,
      tags?: string[] | undefined
    ): void | Promise<void>;
    handleText?(
      text: string,
      runId: string,
      parentRunId?: string | undefined,
      tags?: string[] | undefined
    ): void | Promise<void>;
    /**
     * Called when an agent is about to execute an action,
     * with the action and the run ID.
     */
    handleAgentAction?(
      action: AgentAction,
      runId: string,
      parentRunId?: string | undefined,
      tags?: string[] | undefined
    ): void | Promise<void>;
    /**
     * Called when an agent finishes execution, before it exits.
     * with the final output and the run ID.
     */
    handleAgentEnd?(
      action: AgentFinish,
      runId: string,
      parentRunId?: string | undefined,
      tags?: string[] | undefined
    ): void | Promise<void>;
    handleRetrieverStart?(
      retriever: Serialized,
      query: string,
      runId: string,
      parentRunId?: string | undefined,
      tags?: string[] | undefined,
      metadata?: Record<string, unknown> | undefined
    ): void | Promise<void>;
    handleRetrieverEnd?(
      documents: Document<Record<string, any>>[],
      runId: string,
      parentRunId?: string | undefined,
      tags?: string[] | undefined
    ): void | Promise<void>;
    handleRetrieverError?(
      err: any,
      runId: string,
      parentRunId?: string | undefined,
      tags?: string[] | undefined
    ): void | Promise<void>;
  };
}
export {};
