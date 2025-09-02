import express from "express";
import { getAllUsers } from "../controllers/users/admin/getAll.js";
import { getUsersIds } from "../controllers/users/admin/usersIds.js";
import { login } from "../controllers/users/login.js";
import { register } from "../controllers/users/register.js";
import { protect } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authrole.js";
import userRoles from "../utilities/userRoles.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { registerValidation } from "../controllers/validation/register.js";
import { loginValidation } from "../controllers/validation/login.js";
import { changeRole } from "../controllers/users/admin/changeRole.js";
import { getProfile } from "../controllers/users/getProfile.js";
import { updateProfile } from "../controllers/users/updateProfile.js";

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


userRouter.get("/profile",
   protect,
   asyncWrapper(getProfile));

userRouter.patch("/update",
   protect,
   asyncWrapper(updateProfile));


export default userRouter;
