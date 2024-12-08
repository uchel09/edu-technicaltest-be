import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: [true, "code product tidak boleh kosong"],
      minLength: [3, "Panjang minimal nama product minimal 3 karakter"],
      maxLength: [50, "Panjang maximal nama product minimal 300 karakter"],
    }, // Nama produk
    name: {
      type: String,
      unique: true,
      minLength: [3, "Panjang minimal nama product adalah 3 karakter"],
      maxLength: [300, "Panjang maximal nama product adalah 300 karakter"],
      required: [true, "Nama Product tidak boleh kosong"],
    }, // Deskripsi produk
  },
  {
    timestamps: true, // Otomatis mengelola `createdAt` dan `updatedAt`
  }
);

const CategoryModel = mongoose.model("Categories", categorySchema);
export default CategoryModel;
