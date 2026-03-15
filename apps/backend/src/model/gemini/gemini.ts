import type { RouterSchema } from "../../types/type.js";
import { GoogleGenAI } from "@google/genai";

export async function Gemini_Model_Implementation( model : RouterSchema) : Promise<String|undefined>{
    const ai = new GoogleGenAI({
        apiKey : process.env.GEMINI_API_KEY!
    });
    const response = await ai.models.generateContent({
        model: `${model.modelVersion}`,
        contents: `${model.userPrompt}`,
    });

    console.log(response.text);
    return response.text;
}