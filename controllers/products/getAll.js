import { Product } from "../../models/productModel.js";
import { FAIL, SUCCESS } from "../../utilities/successWords.js";
import fetch from "node-fetch";

export const getAll = async (req, res) => {
  //   const page = parseInt(req.query.page) || 1;
  //   const limit = parseInt(req.query.limit) || 10;
  //   const skip = (page - 1) * limit;

  //   // Build filter object
  //   const filter = { deleted_at: null };
  //   if (req.query.category) {
  //     filter.categoryId = req.query.category;
  //   }

  //   const products = await Product.find(filter, {
  //     __v: 0,
  //     createdAt: 0,
  //     updatedAt: 0,
  //     deleted_at: 0,
  //   })
  //     .populate({
  //       path: "categoryId",
  //       select: "-__v -updatedAt -createdAt -deleted_at",
  //       populate: {
  //         path: "discountId",
  //         select: "-__v -updatedAt -createdAt -deleted_at -categoryId -productId",
  //       },
  //     })

  //     .populate({
  //       path: "discountId",
  //       select: "-productId -categoryId -__v -createdAt -updatedAt -deleted_at",
  //     })
  //     .skip(skip)
  //     .limit(limit);
  //   if (products.length === 0) {
  //     return res.status(404).json({
  //       success: FAIL,
  //       status: 404,
  //       message: "No Products found",
  //     });
  //   }
  //   const total = await Product.countDocuments(filter);

  //   return res.status(200).json({
  //     success: SUCCESS,
  //     status: 200,
  //     message: "Products fetched successfully",
  //     data: products,
  //     total,
  //     page,
  //     pages: Math.ceil(total / limit),
  //   });
  try {
    const response = await fetch("https://clutch.co/eg/hr/outsourcing");
    const data = await response.text(); // use .json() if endpoint returns JSON
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getAll;

// export const fetchData = async (req, res) => {
//   try {
//     const response = await fetch("https://clutch.co/eg/hr/outsourcing");
//     const data = await response.text(); // use .json() if endpoint returns JSON
//     res.status(200).send(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
