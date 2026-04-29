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
const modelRouter = Router();

modelRouter.get("/testingheader", UserMiddleware, VerifyApiMiddleware, async (req, res) => {
    try{
        const token = req.token;
        res.status(200).json({ token });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
});

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

      const user_credit = await prisma.credit.findFirst({ where : { userId : userId }});
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
        const amountDebited = response.usage.total_token;
        const creditUsed = Number(amountDebited) * (0.0000001);
        const updatedCredit = Number(user_credit.creditAmount) - creditUsed
        console.log("Credit Used : ", creditUsed);
        console.log("Credit Used : ", updatedCredit);

        const UpdateUserCredit = prisma.credit.update({ data : { creditAmount : updatedCredit.toString() } , where : { userId : userId }});

        
        return res.status(200).json({
          response
        });
      }

      if (!response.success) {
        return res.status(403).json({
          response
        });
      }

      console.log(reqModel);
      console.log("The Resposne : ", response);

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

