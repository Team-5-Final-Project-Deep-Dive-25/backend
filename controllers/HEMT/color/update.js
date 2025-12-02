import { Color } from "../../../models/HEMT/colorModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";

const update = async (req, res) => {
  const { id } = req.params;
  const { name, type, price } = req.body;

  const color = await Color.findOne({ _id: id, deleted_at: null });
  if (!color) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Color not found",
    });
  }

  // Check for duplicate if name or type is being updated
  if (name || type) {
    const checkName = name || color.name;
    const checkType = type || color.type;
    const existingColor = await Color.findOne({
      name: checkName,
      type: checkType,
      deleted_at: null,
      _id: { $ne: id },
    });
    if (existingColor) {
      return res.status(400).json({
        success: FAIL,
        status: 400,
        message: "Color with this name and type already exists",
      });
    }
  }

  if (name) color.name = name;
  if (type) color.type = type;
  if (price !== undefined) color.price = price;

  await color.save();

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Color updated successfully",
    data: color,
  });
};

export default update;
