import { GooglePaLM } from "langchain/llms/googlepalm";
export const run = async () => {
    const model = new GooglePaLM({
        apiKey: "<YOUR API KEY>",
        // other params
        temperature: 1,
        modelName: "models/text-bison-001",
        maxOutputTokens: 1024,
        topK: 40,
        topP: 3,
        safetySettings: [
            // OPTIONAL
            {
                category: "HARM_CATEGORY_DANGEROUS",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
        ],
        stopSequences: ["stop"], // OPTIONAL
    });
    const res = await model.call("What would be a good company name for a company that makes colorful socks?");
    console.log({ res });
};
//# sourceMappingURL=googlepalm.js.map