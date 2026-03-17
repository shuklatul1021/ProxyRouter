import Router from "express";
import UserMiddleware from "../middleware/auth.js";
import { success } from "zod";
import { ChatGptModelRouter, ClaudeModelRouter, DeepseekModelRouter, GoogleDeepmindModelRouter, GrokModelRouter } from "../model/router.js";
import type { ErrorResponseStucture, RouterSchema, SuccessResponseStucture } from "../types/type.js";
import { VerifyApiMiddleware } from "../middleware/verifyAPI.js";
const modelRouter = Router();

modelRouter.post(
    "/chat/:model", 
    UserMiddleware, 
    VerifyApiMiddleware, 
    async (req, res) => {
    try{
        const aiModel = req.params.model;
        const { userPrompt , systemPrompt , modelVersion } = req.body;
        if(!userPrompt && !systemPrompt && !aiModel && !modelVersion) {
            return res.status(403).json({
                message : "Require More Data , Go To Documentation For More Info",
                success : false
            })
        };

        let reqModel : RouterSchema | undefined;
        let response : SuccessResponseStucture | ErrorResponseStucture

        switch (aiModel){
            case 'chatgpt':
                reqModel = {
                    systemPrompt : systemPrompt,
                    userPrompt : userPrompt,
                    modelVersion : modelVersion
                };
                response = await ChatGptModelRouter(reqModel);
                break;
                

            case 'claude':
                reqModel = {
                    systemPrompt : systemPrompt,
                    userPrompt : userPrompt,
                    modelVersion : modelVersion
                };
                response = await ClaudeModelRouter(reqModel);
                break;

            case 'deepseek':
                reqModel = {
                    systemPrompt : systemPrompt,
                    userPrompt : userPrompt,
                    modelVersion : modelVersion
                };
                response = await DeepseekModelRouter(reqModel);
                break;

            case 'googledeepmind':
                reqModel = {
                    systemPrompt : systemPrompt,
                    userPrompt : userPrompt,
                    modelVersion : modelVersion
                };
                response = await GoogleDeepmindModelRouter(reqModel);

                break;
            case 'grok':
                reqModel = {
                    systemPrompt : systemPrompt,
                    userPrompt : userPrompt,
                    modelVersion : modelVersion
                };
                response = await GrokModelRouter(reqModel);
                break;

            default:
                return res.status(400).json({
                    message: "Invalid model type",
                    success: false
                });
        }

        console.log(reqModel);
        console.log("The Resposne : " , response);

        if (!reqModel) {
            return res.status(400).json({
                message: "Model data not provided",
                success: false
            });
        }

    }catch(e){
        console.log(e);
        return res.status(500).json({
            message : "Internal Server Error",
            success :  false
        })
    }
} )


export default modelRouter;