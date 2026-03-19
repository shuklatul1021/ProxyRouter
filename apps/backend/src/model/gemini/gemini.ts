import { ca } from "zod/locales";
import type { ErrorResponseStucture, RouterSchema, SuccessResponseStucture } from "../../types/type.js";
import { GoogleGenAI } from "@google/genai";

export async function Gemini_Model_Implementation( model : RouterSchema) : Promise<SuccessResponseStucture | ErrorResponseStucture>{
    const ai = new GoogleGenAI({
        apiKey : process.env.GEMINI_API_KEY!
    });
    try{
        const response = await ai.models.generateContent({
            model: `${model.modelVersion}`,
            contents: `${model.userPrompt}`,
        });

        const geminiSuccessResponse : SuccessResponseStucture = {
            id : String(response.responseId),
            model : String(response.modelVersion),
            content  : [
                {
                    type : "text",
                    text : String(response.text)
                }
            ],
            usage : {
                input_token : String(response.usageMetadata?.promptTokenCount ?? 0),
                output_token : String(response.usageMetadata?.candidatesTokenCount ?? 0),
                total_token : String(response.usageMetadata?.totalTokenCount ?? 0)
            },
            success : true
        };
        return geminiSuccessResponse;

    }catch(error){
        console.log("Error in Gemini_Model_Implementation:", error);
        const typedError = error as { type?: string; message?: string };
        const geminiErrorResponse : ErrorResponseStucture = {
            type : "error",
            error : {
                type : typedError.type ?? "gemini_error",
                message : typedError.message ?? "Unknown error from Gemini API"
            },
            success : false
        }
        return geminiErrorResponse;
    }
    
}