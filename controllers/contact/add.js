import { Contact } from "../../models/contactModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import { validationResult } from "express-validator";

const add = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      success: FAIL,
      messages: errors.array().map((e) => e.msg),
    });
  }
  const contact = new Contact(req.body);
  await contact.save();
  return res.status(201).json({
    success: SUCCESS,
    status: 201,
    message: "Contact Created Successfully",
    data: contact,
  });
};

export default add;
