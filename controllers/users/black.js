import { Black } from "../../models/blacklist.js";

export const add = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(400)
      .json({ message: "No authorization header provided" });
  }

  // remove "Bearer " if it exists
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  const newBlack = new Black({ invaild: token });
  await newBlack.save();

  return res.status(201).json({ message: "Token blacklisted" });
};
