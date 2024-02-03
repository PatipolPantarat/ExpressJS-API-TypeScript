import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

interface CustomRequest extends Request {
  user: any; // Replace 'any' with the type of 'user' if it's known
}

export const authenticateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  // check if Authorization header is present
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header not found" });
  }

  // extract token from Authorization header
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  // verify token and extract payload
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  const userId = (decoded as any).userId;

  // check if user exists
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  // attach user to request object
  req.user = user;

  // call next middleware
  next();
};

export const authorizeUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // check if user is authorized
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // check role user
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "User dose not have permission" });
    }

    // call next middleware
    next();
  } catch (error) {
    console.log("AuthorizeUser error: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
