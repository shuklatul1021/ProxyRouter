import type { ErrorResponseStucture, RouterSchema, SuccessResponseStucture } from "../../types/type.js";
import { createXai } from '@ai-sdk/xai';
import { generateText } from 'ai';

export async function Grok_Model_Implementation( model : RouterSchema) : Promise<SuccessResponseStucture | ErrorResponseStucture>{
    const xai = createXai({ apiKey: process.env.XAI_API_KEY! });
    try{
        const response = await generateText({
            model: xai.responses(`${model.modelVersion}`),
            system: `${model.systemPrompt}`,
            prompt: `${model.userPrompt}`,
        });
        const grokResult : SuccessResponseStucture = {
            id : response.text,
            model : "grok",
            content : [
                {
                    type : "text",
                    text : response.text
                }
            ],
            usage : {
                input_token : "vvc",
                output_token : "cxc",
                total_token : "vd"
            },
            success: true
        }
        return grokResult;
    }catch(err){
        console.log(err);
        const typedError = err as { type?: string; message?: string };
        const grokErrorResponse : ErrorResponseStucture = {
            type : "error",
            error : {
                type : typedError.type ?? "gemini_error",
                message : typedError.message ?? "Unknown error from Gemini API"
            },
            success : false
        }
        return grokErrorResponse;
    }
}