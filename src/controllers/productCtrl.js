import ProductModel from "../models/productModel.js";

// Mendapatkan semua produk
class ProductController {
  static async getAll(req, res, next) {
    try {
      const products = await ProductModel.find().populate("ct_id");
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  // Mendapatkan produk berdasarkan ID
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductModel.findById(id).populate("ct_id");
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  // Menambahkan produk baru
  static async create(req, res, next) {
    try {
      const { code, name, price, ct_id } = req.body;
      const newProduct = new ProductModel({ code, name, price, ct_id });
      const savedProduct = await newProduct.save();
      const populatedProduct = await ProductModel.findById(
        savedProduct._id
      ).populate("ct_id");

      res.status(201).json({
        success: true,
        data: populatedProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  // Memperbarui produk berdasarkan ID
  static async updateById(req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;
      console.log(updates)
      const updatedProduct = await ProductModel.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      }).populate("ct_id");
      if (!updatedProduct) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      res.status(200).json({
        success: true,
        data: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  // Menghapus produk berdasarkan ID
  static async deleteById(req, res, next) {
    try {
      const { id } = req.params;
      const deletedProduct = await ProductModel.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
