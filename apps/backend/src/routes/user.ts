import Router from "express";
import UserMiddleware from "../middleware/auth.js";
import { GenerateApiKey } from "../utils/APIKeyGenerator.js";
import { prisma } from "@repo/store/client";
const userRouter = Router();

userRouter.post("/create-api" , UserMiddleware , async (req, res)=>{
    try{
        const userId = req.userId;
        const api_key = GenerateApiKey();
        if(!api_key){
            return res.status(402).json({
                message : "Error While Creating API Key",
                success : false
            })
        }

        const generate_api = await prisma.user.update({
            data : {
                
            },
            where : {
                id : userId
            }
        })


    }catch(e){
        console.log(e);
        return res.status(500).json({
            message : "Internal Server Error",
            success : false
        })
    }
})

export default userRouter;