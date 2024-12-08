import mongoose from "mongoose";
import UserModel from "./models/userModel.js"; // Import model User
import CategoryModel from "./models/categoryModel.js"; // Import model Category
import ProductModel from "./models/productModel.js"; // Import model Product
import OrderModel from "./models/orderModel.js"; // Import model Order
import dotenv from "dotenv"
import dbConnection from "./config/dbConnection.js";

dotenv.config();
dbConnection();

// Dummy data
const dummyUsers = [
  {
    name: "Alice",
    email: "alice@example.com",
    phone_number: "081234567890",
    password: "password123",
    address: {
      province: "Jawa Barat",
      city: "Bandung",
      district: "Coblong",
      street: "Jalan Setiabudi",
      postal_code: "40141",
    },
  },
  {
    name: "Bob",
    email: "bob@example.com",
    phone_number: "081987654321",
    password: "password456",
    address: {
      province: "DKI Jakarta",
      city: "Jakarta Selatan",
      district: "Kebayoran Baru",
      street: "Jalan Sudirman",
      postal_code: "10220",
    },
  },
];

const dummyCategories = [
  { code: "C001", name: "Elektronik" },
  { code: "C002", name: "Fashion" },
  { code: "C003", name: "Peralatan Rumah Tangga" },
];

const dummyProducts = [
  {
    code: "P001",
    name: "Laptop Gaming",
    price: 15000000,
  },
  {
    code: "P002",
    name: "Kemeja Batik",
    price: 200000,
  },
  {
    code: "P003",
    name: "Setrika Listrik",
    price: 300000,
  },
];

const insertDummyData = async () => {
  try {

    // Clear existing data
    await UserModel.deleteMany({});
    await CategoryModel.deleteMany({});
    await ProductModel.deleteMany({});
    await OrderModel.deleteMany({});

    console.log("Existing data cleared!");

    // Insert Users
    const savedUsers = await UserModel.insertMany(dummyUsers);
    console.log("Users added:", savedUsers);

    // Insert Categories
    const savedCategories = await CategoryModel.insertMany(dummyCategories);
    console.log("Categories added:", savedCategories);

    // Insert Products with random categories
    const productsWithCategories = dummyProducts.map((product, index) => ({
      ...product,
      ct_id: savedCategories[index % savedCategories.length]._id, // Randomize category assignment
    }));

    const savedProducts = await ProductModel.insertMany(productsWithCategories);
    console.log("Products added:", savedProducts);

    // Insert Orders with random products
    const dummyOrders = savedProducts.map((product) => ({
      amount: product.price,
      pd_id: product._id,
    }));

    const savedOrders = await OrderModel.insertMany(dummyOrders);
    console.log("Orders added:", savedOrders);

    // Close the database connection
    await mongoose.connection.close();
    console.log("Database connection closed!");
  } catch (err) {
    console.error("Error:", err.message);
  }
};

// Run the function
insertDummyData();
