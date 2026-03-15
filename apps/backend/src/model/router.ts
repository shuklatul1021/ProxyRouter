import model from "../routes/model.js";
import type { RouterSchema } from "../types/type.js";
import { OpenAI_Model_Implementation } from "./chatgpt/chagpt.js";
import { Claude_Model_Implementation } from "./claude/claude.js";
import { Deepseek_Model_Implementation } from "./deepseek/deepseek.js";
import { Gemini_Model_Implementation } from "./gemini/gemini.js";
import { Grok_Model_Implementation } from "./grok/grok.js";


export async function ChatGptModelRouter( model : RouterSchema) : Promise<String|undefined>{
    if(!model.userPrompt){
        return "User Input Require"
    }

    if(
        model.modelVersion === 'gpt-5.4' || 
        model.modelVersion === 'gpt-5' || 
        model.modelVersion === 'gpt-4.1' ||
        model.modelVersion === 'gpt-4o'
    ){
        const response = await OpenAI_Model_Implementation(model);
        return response; 
    }
    return "Plese Provide Valid Gpt Model"
    
}
export async function ClaudeModelRouter( model : RouterSchema) : Promise<String|undefined>{
    if(
        model.modelVersion === 'claude-3-opus' || 
        model.modelVersion === 'claude-3-sonnet' || 
        model.modelVersion === 'claude-3-haiku' ||
        model.modelVersion === 'claude-3.5-sonnet' ||
        model.modelVersion === 'claude-3.5-haiku'
    ){
        const response = await Claude_Model_Implementation(model);
        return response; 
    }
    return "Plese Provide Valid Claude Model"
}
export async function DeepseekModelRouter( model : RouterSchema)  : Promise<String|undefined> {
    if(
        model.modelVersion === 'deepseek-chat' || 
        model.modelVersion === 'deepseek-coder' || 
        model.modelVersion === 'deepseek-coder-v2' 
    ){
        const response = await Deepseek_Model_Implementation(model);
        if(response){
            return response; 
        }
        return undefined;
    }
    return "Plese Provide Valid Claude Model"
}
export async function GoogleDeepmindModelRouter( model : RouterSchema)  : Promise<String|undefined> {
    if(
        model.modelVersion === 'gemini-1.0-pro' || 
        model.modelVersion === 'gemini-1.5-pro' || 
        model.modelVersion === 'gemini-1.5-flash' ||
        model.modelVersion === 'gemini-2.0-pro' ||
        model.modelVersion === 'gemini-2.0-flash'
    ){
        const response = await Gemini_Model_Implementation(model);
        return response; 
    }
    return "Plese Provide Valid Claude Model"
}
export async function GrokModelRouter( model : RouterSchema)  : Promise<String|undefined>{
    if(
        model.modelVersion === 'grok-1' || 
        model.modelVersion === 'grok-1.5' || 
        model.modelVersion === 'grok-beta'
    ){
        const response = await Grok_Model_Implementation(model);
        return response; 
    }
    return "Plese Provide Valid Claude Model"
}