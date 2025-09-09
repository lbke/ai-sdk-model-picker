# ai-sdk-model-picker

NPM library for creating AI model pickers in a standardized fashion based on Vercel AI SDK.

A project vibe coded by [Eric Burel](https://www.ericburel.tech/) at [LBKE, a French training organisation (🇫🇷)](https://www.lbke.fr/) with Claude Code.

## Features

- ✅ Support for official Vercel AI SDK providers
- ✅ List available providers and their models
- ✅ Dynamic model filtering with flexible options
- ✅ Dynamic importing of AI SDK provider packages, using JavaScript `import()`
- ✅ API key name resolution for each provider
- ✅ Provider name synonyms support (e.g., "mistralai" → "mistral")
- ✅ TypeScript support with comprehensive type definitions
- ✅ Works in both Node.js and browser environments

⚠️ Providers list is maintained manually, please contribute!

## Installation

First, install the dependencies for the providers you'll want to support.
This package helps picking a provider and loading the right package,
but won't install the dependencies for you in order to streamline your JS bundle.

```bash
npm install ai 
# Pick the providers you want to support
npm install @ai-sdk/mistral @ai-sdk/openai @ai-sdk/anthropic @ai-sdk/groq @ai-sdk/google
```

💡 Want more providers? Contribute to the providers list!

```bash
npm install ai-sdk-model-picker
```

## Usage

### Basic Usage

```javascript
import { providers, mistralModels, listModels, loadModel, getApiKeyName } from "ai-sdk-model-picker"

// List all available providers
console.log(providers)
// Output: [{name: "openai", packageName: "@ai-sdk/openai", apiKeyName: "OPENAI_API_KEY"}, ...]

// Get models for Mistral provider
console.log(mistralModels)
// Output: [{name: "mistral-large-latest", type: "language", capabilities: {...}}, ...]

// List models for a specific provider
console.log(listModels({provider: "mistralai"}))
// Output: [{provider: "mistralai", models: [{name:"mistral-large-latest", ...}]}]

// List models for multiple providers
console.log(listModels({providers: ["mistralai", "openai"]}))

// List models excluding certain providers/models
console.log(listModels({
  excludedProviders: ["xai"], 
  excludedModels: ["mistralai/codestral-latest"]
}))

// Get API key name for a provider
console.log(getApiKeyName("mistralai"))
// Output: "MISTRAL_API_KEY"

// Load a model dynamically (triggers dynamic import of the provider package)
const modelResult = await loadModel("mistralai/mistral-large-latest")
// This will:
// 1. Dynamically import @ai-sdk/mistral
// 2. Create the model instance: mistral("mistral-large-latest")
// 3. Return {model: <model_instance>, provider: "mistralai", modelName: "mistral-large-latest"}
```

### Advanced Filtering

```javascript
import { listModels } from "ai-sdk-model-picker"

// Filter by model type
const languageModels = listModels({ modelType: 'language' })
const embeddingModels = listModels({ modelType: 'embedding' })
const imageModels = listModels({ modelType: 'image' })

// Complex filtering example
const filteredModels = listModels({
  providers: ["openai", "anthropic", "mistralai"],
  excludedModels: ["gpt-3.5-turbo", "claude-3-haiku-20240307"],
  modelType: "language"
})
```

### Using with Vercel AI SDK

```javascript
import { loadModel, getApiKeyName } from "ai-sdk-model-picker"
import { generateText } from "ai"

// Set up environment variables
const provider = "openai"
const modelName = "gpt-4"
const apiKeyName = getApiKeyName(provider)
console.log(`Make sure to set ${apiKeyName} environment variable`)

// Load and use the model
const { model } = await loadModel(`${provider}/${modelName}`)

const { text } = await generateText({
  model: model,
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
})

console.log(text)
```

### Provider Synonyms

The library supports provider name synonyms for better developer experience:

```javascript
import { listModels, getApiKeyName } from "ai-sdk-model-picker"

// These are equivalent:
console.log(listModels({provider: "mistral"}))
console.log(listModels({provider: "mistralai"}))

// Both return "MISTRAL_API_KEY"
console.log(getApiKeyName("mistral"))
console.log(getApiKeyName("mistralai"))
```

## Supported Providers

This library supports all official AI SDK providers:

| Provider | Package | API Key | Synonyms |
|----------|---------|---------|-----------|
| OpenAI | `@ai-sdk/openai` | `OPENAI_API_KEY` | - |
| Anthropic | `@ai-sdk/anthropic` | `ANTHROPIC_API_KEY` | - |
| Mistral AI | `@ai-sdk/mistral` | `MISTRAL_API_KEY` | `mistral` |
| Groq | `@ai-sdk/groq` | `GROQ_API_KEY` | - |
| xAI Grok | `@ai-sdk/xai` | `XAI_API_KEY` | - |
| Google | `@ai-sdk/google` | `GOOGLE_GENERATIVE_AI_API_KEY` | - |

### Model Types

Models are categorized by type:

- `language`: Text generation models (GPT-4, Claude, etc.)
- `embedding`: Text embedding models
- `image`: Image generation models (DALL-E, etc.)
- `transcription`: Audio transcription models (Whisper)
- `speech`: Text-to-speech models

## API Reference

### `providers: Provider[]`

Array of all available providers with their basic information.

```typescript
interface Provider {
  name: string;
  packageName: string;
  apiKeyName: string;
  synonyms?: string[];
}
```

### `mistralModels: Model[]`

Convenience export for Mistral AI models.

### `listModels(options?: ListModelsOptions): Array<{provider: string, models: Model[]}>`

List models with flexible filtering options.

```typescript
interface ListModelsOptions {
  provider?: string;           // Single provider name
  providers?: string[];        // Multiple provider names
  excludedProviders?: string[]; // Providers to exclude
  excludedModels?: string[];   // Models to exclude (format: "provider/model" or just "model")
  modelType?: 'language' | 'embedding' | 'image' | 'transcription' | 'speech';
}
```

### `loadModel(modelId: string): Promise<LoadModelResult>`

Dynamically load a model from its provider package.

```typescript
interface LoadModelResult {
  model: any;      // The loaded model instance
  provider: string; // Provider name
  modelName: string; // Model name
}
```

**Model ID Format:** `"provider/model"` (e.g., `"openai/gpt-4"`, `"mistralai/mistral-large-latest"`)

### `getApiKeyName(providerName: string): string`

Get the environment variable name for a provider's API key.

## Error Handling

The library provides descriptive error messages for common issues:

```javascript
try {
  const model = await loadModel("invalid/model")
} catch (error) {
  console.error(error.message)
  // "Provider 'invalid' not found"
}

try {
  const apiKey = getApiKeyName("nonexistent")
} catch (error) {
  console.error(error.message)
  // "Provider 'nonexistent' not found"
}
```

## Contributing

Contributions are welcome! The provider data is maintained in `src/data/providers.ts`. To add support for new providers:

1. Add the provider data to `PROVIDERS_DATA`
2. Add any synonyms to `PROVIDER_SYNONYMS`
3. Update the README documentation
4. Add tests for the new provider

You can test the "basic-demo.html" example using `http-server`. Currently, you'll need to manually copy the built "index.mjs" file
in the examples folder.


## License

MIT

---

Based on research from [ai-sdk.dev/providers/ai-sdk-providers](https://ai-sdk.dev/providers/ai-sdk-providers)