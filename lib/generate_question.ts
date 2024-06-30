import { callLLM, LLMConversation } from "./llm";


export type Question = {
    scratch: string;
    incorrectStatement: string;
    explanation: string;
    correctStatement: string;
    alternatives: string[];
}

export type Quiz = {
    topic: string;
    questions: Question[];
}

export async function generateQuestions(topic: string, count: number = 5): Promise<Quiz> {
    const system = `You are a researcher for a quiz game show like Um actually from Dropout. You are given a topic and asked to generate a list of "almost true but wrong" statements about the topic. You try to be tricky but always technically correct. It should be the kind of pedantic things that will make people roll their eyes, but admit is right after.
       
    You should approach the statement the same way the editor of the NYT crossword or connections editor does.

    For each statement, provide:
    1. The incorrect statement
    2. What's wrong with the statement
    3. The correct version of the statement
    4. Two plausible but incorrect alternative answers to the same statement

    Always format your output as a JSON array of objects with the following format and no other text or preamble:
    [
        {
            "scratch": "Think about what question you would want to ask, how can you be clever and tricky. Explain in detail how someone who is familiar with the series might get tripped up by a question like this and think through some other plausible alternatives a person who is informed may know.",
            "incorrectStatement": "...",
            "explanation": "...",
            "correctStatement": "...",
            "alternatives": ["...", "..."]
        },
        {
            //next question
        }
    ]
    `
    
    
    const first_message = `Generate ${count} "almost true but wrong" statements about ${topic}. `;
  
      const conversation: LLMConversation = {
          system: system,
          messages: [
            { role: "user", content: first_message }
        ]
      };
  
    const completion = await callLLM(conversation, 3);
    const json_object = JSON.parse(completion) as Quiz;

    json_object.topic = topic;

    return json_object;
  }