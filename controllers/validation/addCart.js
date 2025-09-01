import { body, validationResult } from "express-validator";
import { FAIL } from "../../utilities/successWords.js";

export const addCartValidation = [
  body("productID")
    .notEmpty()
    .withMessage("productID is required")
    .isString()
    .withMessage("productID must be a string"),

  body("buyerID")
    .notEmpty()
    .withMessage("buyerID is required")
    .isString()
    .withMessage("buyerID must be a string"),

  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("quantity must be a number greater than 0"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation error",
        status: 400,
        success: FAIL,
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];
