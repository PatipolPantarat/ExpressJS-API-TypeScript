import mongoose, { Schema, Document, Model } from "mongoose";

enum CategoryStatus {
  active = "active",
  disabled = "disabled",
}

interface ICategory extends Document {
  name: string;
  value?: string;
  status?: CategoryStatus;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema: Schema<ICategory> = new Schema<ICategory>({
  name: { type: String, required: true },
  value: { type: String },
  status: { type: String, enum: ["active", "disabled"], default: "active" },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

const Category: Model<ICategory> = mongoose.model<ICategory>(
  "Category",
  categorySchema
);

export default Category;
