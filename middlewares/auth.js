import jwt from "jsonwebtoken";
import {FAIL} from "../utilities/successWords.js";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ status: 401, success: FAIL, message: "Not authorized, token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } 
  
  catch (error) {
    return res.status(401).json({ status: 401, success: FAIL, message: "Not authorized, token invalid" });
  }
  
};

