import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  Name: { type: String, required: true, unique: true },
  productImage: [{ type: String, required: true}],
  price: { type: Number, required: true },
  productCount: { type: Number, required: true }
})

export const productModal =mongoose.model.productModal || mongoose.model("products", productSchema);