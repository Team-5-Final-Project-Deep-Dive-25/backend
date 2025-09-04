import { check, validationResult } from "express-validator";
import { Product } from "../../models/productModel.js";
import { Category } from "../../models/categoryModel.js";
import { Discount } from "../../models/discountModel.js";
import { FAIL } from "../../utilities/successWords.js";

// Middleware to convert req.file to req.body.images as array before validation
export const normalizeProductImages = (req, res, next) => {
  if (req.files && req.files.length > 0) {
    req.body.images = req.files;
  } else if (req.file) {
    req.body.images = [req.file];
  }
  next();
};

export const productValidation = (mode = "create") => [
  mode === "create"
    ? check("name")
        .exists()
        .withMessage("name is required")
        .isString()
        .withMessage("name must be a string")
        .notEmpty()
        .withMessage("name cannot be empty")
        .isLength({ min: 3, max: 40 })
        .withMessage("name must be between 3 and 40 characters")
        .custom(async (value) => {
          const existing = await Product.findOne({ name: value });
          if (existing) {
            throw new Error("This product already exists");
          }
          return true;
        })
    : check("name")
        .optional()
        .isString()
        .withMessage("name must be a string")
        .notEmpty()
        .withMessage("name cannot be empty")
        .isLength({ min: 3, max: 40 })
        .withMessage("name must be between 3 and 40 characters"),

  mode === "create"
    ? check("description")
        .exists()
        .withMessage("description is required")
        .isString()
        .withMessage("description must be a string")
        .notEmpty()
        .withMessage("description cannot be empty")
        .isLength({ min: 5, max: 500 })
        .withMessage("description must be between 5 and 500 characters")
    : check("description")
        .optional()
        .isString()
        .withMessage("description must be a string")
        .notEmpty()
        .withMessage("description cannot be empty")
        .isLength({ min: 5, max: 500 })
        .withMessage("description must be between 5 and 500 characters"),

  mode === "create"
    ? check("price")
        .exists()
        .withMessage("price is required")
        .isNumeric()
        .withMessage("price must be a number")
        .isInt({ min: 0 })
        .withMessage("price must be a non-negative integer")
        .custom((value) => {
          if (value < 0) return Promise.reject("price must be positive");
          return true;
        })
    : check("price")
        .optional()
        .isNumeric()
        .withMessage("price must be a number")
        .isInt({ min: 0 })
        .withMessage("price must be a non-negative integer")
        .custom((value) => {
          if (value !== undefined && value < 0)
            return Promise.reject("price must be positive");
          return true;
        }),

  mode === "create"
    ? check("stock")
        .exists()
        .withMessage("stock is required")
        .isInt({ min: 0 })
        .withMessage("stock must be a non-negative integer")
    : check("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("stock must be a non-negative integer"),

  mode === "create"
    ? check("categoryId")
        .exists()
        .withMessage("category is required")
        .isMongoId()
        .withMessage("category must be a valid MongoDB ObjectId")
        .custom(async (value) => {
          const category = await Category.findById(value);
          if (!category) return Promise.reject("category not found");
          return true;
        })
    : check("categoryId")
        .optional()
        .isMongoId()
        .withMessage("category must be a valid MongoDB ObjectId")
        .custom(async (value) => {
          if (!value) return true;
          const category = await Category.findById(value);
          if (!category) return Promise.reject("category not found");
          return true;
        }),

  mode === "create"
    ? check("discount")
        .optional()
        .isMongoId()
        .withMessage("discount must be a valid MongoDB ObjectId")
        .custom(async (value) => {
          if (!value) return true;
          const discount = await Discount.findById(value);
          if (!discount) return Promise.reject("discount not found");
          return true;
        })
    : check("discount")
        .optional()
        .isMongoId()
        .withMessage("discount must be a valid MongoDB ObjectId")
        .custom(async (value) => {
          if (!value) return true;
          const discount = await Discount.findById(value);
          if (!discount) return Promise.reject("discount not found");
          return true;
        }),

  mode === "create"
    ? check("rate")
        .optional()
        .isNumeric()
        .withMessage("rate must be a number")
        .custom((value) => {
          if (value < 1 || value > 5)
            return Promise.reject("rate must be between 1 and 5");
          return true;
        })
    : check("rate")
        .optional()
        .isNumeric()
        .withMessage("rate must be a number")
        .custom((value) => {
          if (value !== undefined && (value < 1 || value > 5))
            return Promise.reject("rate must be between 1 and 5");
          return true;
        }),

  mode === "create"
    ? check("images")
        .optional()
        .custom((value, { req }) => {
          // Support for images sent as array or file uploads
          if (req.file || (Array.isArray(value) && value.length >= 1)) {
            return true;
          }
          // If files are uploaded via multer with req.files
          if (req.files && Array.isArray(req.files) && req.files.length >= 1) {
            return true;
          }
          return Promise.reject("You must provide at least 1 images");
        })
    : check("images")
        .optional()
        .custom((value, { req }) => {
          // No required image count when updating, just check valid format
          if (
            req.file ||
            (Array.isArray(value) && value.length > 0) ||
            (req.files && Array.isArray(req.files) && req.files.length > 0)
          ) {
            return true;
          }
          return true;
        }),
];

export const handleProductValidation = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(404).json({
      status: 404,
      success: false,
      messages: result.array().map((e) => e.msg),
    });
  }
  next();
};
