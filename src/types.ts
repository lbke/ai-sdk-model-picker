export interface Provider {
  name: string;
  packageName: string;
  apiKeyName: string;
  synonyms?: string[];
}

export interface Model {
  name: string;
  type?: 'language' | 'embedding' | 'image' | 'transcription' | 'speech';
  capabilities?: ModelCapabilities;
}

export interface ModelCapabilities {
  textGeneration?: boolean;
  imageInput?: boolean;
  objectGeneration?: boolean;
  toolUsage?: boolean;
  streaming?: boolean;
}

export interface ProviderWithModels extends Provider {
  models: Model[];
}

export interface findModelsOptions {
  /** We always use a list of providers */
  providers?: string[];
  excludedProviders?: string[];
  excludedModels?: string[];
  modelType?: Model['type'];
}

export interface listProviderModelsOptions {
  /** We always get a single provider */
  provider: string;
  excludedProviders?: string[];
  excludedModels?: string[];
  modelType?: Model['type'];
}

export interface LoadModelResult {
  model: any;
  provider: string;
  modelName: string;
}