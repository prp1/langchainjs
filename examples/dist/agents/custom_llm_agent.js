import { LLMSingleActionAgent, AgentActionOutputParser, AgentExecutor, } from "langchain/agents";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { BaseStringPromptTemplate, renderTemplate, } from "langchain/prompts";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
const PREFIX = `Answer the following questions as best you can. You have access to the following tools:`;
const formatInstructions = (toolNames) => `Use the following format in your response:

Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [${toolNames}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question`;
const SUFFIX = `Begin!

Question: {input}
Thought:{agent_scratchpad}`;
class CustomPromptTemplate extends BaseStringPromptTemplate {
    constructor(args) {
        super({ inputVariables: args.inputVariables });
        Object.defineProperty(this, "tools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.tools = args.tools;
    }
    _getPromptType() {
        throw new Error("Not implemented");
    }
    format(input) {
        /** Construct the final template */
        const toolStrings = this.tools
            .map((tool) => `${tool.name}: ${tool.description}`)
            .join("\n");
        const toolNames = this.tools.map((tool) => tool.name).join("\n");
        const instructions = formatInstructions(toolNames);
        const template = [PREFIX, toolStrings, instructions, SUFFIX].join("\n\n");
        /** Construct the agent_scratchpad */
        const intermediateSteps = input.intermediate_steps;
        const agentScratchpad = intermediateSteps.reduce((thoughts, { action, observation }) => thoughts +
            [action.log, `\nObservation: ${observation}`, "Thought:"].join("\n"), "");
        const newInput = { agent_scratchpad: agentScratchpad, ...input };
        /** Format the template. */
        return Promise.resolve(renderTemplate(template, "f-string", newInput));
    }
    partial(_values) {
        throw new Error("Not implemented");
    }
    serialize() {
        throw new Error("Not implemented");
    }
}
class CustomOutputParser extends AgentActionOutputParser {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "agents", "custom_llm_agent"]
        });
    }
    async parse(text) {
        if (text.includes("Final Answer:")) {
            const parts = text.split("Final Answer:");
            const input = parts[parts.length - 1].trim();
            const finalAnswers = { output: input };
            return { log: text, returnValues: finalAnswers };
        }
        const match = /Action: (.*)\nAction Input: (.*)/s.exec(text);
        if (!match) {
            throw new Error(`Could not parse LLM output: ${text}`);
        }
        return {
            tool: match[1].trim(),
            toolInput: match[2].trim().replace(/^"+|"+$/g, ""),
            log: text,
        };
    }
    getFormatInstructions() {
        throw new Error("Not implemented");
    }
}
export const run = async () => {
    const model = new OpenAI({ temperature: 0 });
    const tools = [
        new SerpAPI(process.env.SERPAPI_API_KEY, {
            location: "Austin,Texas,United States",
            hl: "en",
            gl: "us",
        }),
        new Calculator(),
    ];
    const llmChain = new LLMChain({
        prompt: new CustomPromptTemplate({
            tools,
            inputVariables: ["input", "agent_scratchpad"],
        }),
        llm: model,
    });
    const agent = new LLMSingleActionAgent({
        llmChain,
        outputParser: new CustomOutputParser(),
        stop: ["\nObservation"],
    });
    const executor = new AgentExecutor({
        agent,
        tools,
    });
    console.log("Loaded agent.");
    const input = `Who is Olivia Wilde's boyfriend? What is his current age raised to the 0.23 power?`;
    console.log(`Executing with input "${input}"...`);
    const result = await executor.call({ input });
    console.log(`Got output ${result.output}`);
};
//# sourceMappingURL=custom_llm_agent.js.map