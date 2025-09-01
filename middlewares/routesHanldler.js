import { FAIL } from "../utilities/successWords.js";

export const invaildRouter = (req, res) => {
  return res.status(404).json({
    success: FAIL,
    status: 404,
    msg: "Invalid Route",
  });
};


export const errorDisplay = (err, req, res, next) => {
 return res.status(err.statusCode || 500).json({
    status: err.statusCode || 500,
    success: FAIL,
    message: err.message || "Internal Server Error",
  });
};

