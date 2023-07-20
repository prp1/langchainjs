import { Redis, RedisOptions } from "ioredis";
import { BaseMessage, BaseListChatMessageHistory } from "../../schema/index.js";
export type RedisChatMessageHistoryInput = {
  sessionId: string;
  sessionTTL?: number;
  url?: string;
  config?: RedisOptions;
  client?: Redis;
};
export declare class RedisChatMessageHistory extends BaseListChatMessageHistory {
  lc_namespace: string[];
  get lc_secrets(): {
    url: string;
    "config.username": string;
    "config.password": string;
  };
  client: Redis;
  private sessionId;
  private sessionTTL?;
  constructor(fields: RedisChatMessageHistoryInput);
  getMessages(): Promise<BaseMessage[]>;
  addMessage(message: BaseMessage): Promise<void>;
  clear(): Promise<void>;
}
