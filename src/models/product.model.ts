import mongoose, { Schema, Document, Model } from "mongoose";

enum ProductStatus {
  active = "active",
  disabled = "disabled",
}
interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  category: string;
  stock?: number;
  thumbnail: string;
  images: string[];
  status?: ProductStatus;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema<IProduct> = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  thumbnail: { type: String, required: true },
  images: { type: [String] },
  status: { type: String, enum: ["active", "disabled"], default: "active" },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);

export default Product;
