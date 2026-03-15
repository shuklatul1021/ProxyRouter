import type { RouterSchema } from "../../types/type.js";
import OpenAI from "openai";

export async function OpenAI_Model_Implementation(model : RouterSchema) : Promise<String|undefined>{
    const client = new OpenAI({
        apiKey : process.env.OPENAI_API_KEY
    });
    const response = await client.responses.create({
        model: `${model.modelVersion}`,
        input: [
            { "role" : "system", "content" : `${model.systemPrompt}` },
            { "role" : "user", "content" : `${model.userPrompt}` }
        ]
    });
    return response.output_text
}