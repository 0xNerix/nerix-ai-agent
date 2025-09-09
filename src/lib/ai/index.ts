import { NerixOpenAI } from './openai';
// import { NerixClaude } from './claude'; // TODO: Add Anthropic SDK and uncomment

export type AIProvider = 'openai' | 'claude';

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  content: string;
  functionCalls?: {
    name: string;
    arguments: Record<string, any>;
  }[];
  tokensUsed: number;
}

export interface GameContext {
  id: string;
  systemPrompt: string;
  tools?: {
    function: {
      name: string;
      description: string;
      parameters: any;
    }
  }[];
}

export class AIClient {
  private openai: NerixOpenAI;
  // private claude: NerixClaude | null; // TODO: Uncomment when Claude is available

  constructor() {
    this.openai = new NerixOpenAI();
    // this.claude = null; // TODO: Uncomment when Claude is available
  }

  async generateResponse(
    gameContext: GameContext,
    messages: AIMessage[],
    provider: AIProvider = 'openai'
  ): Promise<AIResponse> {
    if (provider === 'openai') {
      return await this.openai.generateResponse(gameContext, messages);
    } else {
      // TODO: Implement Claude when SDK is available
      throw new Error('Claude provider not yet implemented');
    }
  }
}