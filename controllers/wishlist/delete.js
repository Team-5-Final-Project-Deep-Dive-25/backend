import { Wishlist } from "../../models/wishlistModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
export const deleteOne = async (req, res) => {
  const userId = req.user.id;
  const wishlist = await Wishlist.findOne({ userId, deleted_at: null });
  if (!wishlist) {
    return res
      .status(404)
      .json({ success: FAIL, status: 404, message: "Wishlist not found" });
  }
  wishlist.deleted_at = new Date();
  await wishlist.save();
  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Wishlist Deleted Successfully",
  });
};
