import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

class UserController {
  // Mendapatkan semua data pengguna
  static async getAll(req, res, next) {
    try {
      const users = await UserModel.find().select("-password");
      res.status(200).json({
        length: users.length,
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  // Mendapatkan pengguna berdasarkan ID
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id).select("-password");

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  // Registrasi pengguna baru
  static async register(req, res, next) {
    try {
      const { name, email, phone_number, password, address } = req.body;
      const newUser = new UserModel({
        name,
        email,
        phone_number,
        password,
        address,
      });
      const savedUser = await newUser.save();
      res.status(201).json({
        success: true,
        data: savedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  // Login pengguna
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user || user.password !== password) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }
      user.password = "";
      const token = await jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: user,
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update data pengguna berdasarkan ID
  static async updateById(req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedUser = await UserModel.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });
      if (!updatedUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      updatedUser.password = "";
      const token = await jwt.sign(
        { user: updatedUser },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.status(200).json({
        success: true,
        data: updatedUser,
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  // Hapus pengguna berdasarkan ID
  static async deleteById(req, res, next) {
    try {
      const { id } = req.params;
      const deletedUser = await UserModel.findByIdAndDelete(id);
      if (!deletedUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
