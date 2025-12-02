import { Veil } from "../../../models/HEMT/veilModel.js";
import { Color } from "../../../models/HEMT/colorModel.js";
import { Material } from "../../../models/HEMT/materialModel.js";
import { Shape } from "../../../models/HEMT/shapeModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";
import dotenv from "dotenv";
dotenv.config();
const add = async (req, res) => {
  const {
    name,
    colorId,
    materialId,
    shapeId,
    color_degree,
    shape_density,
    status,
  } = req.body;
  const userId = req.user.id;

  // Validate color exists
  const color = await Color.findOne({ _id: colorId, deleted_at: null });
  if (!color) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Color not found",
    });
  }

  // Validate material exists
  const material = await Material.findOne({
    _id: materialId,
    deleted_at: null,
  });
  if (!material) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Material not found",
    });
  }

  // Validate shape exists
  const shape = await Shape.findOne({ _id: shapeId, deleted_at: null });
  if (!shape) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Shape not found",
    });
  }

  // Calculate total price based on color, material, and shape prices
  const total_price =
    color.price +
    material.price +
    shape.price +
    Number(process.env.VEIL_BASE_PRICE);

  const veil = new Veil({
    name,
    userId,
    colorId,
    materialId,
    shapeId,
    color_degree,
    shape_density,
    total_price,
    status: status || "draft",
  });

  await veil.save();

  return res.status(201).json({
    success: SUCCESS,
    status: 201,
    message: "Veil created successfully",
    data: veil,
  });
};

export default add;
