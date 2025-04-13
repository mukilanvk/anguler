import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "User", required: true},
    products: [
      {
        productId: {type: Schema.Types.ObjectId, ref: "Product", required: true},
        quantity: {type: Number, required: true, min: 1},
      },
    ],
    productCount: Number,
    status: { type: String, enum: ['draft', 'confirm', 'cancel'], default: 'draft' },
    orderDate: { type: Date, default: Date.now},
  },
  {
    timestamps: true,
  }
);

export const orderModal = mongoose.models.orderModal || mongoose.model("Order", OrderSchema);


