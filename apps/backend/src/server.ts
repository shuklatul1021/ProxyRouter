import "dotenv/config";
import Express from "express";
import modelRouter from "./routes/model.js";
import cors from "cors"
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

export const app = Express();
app.use(Express.json());
app.use(cors())

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/models", modelRouter);
app.use("/api/v1/user", userRouter);

