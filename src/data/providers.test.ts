import { test, describe } from 'node:test';
import assert from 'node:assert';
import { PROVIDERS_DATA, PROVIDER_SYNONYMS } from './providers';

describe('Providers Data', () => {
  
  describe('PROVIDERS_DATA', () => {
    test('should be a non-empty array', () => {
      assert(Array.isArray(PROVIDERS_DATA));
      assert(PROVIDERS_DATA.length > 0);
    });

    test('should have valid provider structure', () => {
      PROVIDERS_DATA.forEach(provider => {
        assert(typeof provider.name === 'string');
        assert(typeof provider.packageName === 'string');
        assert(typeof provider.apiKeyName === 'string');
        assert(Array.isArray(provider.models));
        assert(provider.models.length > 0);
        
        if (provider.synonyms) {
          assert(Array.isArray(provider.synonyms));
        }
      });
    });

    test('should have unique provider names', () => {
      const names = PROVIDERS_DATA.map(p => p.name);
      const uniqueNames = new Set(names);
      assert.strictEqual(names.length, uniqueNames.size);
    });

    test('should have valid model structure', () => {
      PROVIDERS_DATA.forEach(provider => {
        provider.models.forEach(model => {
          assert(typeof model.name === 'string');
          
          if (model.type) {
            const validTypes = ['language', 'embedding', 'image', 'transcription', 'speech'];
            assert(validTypes.includes(model.type));
          }
          
          if (model.capabilities) {
            const capabilities = model.capabilities;
            Object.keys(capabilities).forEach(key => {
              assert(typeof capabilities[key as keyof typeof capabilities] === 'boolean');
            });
          }
        });
      });
    });

    test('should include expected providers', () => {
      const providerNames = PROVIDERS_DATA.map(p => p.name);
      
      assert(providerNames.includes('openai'));
      assert(providerNames.includes('anthropic'));
      assert(providerNames.includes('mistral'));
      assert(providerNames.includes('groq'));
      // Voluntarily disavbled see providers list
      // assert(providerNames.includes('xai'));
      assert(providerNames.includes('google'));
    });

    /*
    This is not true for community package that we may want to support later on
    test('should have consistent package naming', () => {
      PROVIDERS_DATA.forEach(provider => {
        assert(provider.packageName.startsWith('@ai-sdk/'));
      });
    });
    */
  });

});