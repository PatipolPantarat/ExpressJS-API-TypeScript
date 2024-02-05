import mongoose, { Schema, Document, Model } from "mongoose";

enum CategoryStatus {
  active = "active",
  inactive = "inactive",
}

interface ICategory extends Document {
  name: string;
  status: CategoryStatus;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema: Schema<ICategory> = new Schema<ICategory>({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: true,
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

const Category: Model<ICategory> = mongoose.model<ICategory>(
  "Category",
  categorySchema
);

export default Category;
