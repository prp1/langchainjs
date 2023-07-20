import { HumanMessage } from "langchain/schema";
import { ChatOpenAI } from "langchain/chat_models/openai";
// We can pass in a list of CallbackHandlers to the LLM constructor to get callbacks for various events.
const model = new ChatOpenAI({
    callbacks: [
        {
            handleLLMStart: async (llm, prompts) => {
                console.log(JSON.stringify(llm, null, 2));
                console.log(JSON.stringify(prompts, null, 2));
            },
            handleLLMEnd: async (output) => {
                console.log(JSON.stringify(output, null, 2));
            },
            handleLLMError: async (err) => {
                console.error(err);
            },
        },
    ],
});
await model.call([
    new HumanMessage("What is a good name for a company that makes colorful socks?"),
]);
/*
{
  "name": "openai"
}
[
  "Human: What is a good name for a company that makes colorful socks?"
]
{
  "generations": [
    [
      {
        "text": "Rainbow Soles",
        "message": {
          "text": "Rainbow Soles"
        }
      }
    ]
  ],
  "llmOutput": {
    "tokenUsage": {
      "completionTokens": 4,
      "promptTokens": 21,
      "totalTokens": 25
    }
  }
}
*/
//# sourceMappingURL=chat_debugging.js.map