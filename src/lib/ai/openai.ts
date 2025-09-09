import OpenAI from 'openai';
import { AIMessage, AIResponse, GameContext } from './index';

export class NerixOpenAI {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async generateResponse(gameContext: GameContext, messages: AIMessage[]): Promise<AIResponse> {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is required');
    }

    // Add system message
    const formattedMessages = [
      {
        role: 'system' as const,
        content: gameContext.systemPrompt
      },
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];
    
    const tools = gameContext.tools?.map(tool => ({
      type: 'function' as const,
      function: {
        name: tool.function.name,
        description: tool.function.description,
        parameters: tool.function.parameters
      }
    })) || [];

    const response = await this.client.chat.completions.create({
      model: 'gpt-4',
      messages: formattedMessages,
      tools: tools.length > 0 ? tools : undefined,
      temperature: 0.7,
      max_tokens: 4096
    });

    const completion = response.choices[0];
    
    let functionCalls;
    if (completion.message.tool_calls) {
      functionCalls = completion.message.tool_calls.map(call => ({
        name: call.function.name,
        arguments: JSON.parse(call.function.arguments)
      }));
    }

    return {
      content: completion.finish_reason === 'tool_calls' 
        ? functionCalls?.[0]?.arguments?.explanation || ''
        : completion.message.content || '',
      functionCalls,
      tokensUsed: response.usage?.total_tokens || 0
    };
  }
}