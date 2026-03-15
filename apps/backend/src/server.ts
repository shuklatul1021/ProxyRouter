import "dotenv/config";
import Express from "express";
import userRouter from "./routes/auth.js";
import modelRouter from "./routes/model.js";

const app = Express();
const port = process.env.PORT || 3000;
app.use(Express.json());

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/models", modelRouter);
app.use("/api/v1/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
