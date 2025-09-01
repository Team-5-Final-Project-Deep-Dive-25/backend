import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import Router from "./routes/index.js";
import { invaildRouter, errorDisplay } from "./middlewares/routesHanldler.js";
import dbConnect from "./config/dbConnection.js";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use("/api", Router);

app.use(invaildRouter);
app.use(errorDisplay);
dbConnect()
  .then((msg) => {
    console.log(msg);
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
