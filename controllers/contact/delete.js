import { Contact } from "../../models/contactModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
export const deleteOne = async (req, res) => {
  const { id } = req.params.id;
  const contact = await Contact.findOne({ id, deleted_at: null });
  if (!contact) {
    return res
      .status(404)
      .json({ success: FAIL, status: 404, message: "contact not found" });
  }
  contact.deleted_at = new Date();
  await contact.save();
  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Contact Deleted Successfully",
  });
};
