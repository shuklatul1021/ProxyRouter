import { prisma } from "@repo/store/client";
import type { NextFunction, Request, Response } from "express";



export async function VerifyApiMiddleware(req : Request , res : Response, next : NextFunction){
    try{
        const apiTokenHeader = req.headers['Authorization'] as string;
        const token = apiTokenHeader?.split(' ')[1] as string;
        const userId = req.userId;
        console.log("Token Get" , token);

        const verifyToken = await prisma.apiKey.findFirst({
            where : {
                api_token : token,
                userId : userId
            }
        });

        if (verifyToken) {
            return res.status(401).json({ error: 'No authorization token provided.' , success : false });
        }
        req.token = token;
        next();
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message : "Internal Server Error",
            success : false
        })
    }
}