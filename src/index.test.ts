import { test, describe } from "node:test";
import assert from "node:assert";
import {
  providers,
  mistralModels,
  findModels,
  loadModel,
  getApiKeyName,
} from "./index";

describe("AI SDK Model Picker", () => {
  describe("providers export", () => {
    test("should export providers array without models", () => {
      assert(Array.isArray(providers));
      assert(providers.length > 0);

      const provider = providers[0];
      assert("name" in provider);
      assert("packageName" in provider);
      assert("apiKeyName" in provider);
      assert(!("models" in provider));
    });

    test("should include expected providers", () => {
      const providerNames = providers.map((p) => p.name);
      assert(providerNames.includes("openai"));
      assert(providerNames.includes("anthropic"));
      assert(providerNames.includes("mistral"));
    });
  });

  describe("mistralModels export", () => {
    test("should export mistral models array", () => {
      assert(Array.isArray(mistralModels));
      assert(mistralModels.length > 0);

      const model = mistralModels[0];
      assert("name" in model);
      assert("type" in model);
    });
  });

  describe("findModels function", () => {
    test("should return all providers and models when no options provided", () => {
      const result = findModels();

      assert(Array.isArray(result));
      assert(result.length > 0);

      const firstProvider = result[0];
      assert("provider" in firstProvider);
      assert("models" in firstProvider);
      assert(Array.isArray(firstProvider.models));
    });

    test("should filter by single provider", () => {
      const result = findModels({ provider: "openai" });

      assert.strictEqual(result.length, 1);
      assert.strictEqual(result[0].provider, "openai");
      assert(result[0].models.length > 0);
    });

    test("should handle provider synonyms", () => {
      const result = findModels({ provider: "mistralai" });

      assert.strictEqual(result.length, 1);
      assert.strictEqual(result[0].provider, "mistral");
    });

    test("should filter by multiple providers", () => {
      const result = findModels({ providers: ["openai", "anthropic"] });

      assert.strictEqual(result.length, 2);
      const providerNames = result.map((r) => r.provider);
      assert(providerNames.includes("openai"));
      assert(providerNames.includes("anthropic"));
    });

    test("should exclude providers", () => {
      const result = findModels({ excludedProviders: ["openai"] });

      const providerNames = result.map((r) => r.provider);
      assert(!providerNames.includes("openai"));
    });

    test("should filter by model type", () => {
      const result = findModels({ modelType: "embedding" });

      result.forEach((providerResult) => {
        providerResult.models.forEach((model) => {
          assert.strictEqual(model.type, "embedding");
        });
      });
    });

    test("should exclude specific models", () => {
      const result = findModels({
        provider: "openai",
        excludedModels: ["gpt-4o", "openai/gpt-4"],
      });

      const modelNames = result[0].models.map((m) => m.name);
      assert(!modelNames.includes("gpt-4o"));
      assert(!modelNames.includes("gpt-4"));
    });

    test("should return empty array for unknown provider", () => {
      const result = findModels({ provider: "unknown" });
      assert.strictEqual(result.length, 0);
    });
  });

  describe("loadModel function", () => {
    test("should throw error for invalid model ID format (string)", async () => {
      await assert.rejects(
        loadModel("invalid-model-id"),
        /Invalid model ID format/
      );
    });

    test("should throw error for invalid model ID format (object)", async () => {
      await assert.rejects(
        loadModel({ modelId: "invalid-model-id" }),
        /Invalid model ID format/
      );
    });

    test("should throw error for unknown provider (string)", async () => {
      await assert.rejects(
        loadModel("unknown/model"),
        /Provider 'unknown' not found/
      );
    });

    test("should throw error for unknown provider (object with modelId)", async () => {
      await assert.rejects(
        loadModel({ modelId: "unknown/model" }),
        /Provider 'unknown' not found/
      );
    });

    test("should throw error for unknown provider (object with provider/model)", async () => {
      await assert.rejects(
        loadModel({ provider: "unknown", model: "model" }),
        /Provider 'unknown' not found/
      );
    });

    test("should throw error for unknown model (string)", async () => {
      await assert.rejects(
        loadModel("openai/unknown-model"),
        /Model 'unknown-model' not found for provider 'openai'/
      );
    });

    test("should throw error for unknown model (object with modelId)", async () => {
      await assert.rejects(
        loadModel({ modelId: "openai/unknown-model" }),
        /Model 'unknown-model' not found for provider 'openai'/
      );
    });

    test("should throw error for unknown model (object with provider/model)", async () => {
      await assert.rejects(
        loadModel({ provider: "openai", model: "unknown-model" }),
        /Model 'unknown-model' not found for provider 'openai'/
      );
    });

    // Note: We can't test successful model loading without mocking imports
    // since the actual provider packages may not be installed
  });

  describe("getApiKeyName function", () => {
    test("should return correct API key name for known provider", () => {
      const apiKey = getApiKeyName("openai");
      assert.strictEqual(apiKey, "OPENAI_API_KEY");
    });

    test("should handle provider synonyms", () => {
      const apiKey = getApiKeyName("mistral");
      assert.strictEqual(apiKey, "MISTRAL_API_KEY");
    });

    test("should throw error for unknown provider", () => {
      assert.throws(
        () => getApiKeyName("unknown"),
        /Provider 'unknown' not found/
      );
    });
  });
});
