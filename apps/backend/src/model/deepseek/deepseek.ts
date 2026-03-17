import { id } from "zod/locales";
import type { ErrorResponseStucture, RouterSchema, SuccessResponseStucture } from "../../types/type.js";
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY,
});


export async function Deepseek_Model_Implementation( model : RouterSchema) : Promise<SuccessResponseStucture | ErrorResponseStucture>{
    let deepseekResponse : SuccessResponseStucture | ErrorResponseStucture;
    try{
        const response = await openai.chat.completions.create({
            messages: [
                { role: "system", content: `${model.systemPrompt}` },
                { role : "user" , content: `${model.userPrompt}`}
            ],
            model: `${model.modelVersion}`,
        });

        deepseekResponse = {
            id : response.id,
            model : response.model,
            content : [
                {
                    type : "text",
                    text : response.choices[0]?.message.content ?? "",
                }
            ],
            usage : {
                input_token :String(response.usage?.prompt_tokens),
                output_token : String(response.usage?.completion_tokens),
                total_token : String(response.usage?.total_tokens)
            },
            success : true

        }
         
        return deepseekResponse;

    }catch(error){
        const typedError = error as { type?: string; message?: string };
        deepseekResponse = {
            type : "error",
            error : {
                type : typedError.type ?? "openai_error",
                message : typedError.message ?? "Unknown error from OpenAI API"
            },
            success : false
        }
        return deepseekResponse;
    }
    

}