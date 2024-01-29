import bcrypt from "bcrypt";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
export const register = async (req: any, res: any) => {
  const { username, password, role } = req.body;
  console.log(req.body);
  // Check if username and password are set
  if (!username || !password || !role) {
    res.status(400).send({
      error: "Username and Password required",
    });
    return;
  }
  try {
    // Check if user exists
    const hadUser = await User.findOne({ username });
    if (hadUser) {
      res.status(401).send({
        error: "User already exists",
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add new user
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });
    // Save user to database
    await newUser.save();

    res.status(201).json({
      message: "Registration successful",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
export const login = async (req: any, res: any) => {
  const { username, password } = req.body;
  // Check if username and password are set
  if (!username || !password) {
    res.status(400).send({
      error: "Username and Password required",
    });
    return;
  }
  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).send({
        error: "User does not exist",
      });
      return;
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Check if password is correct
    if (passwordMatch) {
      // Generate token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET as string
      );
      res.send({
        message: "Login successful",
        token: token,
      });
      return;
    } else {
      res.status(401).send({
        error: "Wrong password",
      });
      return;
    }
  } catch (error) {
    res.status(500).send({
      error: "Internal server error",
    });
  }
};

export const getme = async (req: any, res: any) => {
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
  const userId = (decoded as any).id;

  // check if user exists
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  // attach user to request object
  res.json({ message: "User found", user: user });
};
