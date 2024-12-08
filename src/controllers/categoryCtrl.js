import CategoryModel from "../models/categoryModel.js";

class CategoryController {
  // Mendapatkan semua kategori
  static async getAll(req, res, next) {
    try {
      const categories = await CategoryModel.find();
      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  // Mendapatkan kategori berdasarkan ID
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryModel.findById(id);
      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  // Menambahkan kategori baru
  static async create(req, res, next) {
    try {
      const { code, name } = req.body;
      const newCategory = new CategoryModel({ code, name });
      const savedCategory = await newCategory.save();
      res.status(201).json({
        success: true,
        data: savedCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  // Memperbarui kategori berdasarkan ID
  static async updateById(req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        id,
        updates,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatedCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
      res.status(200).json({
        success: true,
        data: updatedCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  // Menghapus kategori berdasarkan ID
  static async deleteById(req, res, next) {
    try {
      const { id } = req.params;
      const deletedCategory = await CategoryModel.findByIdAndDelete(id);
      if (!deletedCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;
