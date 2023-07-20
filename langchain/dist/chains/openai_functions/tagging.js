import { zodToJsonSchema } from "zod-to-json-schema";
import { PromptTemplate } from "../../prompts/prompt.js";
import { JsonOutputFunctionsParser, } from "../../output_parsers/openai_functions.js";
import { LLMChain } from "../llm_chain.js";
function getTaggingFunctions(schema) {
    return [
        {
            name: "information_extraction",
            description: "Extracts the relevant information from the passage.",
            parameters: schema,
        },
    ];
}
const TAGGING_TEMPLATE = `Extract the desired information from the following passage.

Passage:
{input}
`;
export function createTaggingChain(schema, llm, options = {}) {
    const { prompt = PromptTemplate.fromTemplate(TAGGING_TEMPLATE), ...rest } = options;
    const functions = getTaggingFunctions(schema);
    const outputParser = new JsonOutputFunctionsParser();
    return new LLMChain({
        llm,
        prompt,
        llmKwargs: { functions },
        outputParser,
        tags: ["openai_functions", "tagging"],
        ...rest,
    });
}
export function createTaggingChainFromZod(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
schema, llm, options) {
    return createTaggingChain(zodToJsonSchema(schema), llm, options);
}
