import { Category } from "../../models/categoryModel.js";
import { FAIL, SUCCESS } from "../../utilities/successWords.js";

const add = async (req, res) => {
  const { title, description } = req.body;
  const existingCategory = await Category.findOne({ title, deleted_at: null });
  if (existingCategory) {
    return res.status(400).json({
      success: FAIL,
      status: 400,
      message: "Category with this title already exists",
    });
  }
  const category = new Category(req.body);
  await category.save();
  return res.status(201).json({
    success: SUCCESS,
    status: 201,
    message: "Category created successfully",
    data: category,
  });
};
export default add;
