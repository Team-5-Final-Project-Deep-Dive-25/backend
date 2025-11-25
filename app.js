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

// Enhanced JSON middleware to store raw body for flow signature verification
app.use(
  express.json({
    // store the raw request body to use it for signature verification
    verify: (req, res, buf, encoding) => {
      req.rawBody = buf?.toString(encoding || "utf8");
    },
  })
);

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
