import { body, validationResult } from "express-validator";

const validateAddOrder = [
  body("customerID").notEmpty().withMessage("CustomerID is required"),
  body("total").isNumeric().withMessage("Total must be a number"),
  body("amount").isInt({ min: 1 }).withMessage("Amount must be at least 1"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

export default validateAddOrder;
