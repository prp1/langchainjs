import { ChatOpenAI } from "langchain/chat_models/openai";
const model = new ChatOpenAI({
    temperature: 0.9,
    azureOpenAIApiKey: "YOUR-API-KEY",
    azureOpenAIApiInstanceName: "YOUR-INSTANCE-NAME",
    azureOpenAIApiDeploymentName: "YOUR-DEPLOYMENT-NAME",
    azureOpenAIApiVersion: "YOUR-API-VERSION",
    azureOpenAIBasePath: "YOUR-AZURE-OPENAI-BASE-PATH", // In Node.js defaults to process.env.AZURE_OPENAI_BASE_PATH
});
//# sourceMappingURL=integration_azure_openai.js.map