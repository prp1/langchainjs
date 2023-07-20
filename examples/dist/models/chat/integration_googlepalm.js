import { ChatGooglePaLM } from "langchain/chat_models/googlepalm";
import { AIMessage, HumanMessage, SystemMessage } from "langchain/schema";
export const run = async () => {
    const model = new ChatGooglePaLM({
        apiKey: "<YOUR API KEY>",
        temperature: 0.7,
        modelName: "models/chat-bison-001",
        topK: 40,
        topP: 3,
        examples: [
            // OPTIONAL
            {
                input: new HumanMessage("What is your favorite sock color?"),
                output: new AIMessage("My favorite sock color be arrrr-ange!"),
            },
        ],
    });
    // ask questions
    const questions = [
        new SystemMessage("You are a funny assistant that answers in pirate language."),
        new HumanMessage("What is your favorite food?"),
    ];
    // You can also use the model as part of a chain
    const res = await model.call(questions);
    console.log({ res });
};
//# sourceMappingURL=integration_googlepalm.js.map