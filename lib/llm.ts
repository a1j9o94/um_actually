import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function cleanResponse(response: string): string {
    // Remove any potential markdown formatting
    return response.replace(/```json\n?|\n?```/g, '').trim();
}

export type LLMMessage = {
  role: "user" | "assistant";
  content: string;
};

export type LLMConversation = {
  system: string;
  messages: LLMMessage[];
};


export async function callLLM(messages: LLMConversation, retryCount = 0): Promise<string> {
    try {

        console.log("System message received: ", messages.system);
        console.log("Messages received: ", messages.messages);
      const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 3000,
        temperature: 0.7,
        system: messages.system,
        messages: messages.messages,
      })

      const raw_response = (msg.content[0] as any).text;

      console.log("Raw response: ", raw_response);
  
      return cleanResponse(raw_response);
    } catch (error: any) {
      if (retryCount < 2) {
        console.log(`API call failed, retrying (attempt ${retryCount + 2}/3)...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Exponential backoff
        return callLLM(messages, retryCount + 1);
      }
      throw error;
    }
  }