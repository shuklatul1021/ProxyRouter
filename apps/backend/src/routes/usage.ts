import Router from "express";
import UserMiddleware from "../middleware/auth.js";
import { prisma } from "@repo/store/client";
const usageRouter = Router();

usageRouter.get("/get-usage", UserMiddleware ,async ( req, res ) => {
    try{
        const userid = req.userId;
        if(!userid){
            return res.status(403).json({
                message : "Unauthorized User",
                success : false
            })
        }

        const usage = await prisma.usage.findMany({ where : { credit : { userId : userid } }, orderBy : { createdAt : "desc" } });
        if(!usage){
            return res.status(404).json({
                message : "No Usage Found",
                success : false
            })
        }
        return res.status(200).json({
            usage,
            message : "Usage Fetched Successfully",
            success : true
        })

    }catch(e){
        console.log(e);
        return res.status(500).json({
            message : "Internal Server Error",
            success : false
        })
    }
});


export default usageRouter;


