import { getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue, } from "firebase-admin/firestore";
import { BaseListChatMessageHistory, } from "../../schema/index.js";
import { mapChatMessagesToStoredMessages, mapStoredMessagesToChatMessages, } from "./utils.js";
export class FirestoreChatMessageHistory extends BaseListChatMessageHistory {
    constructor({ collectionName, sessionId, userId, appIdx = 0, config, }) {
        super();
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "stores", "message", "firestore"]
        });
        Object.defineProperty(this, "collectionName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sessionId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "userId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "appIdx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "firestoreClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "document", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.collectionName = collectionName;
        this.sessionId = sessionId;
        this.userId = userId;
        this.document = null;
        this.appIdx = appIdx;
        if (config)
            this.config = config;
        try {
            this.ensureFirestore();
        }
        catch (error) {
            throw new Error(`Unknown response type`);
        }
    }
    ensureFirestore() {
        let app;
        // Check if the app is already initialized else get appIdx
        if (!getApps().length)
            app = initializeApp(this.config);
        else
            app = getApps()[this.appIdx];
        this.firestoreClient = getFirestore(app);
        this.document = this.firestoreClient
            .collection(this.collectionName)
            .doc(this.sessionId);
    }
    async getMessages() {
        if (!this.document) {
            throw new Error("Document not initialized");
        }
        const querySnapshot = await this.document
            .collection("messages")
            .orderBy("createdAt", "asc")
            .get()
            .catch((err) => {
            throw new Error(`Unknown response type: ${err.toString()}`);
        });
        const response = [];
        querySnapshot.forEach((doc) => {
            const { type, data } = doc.data();
            response.push({ type, data });
        });
        return mapStoredMessagesToChatMessages(response);
    }
    async addMessage(message) {
        const messages = mapChatMessagesToStoredMessages([message]);
        await this.upsertMessage(messages[0]);
    }
    async upsertMessage(message) {
        if (!this.document) {
            throw new Error("Document not initialized");
        }
        await this.document.set({
            id: this.sessionId,
            user_id: this.userId,
        }, { merge: true });
        await this.document
            .collection("messages")
            .add({
            type: message.type,
            data: message.data,
            createdBy: this.userId,
            createdAt: FieldValue.serverTimestamp(),
        })
            .catch((err) => {
            throw new Error(`Unknown response type: ${err.toString()}`);
        });
    }
    async clear() {
        if (!this.document) {
            throw new Error("Document not initialized");
        }
        await this.document
            .collection("messages")
            .get()
            .then((querySnapshot) => {
            querySnapshot.docs.forEach((snapshot) => {
                snapshot.ref.delete().catch((err) => {
                    throw new Error(`Unknown response type: ${err.toString()}`);
                });
            });
        })
            .catch((err) => {
            throw new Error(`Unknown response type: ${err.toString()}`);
        });
        await this.document.delete().catch((err) => {
            throw new Error(`Unknown response type: ${err.toString()}`);
        });
    }
}
