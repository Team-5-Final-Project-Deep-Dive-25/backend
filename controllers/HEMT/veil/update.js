import { Veil } from "../../../models/HEMT/veilModel.js";
import { Color } from "../../../models/HEMT/colorModel.js";
import { Material } from "../../../models/HEMT/materialModel.js";
import { Shape } from "../../../models/HEMT/shapeModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";

const update = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    colorId,
    materialId,
    shapeId,
    color_degree,
    shape_density,
    status,
  } = req.body;

  const veil = await Veil.findOne({ _id: id, deleted_at: null });
  if (!veil) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Veil not found",
    });
  }

  let colorPrice = 0;
  let materialPrice = 0;
  let shapePrice = 0;

  // Validate and get color
  if (colorId) {
    const color = await Color.findOne({ _id: colorId, deleted_at: null });
    if (!color) {
      return res.status(404).json({
        success: FAIL,
        status: 404,
        message: "Color not found",
      });
    }
    veil.colorId = colorId;
    colorPrice = color.price;
  } else {
    const existingColor = await Color.findById(veil.colorId);
    colorPrice = existingColor ? existingColor.price : 0;
  }

  // Validate and get material
  if (materialId) {
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
    veil.materialId = materialId;
    materialPrice = material.price;
  } else {
    const existingMaterial = await Material.findById(veil.materialId);
    materialPrice = existingMaterial ? existingMaterial.price : 0;
  }

  // Validate and get shape
  if (shapeId) {
    const shape = await Shape.findOne({ _id: shapeId, deleted_at: null });
    if (!shape) {
      return res.status(404).json({
        success: FAIL,
        status: 404,
        message: "Shape not found",
      });
    }
    veil.shapeId = shapeId;
    shapePrice = shape.price;
  } else {
    const existingShape = await Shape.findById(veil.shapeId);
    shapePrice = existingShape ? existingShape.price : 0;
  }

  // Update other fields
  if (name) veil.name = name;
  if (color_degree) veil.color_degree = color_degree;
  if (shape_density) veil.shape_density = shape_density;
  if (status) veil.status = status;

  // Recalculate total price
  veil.total_price = colorPrice + materialPrice + shapePrice;

  await veil.save();

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Veil updated successfully",
    data: veil,
  });
};

export default update;
