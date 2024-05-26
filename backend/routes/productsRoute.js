import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();

router.get("/pics", async (req, res) => {
  try {
    let productIds = req.query.ids; // Get product IDs from query parameters
    if (!productIds) {
      return res.status(400).json({ error: "Product IDs are required" });
    }
    // Check if productIds is already an array
    if (!Array.isArray(productIds)) {
      // Split the string into an array of IDs
      productIds = productIds.split(",");
    }

    const imageUrls = {};

    // Fetch products based on the provided IDs
    const products = await Product.find({ _id: { $in: productIds } });
    products.forEach((product) => {
      imageUrls[product._id] = product.thumbnail; // Assuming 'thumbnail' is the field in your product model that stores the image URL
    });

    res.json(imageUrls);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      return res.status(404).json({ error: "No Products found" });
    }
    res.json({ products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/add-product", async (req, res) => {
  try {
    const { title, category, price, discount, description, thumbnail } = req.body;
    const newProduct = new Product({
      title,
      category,
      price,
      discount,
      description,
      thumbnail
    });
    console.log(newProduct);
    await newProduct.save();
    res.json({ message: "Product added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
