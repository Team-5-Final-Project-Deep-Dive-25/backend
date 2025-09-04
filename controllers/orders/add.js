import Cart from "../../models/cartModel.js";
import Order from "../../models/orderModel.js";
import { User } from "../../models/userModel.js";
import { Discount } from "../../models/discountModel.js";
import { Category } from "../../models/categoryModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

const add = async (req, res) => {
  const { status } = req.body;
  const buyerID = req.user.id;

  const cart = await Cart.findOne({ buyerID }).populate("products.productID");
  if (!cart || cart.products.length === 0) {
    return res.status(404).json({
      status: 404,
      success: FAIL,
      message: "Cart is not found or empty",
    });
  }

  let totalPrice = 0; // before discount
  let totalPriceAfterDiscount = 0; // after discount
  const now = new Date();

  for (const item of cart.products) {
    const product = item.productID;
    const quantity = item.quantity;
    let price = product.price;
    let discountedPrice = price;

    // Check for active product discount
    let discount = null;
    if (product.discountId) {
      discount = await Discount.findOne({
        _id: product.discountId,
        startDate: { $lte: now },
        endDate: { $gte: now },
        deleted_at: null,
      });
    }

    // If no product discount, check category discount
    if (!discount && product.categoryId) {
      const category = await Category.findById(product.categoryId);
      if (category && category.discountId) {
        discount = await Discount.findOne({
          _id: category.discountId,
          startDate: { $lte: now },
          endDate: { $gte: now },
          deleted_at: null,
        });
      }
    }

    // Apply discount if found
    if (discount) {
      if (discount.type === "percentage") {
        discountedPrice = price * (1 - discount.value / 100); // e.g., 20% discount
      } else if (discount.type === "fixed") {
        discountedPrice = Math.max(0, price - discount.value); // e.g., $10 off
      }
    }
    totalPrice += price * quantity;
    totalPriceAfterDiscount += discountedPrice * quantity;
  }

  const userAddress = await User.findById(buyerID, { address: 1 });
  const order = await Order.create({
    buyerID,
    cartID: cart._id,
    status: status || "pending",
    totalPriceAfterDiscount: totalPriceAfterDiscount,
    totalPrice: totalPrice,
    address: userAddress.address,
  });

  // Update product stock
  for (const item of cart.products) {
    if (item.productID && item.quantity) {
      const product = item.productID;
      product.stock = Math.max(0, product.stock - item.quantity);
      await product.save();
    }
  }
  await Cart.findOneAndDelete(buyerID);
  return res.status(201).json({
    status: 201,
    success: SUCCESS,
    message: "Order Created Successfully",
    data: order,
  });
};

export default add;
