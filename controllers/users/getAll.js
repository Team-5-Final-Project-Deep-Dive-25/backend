
import { User} from "../../models/userModel.js";
import { SUCCESS } from "../../utilities/successWords.js";
import dotenv from "dotenv";
import asyncWrapper from "../../middlewares/asyncWrapper.js";
dotenv.config();
export const getAllUsers = asyncWrapper(async (req, res) => {
  const quary = req.query;
  const limit = quary.limit || 6;
  const page = quary.page || 1;
  const skip = (page - 1) * limit;
  const data = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);

  res.json({ status: SUCCESS, data: { users: data } });

});

