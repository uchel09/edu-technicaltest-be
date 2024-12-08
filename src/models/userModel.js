import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, "Panjang minimal nama adalah 3 karakter"],
      maxLength: [300, "Panjang maksimal nama adalah 300 karakter"],
      required: [true, "Nama tidak boleh kosong"],
    },
    password: {
      type: String,
      required: [true, "Password tidak boleh kosong"],
      minLength: [8, "Panjang minimal password adalah 8 karakter"],
      maxLength: [100, "Panjang maksimal password adalah 100 karakter"],
    },
    email: {
      type: String,
      required: [true, "Email tidak boleh kosong"],
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Format email tidak valid"],
    },
    phone_number: {
      type: String,
      required: [true, "Nomor telepon tidak boleh kosong"],
      match: [
        /^\+?\d{9,15}$/,
        "Format nomor telepon tidak valid (contoh: +6281234567890)",
      ],
    },
    address: {
      type: {
        province: { type: String, required: true },
        city: { type: String, required: true },
        district: { type: String, required: true },
        street: { type: String, required: true },
        postal_code: { type: String, required: true },
      },
      required: [true, "Alamat tidak boleh kosong"],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("Users", userSchema);
export default UserModel;
