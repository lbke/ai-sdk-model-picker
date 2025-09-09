import { PROVIDERS_DATA, PROVIDER_SYNONYMS } from './data/providers';
import type { Provider, Model, ListModelsOptions, LoadModelResult, ProviderWithModels } from './types';

export const providers: Provider[] = PROVIDERS_DATA.map(({ models, ...provider }) => provider);

export const mistralModels: Model[] = PROVIDERS_DATA.find(p => p.name === 'mistral')?.models || [];

function normalizeProviderName(providerName: string): string {
  return PROVIDER_SYNONYMS[providerName] || providerName;
}

function findProvider(providerName: string): ProviderWithModels | undefined {
  const normalizedName = normalizeProviderName(providerName);
  return PROVIDERS_DATA.find(p => p.name === normalizedName);
}

export function listModels(options: ListModelsOptions = {}): Array<{provider: string, models: Model[]}> {
  let providersToInclude: ProviderWithModels[] = [];

  if (options.provider) {
    const provider = findProvider(options.provider);
    if (provider) {
      providersToInclude = [provider];
    }
  } else if (options.providers) {
    providersToInclude = options.providers
      .map(name => findProvider(name))
      .filter((p): p is ProviderWithModels => p !== undefined);
  } else {
    providersToInclude = PROVIDERS_DATA;
  }

  if (options.excludedProviders) {
    const excludedNormalized = options.excludedProviders.map(name => normalizeProviderName(name));
    providersToInclude = providersToInclude.filter(p => !excludedNormalized.includes(p.name));
  }

  return providersToInclude.map(provider => {
    let models = provider.models;
    
    if (options.modelType) {
      models = models.filter(model => model.type === options.modelType);
    }
    
    if (options.excludedModels) {
      const excludedModels = options.excludedModels.map(modelName => {
        if (modelName.includes('/')) {
          return modelName.split('/')[1];
        }
        return modelName;
      });
      models = models.filter(model => !excludedModels.includes(model.name));
    }
    
    return {
      provider: provider.name,
      models
    };
  }).filter(result => result.models.length > 0);
}

export async function loadModel(modelId: string): Promise<LoadModelResult> {
  const [providerName, modelName] = modelId.includes('/') 
    ? modelId.split('/', 2) 
    : ['', modelId];

  if (!providerName) {
    throw new Error(`Invalid model ID format: ${modelId}. Expected format: 'provider/model'`);
  }

  const provider = findProvider(providerName);
  if (!provider) {
    throw new Error(`Provider '${providerName}' not found`);
  }

  const model = provider.models.find(m => m.name === modelName);
  if (!model) {
    throw new Error(`Model '${modelName}' not found for provider '${providerName}'`);
  }

  try {
    const providerModule = await import(provider.packageName);
    const providerInstance = providerModule[provider.name] || providerModule.default;
    
    if (!providerInstance) {
      throw new Error(`No default export found for provider package: ${provider.packageName}`);
    }

    let loadedModel;
    if (model.type === 'embedding') {
      loadedModel = providerInstance.textEmbedding ? 
        providerInstance.textEmbedding(modelName) : 
        providerInstance(modelName);
    } else if (model.type === 'image') {
      loadedModel = providerInstance.image ? 
        providerInstance.image(modelName) : 
        providerInstance(modelName);
    } else {
      loadedModel = providerInstance(modelName);
    }

    return {
      model: loadedModel,
      provider: provider.name,
      modelName: modelName
    };
  } catch (error) {
    throw new Error(`Failed to load model '${modelId}': ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function getApiKeyName(providerName: string): string {
  const provider = findProvider(providerName);
  if (!provider) {
    throw new Error(`Provider '${providerName}' not found`);
  }
  return provider.apiKeyName;
}

export * from './types';
export { PROVIDERS_DATA, ANTHROPIC, GOOGLE, GROQ, MISTRAL, OPENAI } from './data/providers';