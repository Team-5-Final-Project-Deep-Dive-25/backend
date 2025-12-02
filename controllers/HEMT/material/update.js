import { Material } from "../../../models/HEMT/materialModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";

const update = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  const material = await Material.findOne({ _id: id, deleted_at: null });
  if (!material) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Material not found",
    });
  }

  // Check for duplicate if name is being updated
  if (name && name !== material.name) {
    const existingMaterial = await Material.findOne({
      name,
      deleted_at: null,
      _id: { $ne: id },
    });
    if (existingMaterial) {
      return res.status(400).json({
        success: FAIL,
        status: 400,
        message: "Material with this name already exists",
      });
    }
  }

  if (name) material.name = name;
  if (description !== undefined) material.description = description;
  if (price !== undefined) material.price = price;

  await material.save();

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Material updated successfully",
    data: material,
  });
};

export default update;
