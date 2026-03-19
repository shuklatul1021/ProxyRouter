import Router from "express";
import { loginSchema, signupSchema } from "../types/schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { prisma } from "@repo/store/client";
import UserMiddleware from "../middleware/auth.js";
import { success } from "zod";
const authRouter = Router();

authRouter.post("/sign-up" , async (req , res) => {
    try{
        const { success , data } = signupSchema.safeParse(req.body);
        if(!success){
            return res.status(403).json({
                message : "Plese Provide In Right Format",
                success : false
            })
        };

        const user = await prisma.user.findFirst({where: { email : data.email }});
        if(user){
            res.status(409).json({
                message : "User Alredy Exists",
                success : false
            })
        };
        const Hashpassword = await bcrypt.hash(data.password, 10);
        const createUser = await prisma.user.create({
            data : {
                email : data.email,
                password : Hashpassword,
                name : data.name,
                username : data.username,
                companyName : data.companyName
            }
        });

        await prisma.credit.create({
            data : {
                creditAmount : "0",
                userId : createUser.id,
            }
        });

        if(!createUser){
            res.status(404).json({
                message : "Error While Creating",
                success : false
            })
        };

        return res.status(200).json({
            message : "Account Created Successfully",
            success : true
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message : "Internal Server Error",
            success : false
        })
    }
})


authRouter.post("/log-in" , async (req , res) => {
    try{
        const { success , data } = loginSchema.safeParse(req.body);
        if(!success){
            return res.status(403).json({
                message : "Plese Provide In Right Format",
                success : false
            })
        };

        const user = await prisma.user.findFirst({where: { email : data.email }});
        if(!user){
            return res.status(404).json({
                message : "User Not Found",
                success : false
            })
        };

        const verifyPassword = await bcrypt.compare(data.password , user.password);
        if(!verifyPassword){
            return res.status(403).json({
                message : "Wrong Password",
                success : false
            })
        };

        const signJwt = await jwt.sign({
            id : user.id
        } , process.env.JSON_WEB_TOKEN!);
        
        if(!signJwt){
            return res.status(401).json({
                message : "Error Occurred",
                success : false
            })
        };

        return res.status(200).json({
            message : "User Verified Successfully",
            token : signJwt,
            success : true
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message : "Internal Server Error",
            success : false
        })
    }
})

authRouter.get("/get-info" , UserMiddleware , async (req, res) => {
    try{
        const userid = req.userId;
        const getUser = await prisma.user.findFirst({
            where : {
                id : userid
            },
            select : {
                name : true,
                email : true,
                companyName : true,
                username : true,
                credit : true
            }
        });
        if(!getUser){
            return res.status(403).json({
                message : "User Not Found",
                success : false
            })
        }

        return res.status(200).json({
            message : "User Fetched Successfully",
            user : getUser,
            success : true
        });

    }catch(e){
        console.log(e);
        return res.status(500).json({
            message  : "Internal Server Error",
            success : false
        })
    }
})




export default authRouter;