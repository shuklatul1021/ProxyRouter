import Router from "express";
import UserMiddleware from "../middleware/auth.js";
import { GenerateApiKey } from "../utils/APIKeyGenerator.js";
import { prisma } from "@repo/store/client";
const userRouter = Router();

userRouter.post(
    "/generate-api", 
    UserMiddleware, 
    async (req, res) => {
    try{
        const userId = req.userId;
        const { title } = req.body;
        const api_key = GenerateApiKey();
        if(!api_key){
            return res.status(402).json({
                message : "Error While Creating API Key",
                success : false
            })
        }

        const checkApiKey = await prisma.apiKey.findFirst({
            where : { api_token : api_key, userId : userId }
        });

        if(checkApiKey){
            return res.status(402).json({
                message : "API Key Is Already Present",
                success : false
            })
        }

        const generate_api = await prisma.apiKey.create({
            data : { userId : userId, api_token : api_key, title : title }
        });

        if(!generate_api){
            return res.status(402).json({
                message : "Error While Creating API Key",
                success : false
            })
        }

        return res.status(200).json({
            message : "API Key Successfully Created",
            api_key : api_key,
            success : true
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message : "Internal Server Error",
            success : false
        })
    }
});

userRouter.get(
    "/get-api", 
    UserMiddleware, 
    async (req, res) => {
    try{
        const UserId = req.userId;
        const getUserApiToken = await prisma.apiKey.findMany({
            where : { userId : UserId }
        });

        if(!getUserApiToken){
            return res.status(401).json({
                message : "Error While Getting User API Key",
                success : false
            })
        }

        if(getUserApiToken.length <= 0){
            return res.status(200).json({
                message : "No API Key Found",
                success : true
            })
        };

        return res.status(200).json({
            message : "Retrived User API Key Successfully",
            api_key : getUserApiToken,
            success : false
        });

    }catch(e){
        console.log(e);
        return res.status(500).json({
            message : "Internal Server Error",
            success : false
        })
    }
});


userRouter.get(
    "/get-user", 
    UserMiddleware, 
    async (req, res) => {
    try{
        const userId = req.userId;
        const getUser = await prisma.user.findFirst({
            where : { id : userId }
        });

        if(!getUser){
            return res.status(403).json({
                message : "Errror While Getting Details",
                success : false
            })
        };

        return res.status(200).json({
            message : "User Info Fetched Successfully",
            user : getUser,
            success : false
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message : "Internal Server Error",
            success : false
        });
    }
})



export default userRouter;