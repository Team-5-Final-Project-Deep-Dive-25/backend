// import jwt from "jsonwebtoken";
// import { FAIL } from "../utilities/successWords.js";
// import { Black } from "../models/blacklist.js";

// export const protect = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   const tokean = authHeader.startsWith("Bearer ")
//     ? authHeader.slice(7)
//     : authHeader;
//   console.log(tokean);
//   const tokenexists = await Black.findOne({ invalid: tokean });
//   console.log(tokenexists);
//   if (tokenexists) {
//     return res.status(401).json({
//       status: 401,
//       success: FAIL,
//       message: "Your token is not vaild any more",
//     });
//   }
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({
//       status: 401,
//       success: FAIL,
//       message: "Not authorized, token missing",
//     });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       status: 401,
//       success: FAIL,
//       message: "Not authorized, token invalid " + error.message,
//     });
//   }
// };
// controllers/fetchController.js
import fetch from "node-fetch";

export const fetchData = async (req, res) => {
  try {
    const response = await fetch("https://clutch.co/eg/hr/outsourcing");
    const data = await response.text(); // use .json() if endpoint returns JSON
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
