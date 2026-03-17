import type { ErrorResponseStucture, RouterSchema, SuccessResponseStucture } from "../../types/type.js";
import OpenAI from "openai";

export async function OpenAI_Model_Implementation(model : RouterSchema) : Promise<SuccessResponseStucture | ErrorResponseStucture>{
    let gptResponse : SuccessResponseStucture | ErrorResponseStucture ;
    const client = new OpenAI({
        apiKey : process.env.OPENAI_API_KEY
    });
    try{
        const response = await client.responses.create({
            model: `${model.modelVersion}`,
            input: [
                { "role" : "system", "content" : `${model.systemPrompt}` },
                { "role" : "user", "content" : `${model.userPrompt}` }
            ]
        });
        gptResponse = {
        id : response.id,
        model : response.model,
        content : [
            {
                type : "text",
                //@ts-ignore
                text : response.choices[0].message.content
            }
        ],
        usage : {
            input_token : String(response.usage?.input_tokens),
            output_token : String(response.usage?.output_tokens),
            total_token : String(response.usage?.total_tokens)        
        },
        success : true
    }
    return gptResponse;

    }catch(error){
        const typedError = error as { type?: string; message?: string };
        gptResponse = {
            type : "error",
            error : {
                type : typedError.type ?? "openai_error",
                message : typedError.message ?? "Unknown error from OpenAI API"
            },
            success : false
        }
        return gptResponse;
    } 
}