const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
  {
    name: "Black Hoodie",
    price: 1299,
    category: "Hoodies",
    image: "hoodie.jpg",
    description: "Premium black streetwear hoodie.",
    stock: 15
  },
  {
    name: "Cargo Pants",
    price: 1499,
    category: "Pants",
    image: "cargo.jpg",
    description: "Stylish cargo pants for everyday streetwear.",
    stock: 10
  }
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    await Product.insertMany(products);

    console.log("Products added successfully!");

    mongoose.connection.close();
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });