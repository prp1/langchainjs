import { BaseCallbackHandler } from "langchain/callbacks";
import { Serialized } from "langchain/load/serializable";
import { AgentAction, AgentFinish, ChainValues } from "langchain/schema";

export declare class MyCallbackHandler extends BaseCallbackHandler {
  name: string;

  handleChainStart(chain: Serialized): Promise<void>;

  handleChainEnd(_output: ChainValues): Promise<void>;

  handleAgentAction(action: AgentAction): Promise<void>;

  handleToolEnd(output: string): Promise<void>;

  handleText(text: string): Promise<void>;

  handleAgentEnd(action: AgentFinish): Promise<void>;
}
