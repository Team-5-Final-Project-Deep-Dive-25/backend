import { body, validationResult } from "express-validator";
import { FAIL } from "../../utilities/successWords.js";
import { User } from "../../models/userModel.js";
export const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .notEmpty()
    .withMessage("Email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .notEmpty()
    .withMessage("Password is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        success: FAIL,
        message: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];
