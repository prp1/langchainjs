import type { AppOptions } from "firebase-admin";
import { BaseMessage, BaseListChatMessageHistory } from "../../schema/index.js";
export interface FirestoreDBChatMessageHistory {
  collectionName: string;
  sessionId: string;
  userId: string;
  appIdx?: number;
  config?: AppOptions;
}
export declare class FirestoreChatMessageHistory extends BaseListChatMessageHistory {
  lc_namespace: string[];
  private collectionName;
  private sessionId;
  private userId;
  private appIdx;
  private config;
  private firestoreClient;
  private document;
  constructor({
    collectionName,
    sessionId,
    userId,
    appIdx,
    config,
  }: FirestoreDBChatMessageHistory);
  private ensureFirestore;
  getMessages(): Promise<BaseMessage[]>;
  addMessage(message: BaseMessage): Promise<void>;
  private upsertMessage;
  clear(): Promise<void>;
}
