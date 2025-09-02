import { check, validationResult, body } from "express-validator";
import { Product } from "../../models/productModel.js";
import { Category } from "../../models/categoryModel.js";
import { FAIL } from "../../utilities/successWords.js";

export const discountValidation = (mode = "create") => [
  // Either productId or categoryId must be present, not both
  body().custom((value, { req }) => {
    const hasProducts =
      Array.isArray(req.body.productId) && req.body.productId.length > 0;
    const hasCategories =
      Array.isArray(req.body.categoryId) && req.body.categoryId.length > 0;

    if (mode === "create") {
      if (!hasProducts && !hasCategories) {
        throw new Error("Either productId or categoryId is required");
      }
      if (hasProducts && hasCategories) {
        throw new Error(
          "Provide only one of productId or categoryId, not both"
        );
      }
    } else if (mode === "update") {
      if (hasProducts && hasCategories) {
        throw new Error(
          "Provide only one of productId or categoryId, not both"
        );
      }
    }
    return true;
  }),

  // productId validation (array)
  check("productId")
    .optional()
    .isArray()
    .withMessage("productId must be an array")
    .custom(async (ids) => {
      if (!Array.isArray(ids)) return true;
      for (const id of ids) {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error(`Invalid ObjectId: ${id}`);
        }
        const product = await Product.findById(id);
        if (!product) throw new Error(`productId not found: ${id}`);
      }
      return true;
    }),

  // categoryId validation (array)
  check("categoryId")
    .optional()
    .isArray()
    .withMessage("categoryId must be an array")
    .custom(async (ids) => {
      if (!Array.isArray(ids)) return true;
      for (const id of ids) {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error(`Invalid ObjectId: ${id}`);
        }
        const category = await Category.findById(id);
        if (!category) throw new Error(`categoryId not found: ${id}`);
      }
      return true;
    }),

  // type validation
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

  // value validation
  mode === "create"
    ? check("value")
        .exists()
        .withMessage("value is required")
        .isNumeric()
        .withMessage("value must be a number")
        .custom(async (value, { req }) => {
          if (value <= 0) return Promise.reject("value must be positive");

          if (req.body.type === "percentage") {
            if (value >= 100) {
              return Promise.reject("percentage value must be less than 100");
            }
          }

          if (req.body.type === "fixed") {
            if (!req.body.productId || req.body.productId.length === 0) {
              return Promise.reject("fixed discount requires productId");
            }

            const products = await Product.find({
              _id: { $in: req.body.productId },
            });
            if (products.length === 0) {
              return Promise.reject(
                "No valid products found for fixed discount"
              );
            }

            const minPrice = Math.min(...products.map((p) => p.price));
            if (value >= minPrice) {
              return Promise.reject(
                `fixed value must be less than the cheapest product price (${minPrice})`
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
          if (value <= 0) return Promise.reject("value must be positive");

          if (req.body.type === "percentage") {
            if (value >= 100) {
              return Promise.reject("percentage value must be less than 100");
            }
          }

          if (
            req.body.type === "fixed" &&
            req.body.productId &&
            req.body.productId.length > 0
          ) {
            const products = await Product.find({
              _id: { $in: req.body.productId },
            });
            if (products.length > 0) {
              const minPrice = Math.min(...products.map((p) => p.price));
              if (value >= minPrice) {
                return Promise.reject(
                  `fixed value must be less than the cheapest product price (${minPrice})`
                );
              }
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
            throw new Error("endDate must be in the future");
          return true;
        })
    : check("endDate")
        .optional()
        .isISO8601()
        .withMessage("endDate must be a valid date")
        .custom((value) => {
          if (!value) return true;
          if (new Date(value) < new Date())
            throw new Error("endDate must be in the future");
          return true;
        }),
];

export const handleDiscountValidation = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      status: 400,
      success: FAIL,
      messages: result.array().map((e) => e.msg),
    });
  }
  next();
};
