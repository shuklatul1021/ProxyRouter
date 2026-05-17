import { verifyClaudeModelVersion, verifyDeepseekModelVersion, verifyGoogleDeepmindModelVersion, verifyGPTModelVersion, verifyGrokModelVersion } from "../controller/modelversion.controller.js";
import type { ErrorResponseStucture, RouterSchema, SuccessResponseStucture } from "../types/type.js";
import { OpenAI_Model_Implementation } from "./chatgpt/chagpt.js";
import { Claude_Model_Implementation } from "./claude/claude.js";
import { Deepseek_Model_Implementation } from "./deepseek/deepseek.js";
import { Gemini_Model_Implementation } from "./gemini/gemini.js";
import { Grok_Model_Implementation } from "./grok/grok.js";

export async function ChatGptModelRouter( model : RouterSchema) : Promise<SuccessResponseStucture | ErrorResponseStucture>{
    let response : SuccessResponseStucture | ErrorResponseStucture;
    if(!model.userPrompt){
        response = {
            type : "Error",
            error : {
                type : "user_prompt_not_defined",
                message : "User Response Require To Access API"
            },
            success : false
        }
        return response;
    }

    if(verifyGPTModelVersion(model.modelVersion as string)){
        const response = await OpenAI_Model_Implementation(model);
        return response; 
    }
    response = {
        type : "error",
        error : {
            type : "not_valid_gpt_model_version",
            message : "Require Valid GPT Model Version "
        },
        success : false
    }
    return response;
    
}

export async function ClaudeModelRouter( model : RouterSchema) : Promise<SuccessResponseStucture | ErrorResponseStucture>{
    let response : SuccessResponseStucture | ErrorResponseStucture;
    if(!model.userPrompt){
        response = {
            type : "Error",
            error : {
                type : "user_prompt_not_defined",
                message : "User Response Require To Access API"
            },
            success : false
        }
        return response;
    }
    if(verifyClaudeModelVersion(model.modelVersion as string)){
        const response = await Claude_Model_Implementation(model);
        return response; 
    }
    response = {
        type : "error",
        error : {
            type : "not_valid_gpt_model_version",
            message : "Require Valid Claude Model Version "
        },
        success : false
    }
    return response;
}
export async function DeepseekModelRouter( model : RouterSchema)  : Promise<SuccessResponseStucture | ErrorResponseStucture> {
    let response : SuccessResponseStucture | ErrorResponseStucture;
    if(!model.userPrompt){
        response = {
            type : "Error",
            error : {
                type : "user_prompt_not_defined",
                message : "User Response Require To Access API"
            },
            success : false
        }
        return response;
    }
    if(verifyDeepseekModelVersion(model.modelVersion as string)){
        const response = await Deepseek_Model_Implementation(model);
        if(response){
            return response; 
        }
    }
    response = {
        type : "error",
        error : {
            type : "not_valid_gpt_model_version",
            message : "Require Valid Deepseek Model Version "
        },
        success : false
    }
    return response;
}

export async function GoogleDeepmindModelRouter( model : RouterSchema) : Promise<SuccessResponseStucture | ErrorResponseStucture> {
    let response : SuccessResponseStucture | ErrorResponseStucture ;
    if(!model.userPrompt){
        response = {
            type : "Error",
            error : {
                type : "user_prompt_not_defined",
                message : "User Response Require To Access API"
            },
            success : false
        }
        return response;
    }
    if(verifyGoogleDeepmindModelVersion(model.modelVersion as string)){
        const response = await Gemini_Model_Implementation(model);
        return response; 
    }
    response = {
        type : "error",
        error : {
            type : "not_valid_gpt_model_version",
            message : "Require Valid Gemini Deepmind Model Version "
        },
        success : false
    }
    return response;
}
export async function GrokModelRouter( model : RouterSchema)  : Promise<SuccessResponseStucture | ErrorResponseStucture>{
    let response : SuccessResponseStucture | ErrorResponseStucture ;
    if(!model.userPrompt){
        response = {
            type : "Error",
            error : {
                type : "user_prompt_not_defined",
                message : "User Response Require To Access API"
            },
            success : false
        }
        return response;
    }
    if(verifyGrokModelVersion(model.modelVersion as string)){
        const response = await Grok_Model_Implementation(model);
        return response; 
    }
    response = {
        type : "error",
        error : {
            type : "not_valid_gpt_model_version",
            message : "Require Valid Grok Model Version "
        },
        success : false
    }
    return response;
}