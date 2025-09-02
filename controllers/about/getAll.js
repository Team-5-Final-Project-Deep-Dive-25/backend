import { About } from "../../models/aboutModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

export const getAll = async (req, res) => {
  const abouts = await About.find(
    { deleted_at: null },
    { __v: 0, deleted_at: 0 }
  ).sort({ createdAt: -1 });
  if (!abouts.length) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "No about entries found",
    });
  }
  res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "About entries fetched successfully",
    data: abouts,
  });
};
