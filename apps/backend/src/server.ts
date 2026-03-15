import "dotenv/config";
import Express from "express";
import userRouter from "./routes/auth.js";
import modelRouter from "./routes/model.js";

export const app = Express();
app.use(Express.json());

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/models", modelRouter);
app.use("/api/v1/user", userRouter);

