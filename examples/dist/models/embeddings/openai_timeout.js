import { OpenAIEmbeddings } from "langchain/embeddings/openai";
const embeddings = new OpenAIEmbeddings({
    timeout: 1000, // 1s timeout
});
/* Embed queries */
const res = await embeddings.embedQuery("Hello world");
console.log(res);
/* Embed documents */
const documentRes = await embeddings.embedDocuments(["Hello world", "Bye bye"]);
console.log({ documentRes });
//# sourceMappingURL=openai_timeout.js.map