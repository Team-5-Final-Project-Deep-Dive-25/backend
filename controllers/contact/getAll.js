import { Contact } from "../../models/contactModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

const getAll = async (req, res) => {
  const contacts = await Contact.find(
    { deleted_at: null },
    { __v: 0, deleted_at: 0 }
  ).sort({ createdAt: -1 });
  if (!contacts.length) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "contacts are not found",
    });
  }
  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Contacts Retrieved successfully",
    data: contacts,
  });
};

export default getAll;
