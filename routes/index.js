import express from "express"
import userRouter from "./userRouter.js"

const Router = express.Router();
Router.use("/users", userRouter);
export default Router;
