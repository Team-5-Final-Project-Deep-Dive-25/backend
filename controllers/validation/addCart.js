import { check, validationResult } from "express-validator";
import { Product } from "../../models/productModel.js";
import { FAIL } from "../../utilities/successWords.js";

export const addCartValidation = (mode = "create") => [
  mode === "create"
    ? check("productID")
        .exists()
        .withMessage("productID is required")
        .isMongoId()
        .withMessage("productID must be a valid MongoDB ObjectId")
        .custom(async (id) => {
          const product = await Product.findById(id);
          if (!product) throw new Error("productID not found");
          return true;
        })
    : check("productID")
        .optional()
        .isMongoId()
        .withMessage("productID must be a valid MongoDB ObjectId")
        .custom(async (id) => {
          if (!id) return true;
          const product = await Product.findById(id);
          if (!product) throw new Error("productID not found");
          return true;
        }),

  check("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("quantity must be a positive integer")
    .custom(async (quantity, { req }) => {
      const productId =
        mode === "create"
          ? req.body.productID
          : req.body.productID || undefined;
      if (!productId || !quantity) return true;
      const product = await Product.findById(productId);
      if (!product) return true; // productID validation will handle not found
      if (quantity > product.stock) {
        throw new Error(
          `Requested quantity (${quantity}) exceeds available stock (${product.stock})`
        );
      }
      return true;
    }),
];

export const handleAddCartValidation = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    // Filter out Mongoose cast errors
    const messages = result
      .array()
      .filter((e) => !e.msg.includes("Cast to ObjectId failed"))
      .map((e) => e.msg);
    if (messages.length === 0) {
      // If only cast errors, show a generic message
      return res.status(404).json({
        status: 404,
        success: FAIL,
        messages: ["Invalid productID format"],
      });
    }
    return res.status(404).json({
      status: 404,
      success: FAIL,
      messages,
    });
  }
  next();
};
