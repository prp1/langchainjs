export declare const PREFIX =
  "Answer the following questions as best you can. You have access to the following tools:";
export declare const FORMAT_INSTRUCTIONS =
  'The way you use the tools is by specifying a json blob, denoted below by $JSON_BLOB\nSpecifically, this $JSON_BLOB should have a "action" key (with the name of the tool to use) and a "action_input" key (with the input to the tool going here). \nThe $JSON_BLOB should only contain a SINGLE action, do NOT return a list of multiple actions. Here is an example of a valid $JSON_BLOB:\n\n```\n{{\n  "action": "calculator",\n  "action_input": "1 + 2"\n}}\n```\n\nALWAYS use the following format:\n\nQuestion: the input question you must answer\nThought: you should always think about what to do\nAction: \n```\n$JSON_BLOB\n```\nObservation: the result of the action\n... (this Thought/Action/Observation can repeat N times)\nThought: I now know the final answer\nFinal Answer: the final answer to the original input question';
export declare const SUFFIX =
  "Begin! Reminder to always use the exact characters `Final Answer` when responding.";
