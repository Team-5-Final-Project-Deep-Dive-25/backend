import { Veil } from "../../../models/HEMT/veilModel.js";
import { FAIL, SUCCESS } from "../../../utilities/successWords.js";

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const veil = await Veil.findOne({ _id: id, deleted_at: null });
  if (!veil) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Veil not found",
    });
  }

  if (!status) {
    return res.status(400).json({
      success: FAIL,
      status: 400,
      message: "Status is required",
    });
  }

  const validStatuses = ["draft", "processing", "ordered"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: FAIL,
      status: 400,
      message: "Invalid status. Must be one of: draft, processing, ordered",
    });
  }

  veil.status = status;
  await veil.save();

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Veil status updated successfully",
    data: veil,
  });
};

export default updateStatus;
