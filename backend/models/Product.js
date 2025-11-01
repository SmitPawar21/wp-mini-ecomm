import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    brand: { type: String, default: "Generic" },
    category: { type: String, required: true }, 
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    currency: { type: String, default: "INR" },
    isOnSale: { type: Boolean, default: false },

    sku: { type: String, unique: true },
    stock: { type: Number, default: 0 },
    availabilityStatus: {
      type: String,
      enum: ["In Stock", "Out of Stock", "Limited"],
      default: "In Stock",
    },

    images: [{ type: String }], 
    thumbnail: { type: String }, 

    variants: [
      {
        name: String,
        value: String, 
      },
    ],

    specifications: [
      {
        key: String, 
        value: String, 
      },
    ],

    shippingDetails: {
      weight: { type: Number },
      dimensions: {
        length: Number,
        width: Number,
        height: Number,
      },
      deliveryTime: { type: String, default: "3-5 business days" },
      returnPolicy: { type: String, default: "7 days return policy" },
    },

    tags: [{ type: String }], 
    keywords: { type: String }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
