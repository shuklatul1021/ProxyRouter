import Router from "express";
import UserMiddleware from "../middleware/auth.js";
import { success } from "zod";
import {
  ChatGptModelRouter,
  ClaudeModelRouter,
  DeepseekModelRouter,
  GoogleDeepmindModelRouter,
  GrokModelRouter,
} from "../model/router.js";
import type {
  ErrorResponseStucture,
  RouterSchema,
  SuccessResponseStucture,
} from "../types/type.js";
import { VerifyApiMiddleware } from "../middleware/verifyAPI.js";
import { prisma } from "@repo/store/client";
import { id } from "zod/locales";
import { CreditController } from "../controller/credit.controller.js";
const modelRouter = Router();

modelRouter.post(
  "/chat/:model",
  UserMiddleware,
  VerifyApiMiddleware,
  async (req, res) => {
    try {
      const aiModel = req.params.model;
      const userId = req.userId;
      const { userPrompt, systemPrompt, modelVersion } = req.body;
      if (!userPrompt && !systemPrompt && !aiModel && !modelVersion) {
        return res.status(403).json({
          message: "Require More Data , Go To Documentation For More Info",
          success: false,
        });
      }
      console.log("The Request Body : ", userId);
      const user_credit = await prisma.credit.findFirst({ where : { userId : userId }});
      console.log("User Credit : ", user_credit);
      if(!user_credit){
        return res.status(403).json({
          message : "Credit System not Found For User",
          success : false
        })
      }
      if(Number(user_credit.creditAmount) <= 0){
        return res.status(403).json({
          message : "You Does Not Have Credit",
          success : false
        })
      }
      let reqModel: RouterSchema | undefined;
      let response: SuccessResponseStucture | ErrorResponseStucture;

      switch (aiModel) {
        case "chatgpt":
          reqModel = {
            systemPrompt: systemPrompt,
            userPrompt: userPrompt,
            modelVersion: modelVersion,
          };
          response = await ChatGptModelRouter(reqModel);
          break;

        case "claude":
          reqModel = {
            systemPrompt: systemPrompt,
            userPrompt: userPrompt,
            modelVersion: modelVersion,
          };
          response = await ClaudeModelRouter(reqModel);
          break;

        case "deepseek":
          reqModel = {
            systemPrompt: systemPrompt,
            userPrompt: userPrompt,
            modelVersion: modelVersion,
          };
          response = await DeepseekModelRouter(reqModel);
          break;

        case "googledeepmind":
          reqModel = {
            systemPrompt: systemPrompt,
            userPrompt: userPrompt,
            modelVersion: modelVersion,
          };
          response = await GoogleDeepmindModelRouter(reqModel);
          break;
        case "grok":
          reqModel = {
            systemPrompt: systemPrompt,
            userPrompt: userPrompt,
            modelVersion: modelVersion,
          };
          response = await GrokModelRouter(reqModel);
          break;

        default:
          return res.status(400).json({
            message: "Invalid model type",
            success: false,
          });
      }
  
      if (response.success) {
        const userCredit = CreditController(Number(response.usage.input_token), Number(response.usage.output_token), aiModel)
        const updatedCredit = Number(user_credit.creditAmount) - userCredit;
        console.log("Credit Used : ", userCredit);
        console.log("Updated Credit : ", updatedCredit);
        await prisma.credit.update({ data : { creditAmount : updatedCredit.toString() } , where : { userId : userId }});
        const createUsage = await prisma.usage.create({ 
          data : { usageContent : JSON.stringify(response), creditId : user_credit.id, modelname : aiModel, modelversion : String(reqModel.modelVersion), credit_used : String(userCredit)}
        });

        if(createUsage){
          console.log("Usage Created Successfully");
        }
        return res.status(200).json({
          response
        });
      }

      if (!response.success) {
        return res.status(403).json({
          response
        });
      }

      if (!reqModel) {
        return res.status(400).json({
          message: "Model data not provided",
          success: false,
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  },
);

export default modelRouter;

