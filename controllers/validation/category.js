import { check, validationResult } from "express-validator";
import { Category } from "../../models/categoryModel.js";
import { FAIL } from "../../utilities/successWords.js";

export const categoryValidation = (mode = "create") => [
  mode === "create"
    ? check("title")
        .exists()
        .withMessage("title is required")
        .isString()
        .withMessage("title must be a string")
        .notEmpty()
        .withMessage("title cannot be empty")
        .isLength({ min: 3, max: 40 })
        .withMessage("name must be between 3 and 40 characters")
    : check("title")
        .optional()
        .isString()
        .withMessage("title must be a string")
        .notEmpty()
        .withMessage("title cannot be empty")
        .isLength({ min: 3, max: 40 })
        .withMessage("title must be between 3 and 40 characters"),

  mode === "create"
    ? check("description")
        .optional()
        .isString()
        .withMessage("description must be a string")
        .isLength({ min: 4, max: 150 })
        .withMessage("description must be between 3 and 40 characters")
    : check("description")
        .optional()
        .isString()
        .withMessage("description must be a string"),

  mode === "create"
    ? check("discountID")
        .optional()
        .isMongoId()
        .withMessage("discount must be a valid MongoDB ObjectId")
    : check("discountID")
        .optional()
        .isMongoId()
        .withMessage("discount must be a valid MongoDB ObjectId"),
];

export const handleCategoryValidation = (req, res, next) => {
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
