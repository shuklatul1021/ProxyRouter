import type { RouterSchema } from "../../types/type.js";
import Anthropic from "@anthropic-ai/sdk";

export async function Claude_Model_Implementation( model : RouterSchema) : Promise<String|undefined>{
    const anthropic = new Anthropic();
    const response = await anthropic.messages.create({
        model: `${model.modelVersion}`,
        max_tokens: 1000,
        system : `${model.systemPrompt}`,
        messages: [
                { role: "user", content:`${model.userPrompt}` },
            ]
    });
    console.log(response);
    //Todo : Fix it In Production 
    //@ts-ignore
    return response?.content[0]?.text as String;
}