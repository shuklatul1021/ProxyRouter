import type { RouterSchema } from "../../types/type.js";
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY,
});


export async function Deepseek_Model_Implementation( model : RouterSchema) : Promise<String | null>{
    const response = await openai.chat.completions.create({
        messages: [
            { role: "system", content: `${model.systemPrompt}` },
            { role : "user" , content: `${model.userPrompt}`}
        ],
        model: `${model.modelVersion}`,
    });
        
    console.log(response);
    // Fix in production
    //@ts-ignore
    return response?.choices[0].message.content;
}