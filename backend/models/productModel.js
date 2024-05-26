import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  description: { type: String, required: true },
  thumbnail: { type: String },
});

const Product = mongoose.model("product", productSchema);

export default Product;
