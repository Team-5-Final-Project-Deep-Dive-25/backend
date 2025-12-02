import { Material } from "../../../models/HEMT/materialModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";

const add = async (req, res) => {
  const { name, description, price } = req.body;

  const existingMaterial = await Material.findOne({ name, deleted_at: null });
  if (existingMaterial) {
    return res.status(400).json({
      success: FAIL,
      status: 400,
      message: "Material with this name already exists",
    });
  }

  const material = new Material({ name, description, price });
  await material.save();

  return res.status(201).json({
    success: SUCCESS,
    status: 201,
    message: "Material created successfully",
    data: material,
  });
};

export default add;
