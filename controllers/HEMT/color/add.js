import { Color } from "../../../models/HEMT/colorModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";

const add = async (req, res) => {
  const { name, type, price } = req.body;

  const existingColor = await Color.findOne({ name, type, deleted_at: null });
  if (existingColor) {
    return res.status(400).json({
      success: FAIL,
      status: 400,
      message: "Color with this name and type already exists",
    });
  }

  const color = new Color({ name, type, price });
  await color.save();

  return res.status(201).json({
    success: SUCCESS,
    status: 201,
    message: "Color created successfully",
    data: color,
  });
};

export default add;
