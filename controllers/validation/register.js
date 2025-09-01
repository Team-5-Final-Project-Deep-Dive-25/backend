import { check, validationResult } from "express-validator";
import { FAIL } from "../../utilities/successWords.js";
import { User } from "../../models/userModel.js";
import userGender from "../../utilities/userGender.js";
import userRoles from "../../utilities/userRoles.js";

export const registerValidation = (mode = "create") => [
  
  mode === "create"
    ? check("name")
        .exists()
        .withMessage("name is required")
        .isLength({ min: 3 })
        .withMessage("name must be at least 3 characters")
    : check("name")
        .optional()
        .isLength({ min: 3 })
        .withMessage("name must be at least 3 characters"),


  mode === "create"
    ? check("email")
        .exists()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email format")
        .custom(async (value) => {
          const user = await User.findOne({ email: value.toLowerCase() });
          if (user) return Promise.reject("email already registered");
          return true;
        })


    : check("email")
        .optional()
        .isEmail()
        .withMessage("invalid email format")
        .custom(async (value) => {
          if (!value) return true;
          const user = await User.findOne({ email: value.toLowerCase() });
          if (user) return Promise.reject("email already registered");
          return true;
        }),

  
  mode === "create"
    ? check("password")
        .exists()
        .withMessage("password is required")
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 characters")
    : check("password")
        .optional()
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 characters"),


  mode === "create"
    ? check("gender")
        .exists()
        .withMessage("gender is required")
        .toUpperCase()
        .isIn([userGender.MALE, userGender.FEMALE])
        .withMessage("gender must be either male or female")
        : check("gender")
        .optional()
        .toUpperCase()
        .isIn([userGender.MALE, userGender.FEMALE])
        .withMessage("gender must be either male or female"),
         

      mode === "create"
    ? check("address")
        .exists()
        .withMessage("address is required")
        .isLength({ max: 100 })
        .withMessage("address must not exceed 100 characters")
    : check("address")
        .optional()
        .isLength({ max: 100 })
        .withMessage("address must not exceed 100 characters"),

  
  mode === "create"
    ? check("role")
        .optional()
        .toUpperCase()
        .isIn([userRoles.USER,userRoles.ADMIN]) 
        .withMessage("role must be either user or admin")
    : check("role")
        .optional()
        .isIn([userRoles.USER, userRoles.ADMIN])
        .withMessage("role must be either user or admin")
];



