import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "Ecom_DB",
    });
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectToMongoDB;
