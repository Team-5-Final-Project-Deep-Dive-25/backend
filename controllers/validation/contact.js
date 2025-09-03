import { body } from "express-validator";

export const contactValidation = [
  body("userName")
    .isString()
    .isLength({ min: 3, max: 20 })
    .withMessage("userName must be between 3 and 20 characters"),

  body("email")
    .isEmail()
    .isLength({ min: 10, max: 30 })
    .withMessage("Email must be valid and between 10 and 30 characters"),

  body("phone").isNumeric().withMessage("Phone must be a number"),

  body("message")
    .isString()
    .isLength({ min: 5, max: 400 })
    .withMessage("Message must be between 5 and 400 characters"),
];
