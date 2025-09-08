# ai-sdk-model-provider

This NPM library helps creating AI model pickers in a standardized fashion.

## Technological choices

- Based on Vercel AI SDK
- NPM package so JavaScript
- Should work in Node.js but also client-side
- TypeScript for typing
- Future-proof type structure : for instance we should be able to add new fields to the data structure representing a model later on

## Features

- Allows importing a list of providers
- Allows importing a list of models for a given provider
- Allows dynamically getting a list of models with a filter (using a function, so the provider can be set dynamically). For now support filtering on a single provider or a list of providers, and allow excluding a list of providers or models.
- Allows dynamically importing the relevant NPM module for a given provider (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
- Allow getting the API key name for a given provider

Example code using all features:

```js
import { providers, mistralModels, listModels, loadModel, getApiKeyName } from "ai-sdk-model-picker"
// [{name: "mistralai"}, {name: "openai"}]
console.log(providers)
// [{name: "mistral-medium-2509"}]
console.log(mistralModels)
// [{provider: "mistralai", models: [{name:"mistral-medium-2508"}]}]
console.log(listModels({provider: "mistralai"}))
console.log(listModels({providers: ["mistralai", "openai"]}))
console.log(listModels({excludedProviders: ["xai"], excludedModels:["mistralai/codestral-latest"]})
// MISTRAL_API_KEY
console.log(getApiKeyName("mistralai")) 

// This should trigger a dynamic load of the relevant @ai-sdk/* package
// or community package
// and then return the result of "mistral("mistral-medium-2508")
const model = await loadModel("mistralai/mistral-medium-2508")
```
- Allow synonymous providers name : "mistral" and "mistralai" should both work
- Write a readme with explanations and demo usage.

## Supported providers

Support all the official providers listed on this page : https://ai-sdk.dev/providers/ai-sdk-providers

Support all the community providers listed on this page bottom section : https://ai-sdk.dev/providers/ai-sdk-providers

