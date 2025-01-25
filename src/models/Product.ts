import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productType: { type: String, required: true },
  productCategory: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  color: { type: String, default: null }, // Adjust to String if not ObjectId
  size: { type: String, default: null },  // Adjust to String if not ObjectId
  model: { type: String, default: null }, // Adjust to String if not ObjectId
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
