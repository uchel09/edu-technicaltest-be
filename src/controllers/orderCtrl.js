import OrderModel from "../models/orderModel.js";

class OrderController {
  // Mendapatkan semua order
  static async getAll(req, res, next) {
    try {
      const orders = await OrderModel.find().populate("pd_id");
      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }

  // Mendapatkan order berdasarkan ID
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const order = await OrderModel.findById(id).populate("pd_id");
      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });
      }
      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  // Menambahkan order baru
  static async create(req, res, next) {
    try {
      const { amount, pd_id } = req.body;
      const newOrder = new OrderModel({ amount, pd_id });
      const savedOrder = await newOrder.save();
      res.status(201).json({
        success: true,
        data: savedOrder,
      });
    } catch (error) {
      next(error);
    }
  }

  // Memperbarui order berdasarkan ID
  // static async updateById(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     const updates = req.body;
  //     const updatedOrder = await OrderModel.findByIdAndUpdate(id, updates, {
  //       new: true,
  //       runValidators: true,
  //     }).populate("pd_id");
  //     if (!updatedOrder) {
  //       return res
  //         .status(404)
  //         .json({ success: false, message: "Order not found" });
  //     }
  //     res.status(200).json({
  //       success: true,
  //       data: updatedOrder,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // Menghapus order berdasarkan ID
  static async deleteById(req, res, next) {
    try {
      const { id } = req.params;
      const deletedOrder = await OrderModel.findByIdAndDelete(id);
      if (!deletedOrder) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });
      }
      res.status(200).json({
        success: true,
        message: "Order deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default OrderController;
