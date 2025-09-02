import { check, validationResult } from "express-validator";
import { User } from "../../models/userModel.js";
import { FAIL } from "../../utilities/successWords.js";

export const updateValidation = [

    check("firstName")
    .optional()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters"),

  check("lastName")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters"),

  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value, { req }) => {
      if (!value) return true;

      const user = await User.findOne({ email: value.toLowerCase() });
      if (user && user._id.toString() !== req.user.id) {
        throw new Error("Email already in use by another account");
      }
      return true;
    }),

  check("address")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Address must not exceed 100 characters"),

  check("currentPassword")
    .exists()
    .withMessage("Current password is required"),

  check("newPassword")
    .optional()
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: FAIL,
        status: 400,
        errors: errors.array(),
      });
    }
    next();
  },
];
