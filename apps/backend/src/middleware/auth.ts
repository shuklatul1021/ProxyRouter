import type { NextFunction , Request , Response  } from "express";
import jwt from "jsonwebtoken"
import { success } from "zod";


export default async function UserMiddleware(req : Request , res : Response  , next : NextFunction ){
    try{
        const token = req.headers.token as string;
        const VerifyToken = await jwt.verify(token , process.env.JSON_WEB_TOKEN!);
        if(VerifyToken && typeof VerifyToken !== "string" ){
            req.userId = VerifyToken.id;
            next();
        }else{
            res.status(401).send({
                message : "Invalid Token",
                success : false
            })
        } 
        
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message : "Unauthrized User",
            success : false
        })
    }
}