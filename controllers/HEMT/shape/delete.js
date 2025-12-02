import { Shape } from "../../../models/HEMT/shapeModel.js";
import { Veil } from "../../../models/HEMT/veilModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";

const deleteOne = async (req, res) => {
  const { id } = req.params;

  const shape = await Shape.findOne({ _id: id, deleted_at: null });
  if (!shape) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Shape not found",
    });
  }

  // Check if there are veils using this shape
  const veilsUsingShape = await Veil.find({ shapeId: id, deleted_at: null });
  if (veilsUsingShape.length > 0) {
    return res.status(400).json({
      success: FAIL,
      status: 400,
      message: "Cannot delete shape. There are veils using this shape.",
    });
  }

  shape.deleted_at = new Date();
  await shape.save();

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Shape deleted successfully",
  });
};

export default deleteOne;
