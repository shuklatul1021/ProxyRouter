import Router from "express";
import UserMiddleware from "../middleware/auth.js";
const creditRouter = Router();

creditRouter.get("/get-credit" , UserMiddleware , async ( req, res ) => {
    try{
        const userid = req.userId;
        if(!userid){
            return res.status(403).json({
                error: "Unauthorized"
            });
        }
        // Add your credit retrieval logic here
    } catch (error) {
        console.error("Error fetching credit:", error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

export default creditRouter;