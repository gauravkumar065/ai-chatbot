import { openai } from '@ai-sdk/openai';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';
import { createDeepSeek } from '@ai-sdk/deepseek';

import { customMiddleware } from './custom-middleware';

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY ?? '',
});


export const customModel = (apiIdentifier: string) => {
  if (apiIdentifier === 'deepseek-chat') {
    return wrapLanguageModel({
      model: deepseek(apiIdentifier),
      middleware: customMiddleware,
    });
  }
  return wrapLanguageModel({
    model: openai(apiIdentifier),
    middleware: customMiddleware,
  });
};

export const imageGenerationModel = openai.image('dall-e-3');
