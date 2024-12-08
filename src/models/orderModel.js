import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "amount  tidak boleh kosong"],
      max: 100000000,
    }, // Nama produk
    pd_id: {
      type: mongoose.Types.ObjectId,
      ref: "Products",
      required: [true, "product id tidak boleh kosong"],
    },
  },
  {
    timestamps: true, // Otomatis mengelola `createdAt` dan `updatedAt`
  }
);

const OrderModel = mongoose.model("Orders", orderSchema);
export default OrderModel;
