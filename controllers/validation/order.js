import { check, validationResult } from "express-validator";
import { FAIL } from "../../utilities/successWords.js";

export const orderValidation = () => [
  check("status")
    .optional()
    .isString()
    .withMessage("status must be a string")
    .isIn(["pending", "confirmed", "shipped", "delivered", "canceled"])
    .withMessage(
      "status must be one of: pending, confirmed, shipped, delivered, canceled"
    ),
];

export const handleOrderValidation = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(404).json({
      status: 404,
      success: FAIL,
      messages: result.array().map((e) => e.msg),
    });
  }
  next();
};
