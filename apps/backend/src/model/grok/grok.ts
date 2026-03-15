import type { RouterSchema } from "../../types/type.js";
import { createXai } from '@ai-sdk/xai';
import { generateText } from 'ai';


export async function Grok_Model_Implementation( model : RouterSchema) : Promise<String|undefined>{
    const xai = createXai({ apiKey: process.env.XAI_API_KEY! });
    const { text } = await generateText({
        model: xai.responses(`${model.modelVersion}`),
        system: `${model.systemPrompt}`,
        prompt: `${model.userPrompt}`,
    });
    console.log(text);
    return text;
}