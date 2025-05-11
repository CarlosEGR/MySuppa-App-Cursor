import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { RunnableSequence } from "langchain/schema/runnable";
import { StringOutputParser } from "langchain/schema/output_parser";

export async function summarizeReadme(readmeContent) {
  // Initialize the LLM
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0
  });

  // Create the prompt template
  const template = `Please analyze this GitHub repository README content and provide a summary and interesting facts.
  
README Content:
--------------
{readme}
--------------

Provide your response in the following format:
SUMMARY: A concise summary of what this repository is about and its main features.

COOL FACTS: List 3-5 interesting or unique aspects about this repository.

Remember to be concise but informative.`;

  const prompt = PromptTemplate.fromTemplate(template);

  // Create a processing chain
  const chain = RunnableSequence.from([
    {
      readme: (input) => input.readme
    },
    prompt,
    model,
    new StringOutputParser(),
    // Parse the LLM output into structured format
    (text) => {
      const summaryMatch = text.match(/SUMMARY:(.*?)(?=COOL FACTS:)/s);
      const factsMatch = text.match(/COOL FACTS:(.*)/s);
      
      const summary = summaryMatch ? summaryMatch[1].trim() : "";
      const coolFacts = factsMatch 
        ? factsMatch[1]
          .split('\n')
          .map(fact => fact.replace(/^[-•*]\s*/, '').trim())
          .filter(fact => fact.length > 0)
        : [];

      return {
        summary,
        coolFacts
      };
    }
  ]);

  // Run the chain
  const result = await chain.invoke({
    readme: readmeContent
  });

  return result;
} 