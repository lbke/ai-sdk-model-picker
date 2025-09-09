import type { ProviderWithModels } from '../types';

// Provider name constants
export const OPENAI = 'openai';
export const ANTHROPIC = 'anthropic';
export const MISTRAL = 'mistral';
export const GROQ = 'groq';
// export const XAI = 'xai';
export const GOOGLE = 'google';

export const PROVIDERS_DATA: ProviderWithModels[] = [
  {
    name: OPENAI,
    packageName: '@ai-sdk/openai',
    apiKeyName: 'OPENAI_API_KEY',
    models: [
      { name: 'gpt-4.1', type: 'language', capabilities: { textGeneration: true, imageInput: true, toolUsage: true, streaming: true } },
      { name: 'gpt-4o', type: 'language', capabilities: { textGeneration: true, imageInput: true, toolUsage: true, streaming: true } },
      { name: 'gpt-4', type: 'language', capabilities: { textGeneration: true, imageInput: true, toolUsage: true, streaming: true } },
      { name: 'gpt-3.5-turbo', type: 'language', capabilities: { textGeneration: true, toolUsage: true, streaming: true } },
      { name: 'o1', type: 'language', capabilities: { textGeneration: true } },
      { name: 'o3', type: 'language', capabilities: { textGeneration: true } },
      { name: 'o4-mini', type: 'language', capabilities: { textGeneration: true } },
      { name: 'text-embedding-3-large', type: 'embedding' },
      { name: 'text-embedding-3-small', type: 'embedding' },
      { name: 'text-embedding-ada-002', type: 'embedding' },
      { name: 'dall-e-3', type: 'image', capabilities: { objectGeneration: true } },
      { name: 'dall-e-2', type: 'image', capabilities: { objectGeneration: true } },
      { name: 'gpt-image-1', type: 'image', capabilities: { objectGeneration: true } },
      { name: 'whisper-1', type: 'transcription' },
      { name: 'tts-1', type: 'speech' },
      { name: 'tts-1-hd', type: 'speech' }
    ]
  },
  {
    name: ANTHROPIC,
    packageName: '@ai-sdk/anthropic',
    apiKeyName: 'ANTHROPIC_API_KEY',
    models: [
      { name: 'claude-3-haiku-20240307', type: 'language', capabilities: { textGeneration: true, imageInput: true, toolUsage: true, streaming: true } },
      { name: 'claude-3-sonnet-20240229', type: 'language', capabilities: { textGeneration: true, imageInput: true, toolUsage: true, streaming: true } },
      { name: 'claude-3-opus-20240229', type: 'language', capabilities: { textGeneration: true, imageInput: true, toolUsage: true, streaming: true } },
      { name: 'claude-opus-4-20250514', type: 'language', capabilities: { textGeneration: true, imageInput: true, toolUsage: true, streaming: true } },
      { name: 'claude-sonnet-4-20250514', type: 'language', capabilities: { textGeneration: true, imageInput: true, toolUsage: true, streaming: true } },
      { name: 'claude-3-5-sonnet-20241022', type: 'language', capabilities: { textGeneration: true, imageInput: true, toolUsage: true, streaming: true } }
    ]
  },
  {
    name: MISTRAL,
    packageName: '@ai-sdk/mistral',
    apiKeyName: 'MISTRAL_API_KEY',
    synonyms: ['mistralai'],
    models: [
      { name: 'mistral-large-latest', type: 'language', capabilities: { textGeneration: true, toolUsage: true, streaming: true } },
      { name: 'mistral-medium-latest', type: 'language', capabilities: { textGeneration: true, toolUsage: true, streaming: true } },
      { name: 'mistral-small-latest', type: 'language', capabilities: { textGeneration: true, toolUsage: true, streaming: true } },
      { name: 'magistral-small-2506', type: 'language', capabilities: { textGeneration: true, toolUsage: true, streaming: true } },
      { name: 'magistral-medium-2506', type: 'language', capabilities: { textGeneration: true, toolUsage: true, streaming: true } },
      { name: 'ministral-3b-latest', type: 'language', capabilities: { textGeneration: true, streaming: true } },
      { name: 'ministral-8b-latest', type: 'language', capabilities: { textGeneration: true, streaming: true } },
      { name: 'pixtral-12b-2409', type: 'language', capabilities: { textGeneration: true, imageInput: true, streaming: true } },
      { name: 'open-mistral-7b', type: 'language', capabilities: { textGeneration: true, streaming: true } },
      { name: 'open-mixtral-8x7b', type: 'language', capabilities: { textGeneration: true, streaming: true } },
      { name: 'open-mixtral-8x22b', type: 'language', capabilities: { textGeneration: true, streaming: true } },
      { name: 'mistral-embed', type: 'embedding' }
    ]
  },
  {
    name: GROQ,
    packageName: '@ai-sdk/groq',
    apiKeyName: 'GROQ_API_KEY',
    models: [
      { name: 'gemma2-9b-it', type: 'language', capabilities: { textGeneration: true, streaming: true } },
      { name: 'llama-3.1-8b-instant', type: 'language', capabilities: { textGeneration: true, streaming: true } },
      { name: 'llama3-70b-8192', type: 'language', capabilities: { textGeneration: true, streaming: true } },
      { name: 'mixtral-8x7b-32768', type: 'language', capabilities: { textGeneration: true, streaming: true } }
    ]
  },
  /*
  09/2025 : This library willingly excludes Grok models whose design and unfiltered answers
  are strictly incompatible with the values and legislation of France and European Union
  "
  Further updates were made in early July, with the prompt to be "politically incorrect" removed after the bot praised Adolf Hitler, referred to itself as "MechaHitler", and criticized Jewish last names. Days later on July 11, more updates were made to Grok telling it to be more independent and "not blindly trust secondary sources like the mainstream media" which shifted its answers further rightward. On July 15, xAI re-added the prompt for Grok to be "politically incorrect".[4]
  "
  https://en.wikipedia.org/wiki/Grok_(chatbot) 
  {
    name: XAI,
    packageName: '@ai-sdk/xai',
    apiKeyName: 'XAI_API_KEY',
    models: [
      { name: 'grok-3', type: 'language', capabilities: { textGeneration: true, streaming: true, toolUsage: true } },
      { name: 'grok-3-mini', type: 'language', capabilities: { textGeneration: true, streaming: true } },
      { name: 'grok-3-latest', type: 'language', capabilities: { textGeneration: true, streaming: true, toolUsage: true } },
      { name: 'grok-4', type: 'language', capabilities: { textGeneration: true, streaming: true, toolUsage: true } },
      { name: 'grok-2-image', type: 'image', capabilities: { objectGeneration: true } }
    ]
  },
  */
  {
    name: GOOGLE,
    packageName: '@ai-sdk/google',
    apiKeyName: 'GOOGLE_GENERATIVE_AI_API_KEY',
    models: [
      { name: 'gemini-2.5-flash', type: 'language', capabilities: { textGeneration: true, imageInput: true, toolUsage: true, streaming: true } },
      { name: 'gemini-2.5-pro', type: 'language', capabilities: { textGeneration: true, imageInput: true, toolUsage: true, streaming: true } },
      { name: 'gemini-1.5-pro', type: 'language', capabilities: { textGeneration: true, imageInput: true, toolUsage: true, streaming: true } },
      { name: 'gemma-3-27b-it', type: 'language', capabilities: { textGeneration: true, streaming: true } },
      { name: 'gemini-embedding-001', type: 'embedding' },
      { name: 'text-embedding-004', type: 'embedding' },
      { name: 'imagen-3.0-generate-002', type: 'image', capabilities: { objectGeneration: true } }
    ]
  }
];

/**
 * Synonymous -> normalized name
 * So "mistralai" will match "mistral"
 * 
 * We need synonyms for Mistral 
 * as LangChain package is named "mistralai" not mistral
 * and "open AI" is "openai" and not "open"
 * leading to confusions when switching towards AI SDK
 * or switching towards "mistral"
 */
export const PROVIDER_SYNONYMS: Record<string, string> = {
  "mistralai": MISTRAL
};