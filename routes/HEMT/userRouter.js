import express from "express";
import { getAllUsers } from "../../controllers/users/admin/getAll.js";
import { getUsersIds } from "../../controllers/users/admin/usersIds.js";
import { login } from "../../controllers/users/login.js";
import { register } from "../../controllers/users/register.js";
import deleteAccount from "../../controllers/users/deleteAccount.js";
import { protect } from "../../middlewares/auth.js";
import { authorizeRoles } from "../../middlewares/authrole.js";
import userRoles from "../../utilities/userRoles.js";
import asyncWrapper from "../../middlewares/asyncWrapper.js";
import { registerValidation } from "../../controllers/validation/register.js";
import { loginValidation } from "../../controllers/validation/login.js";
import { changeRole } from "../../controllers/users/admin/changeRole.js";
import deleteOne from "../../controllers/users/admin/deleteOne.js";
import { getProfile } from "../../controllers/users/getProfile.js";
import updateProfile from "../../controllers/users/updateProfile.js";
import { normalizeProductImages } from "../../controllers/validation/product.js";
import { verifyEmail } from "../../controllers/users/verifyEmail.js";
import { resend } from "../../controllers/users/resend.js";
import { add } from "../../controllers/users/black.js";
import multer from "multer";

const userRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

userRouter.post(
  "/register",
  registerValidation("create"),
  asyncWrapper(register)
);

userRouter.post("/login", loginValidation, asyncWrapper(login));

userRouter.get(
  "/usersId",
  protect,
  authorizeRoles(userRoles.ADMIN),
  asyncWrapper(getUsersIds)
);
userRouter.get(
  "/allusers",
  protect,
  authorizeRoles(userRoles.ADMIN),
  asyncWrapper(getAllUsers)
);
userRouter.put(
  "/changerole",
  protect,
  authorizeRoles(userRoles.ADMIN),
  asyncWrapper(changeRole)
);

userRouter.get("/profile", protect, getProfile);
userRouter.put(
  "/profile",
  protect,
  upload.single("image"),
  normalizeProductImages,
  asyncWrapper(updateProfile)
);
userRouter.delete(
  "/:id",
  protect,
  authorizeRoles(userRoles.ADMIN),
  asyncWrapper(deleteOne)
);
userRouter.delete("/", protect, asyncWrapper(deleteAccount));

userRouter.get("/verify", asyncWrapper(verifyEmail));
userRouter.get("/resend", asyncWrapper(resend));
userRouter.post("/logout", asyncWrapper(add));

export default userRouter;
