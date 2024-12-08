import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "code product tidak boleh kosong"],
      minLength: [3, "Panjang minimal nama product minimal 3 karakter"],
      maxLength: [50, "Panjang maximal nama product minimal 300 karakter"],
    }, // Nama produk
    name: {
      type: String,
      minLength: [3, "Panjang minimal nama product adalah 3 karakter"],
      maxLength: [300, "Panjang maximal nama product adalah 300 karakter"],
      required: [true, "Nama Product tidak boleh kosong"],
    }, // Deskripsi produk
    price: {
      type: Number,
      required: [true, "Harga barang tidak boleh kosong"],
      max: 100000000,
    },
    ct_id: {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
      required: [true, "category tidak boleh kosong"],
    },
  },
  {
    timestamps: true, 
  }
);

const ProductModel = mongoose.model("Products", productSchema);
export default ProductModel;
