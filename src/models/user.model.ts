import mongoose, { Schema, Document, Model } from "mongoose";

enum UserRole {
  admin = "admin",
  user = "user",
}
interface IUser extends Document {
  username: string;
  password: string;
  role: UserRole;
  createdAt: Date;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], required: true },
  createdAt: { type: Date, default: Date.now, required: true },
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
