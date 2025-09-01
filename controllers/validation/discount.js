import { check, validationResult } from "express-validator";
import { Product } from "../../models/productModel.js";
import { Category } from "../../models/category.js";
import { FAIL } from "../../utilities/successWords.js";

export const discountValidation = (mode = "create") => [
  mode === "create"
    ? check("productId")
        .exists()
        .withMessage("productId is required")
        .isMongoId()
        .withMessage("productId must be a valid MongoDB ObjectId")
        .custom(async (value) => {
          const product = await Product.findById(value);
          if (!product) return Promise.reject("productId not found");
          return true;
        })
    : check("productId")
        .optional()
        .isMongoId()
        .withMessage("productId must be a valid MongoDB ObjectId")
        .custom(async (value) => {
          if (!value) return true;
          const product = await Product.findById(value);
          if (!product) return Promise.reject("productId not found");
          return true;
        }),

  mode === "create"
    ? check("categoryId")
        .exists()
        .withMessage("categoryId is required")
        .isMongoId()
        .withMessage("categoryId must be a valid MongoDB ObjectId")
        .custom(async (value) => {
          const category = await Category.findById(value);
          if (!category) return Promise.reject("categoryId not found");
          return true;
        })
    : check("categoryId")
        .optional()
        .isMongoId()
        .withMessage("categoryId must be a valid MongoDB ObjectId")
        .custom(async (value) => {
          if (!value) return true;
          const category = await Category.findById(value);
          if (!category) return Promise.reject("categoryId not found");
          return true;
        }),

  mode === "create"
    ? check("type")
        .exists()
        .withMessage("type is required")
        .isIn(["percentage", "fixed"])
        .withMessage("type must be 'percentage' or 'fixed'")
    : check("type")
        .optional()
        .isIn(["percentage", "fixed"])
        .withMessage("type must be 'percentage' or 'fixed'"),

  mode === "create"
    ? check("value")
        .exists()
        .withMessage("value is required")
        .isNumeric()
        .withMessage("value must be a number")
        .custom(async (value, { req }) => {
          if (value < 0)
            return Promise.reject("value must be a positive number");
          if (req.body.type === "percentage") {
            if (value > 100)
              return Promise.reject("percentage value must not exceed 100");
          }
          if (req.body.type === "fixed") {
            const product = await Product.findById(req.body.productId);
            if (product && value >= product.price) {
              return Promise.reject(
                "fixed value must be less than product price"
              );
            }
          }
          return true;
        })
    : check("value")
        .optional()
        .isNumeric()
        .withMessage("value must be a number")
        .custom(async (value, { req }) => {
          if (value === undefined) return true;
          if (value < 0)
            return Promise.reject("value must be a positive number");
          if (req.body.type === "percentage") {
            if (value > 100)
              return Promise.reject("percentage value must not exceed 100");
          }
          if (req.body.type === "fixed" && req.body.productId) {
            const product = await Product.findById(req.body.productId);
            if (product && value >= product.price) {
              return Promise.reject(
                "fixed value must be less than product price"
              );
            }
          }
          return true;
        }),

  mode === "create"
    ? check("endDate")
        .exists()
        .withMessage("endDate is required")
        .isISO8601()
        .withMessage("endDate must be a valid date")
        .custom((value) => {
          if (new Date(value) < new Date())
            return Promise.reject("endDate must be in the future");
          return true;
        })
    : check("endDate")
        .optional()
        .isISO8601()
        .withMessage("endDate must be a valid date")
        .custom((value) => {
          if (!value) return true;
          if (new Date(value) < new Date())
            return Promise.reject("endDate must be in the future");
          return true;
        }),
];

export const handleDiscountValidation = (req, res, next) => {
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
