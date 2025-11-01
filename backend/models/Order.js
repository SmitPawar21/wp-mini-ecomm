import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  totalAmount: Number,
  paymentMethod: { type: String, enum: ["COD", "Online"], default: "COD" },
  paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  orderStatus: { type: String, enum: ["Pending", "Shipped", "Delivered"], default: "Pending" },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema, "orders");