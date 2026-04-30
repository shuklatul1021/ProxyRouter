import { prisma } from "@repo/store/client";
import type { NextFunction, Request, Response } from "express";

export async function VerifyApiMiddleware(req : Request , res : Response, next : NextFunction){
    try{
        const apiTokenHeader = req.get('x-api-key') as string;
        console.log("Token Get" , apiTokenHeader);
        const userId = req.userId;
    
    
        const verifyToken = await prisma.apiKey.findFirst({
            where : {
                api_token : apiTokenHeader,
                userId : userId
            }
        });


        if (!verifyToken) {
            return res.status(401).json({ error: 'Invalid authorization Api Key.' , success : false });
        }

        req.token = apiTokenHeader;
        next();   
       
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message : "Internal Server Error",
            success : false
        })
    }
}