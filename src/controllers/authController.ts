import bcrypt from "bcrypt";
import User from "../models/userModel";
import jwt from "jsonwebtoken";

export const me = async (req: any, res: any) => {
  if (!req.query.jwtToken) {
    res.status(400).json({
      error: "JWT Token required",
    });
    return;
  }
  const decoded = jwt.verify(
    req.query.jwtToken,
    process.env.JWT_SECRET as string
  );
  const username = (decoded as any).username;
  res.status(200).json({
    username,
  });
};
export const register = async (req: any, res: any) => {
  const { username, password, role } = req.body;
  console.log(req.body);
  // Check if username and password are set
  if (!username || !password || !role) {
    res.status(400).json({
      error: "Username and Password required",
    });
    return;
  }
  try {
    // Check if user exists
    const hadUser = await User.findOne({ username });
    if (hadUser) {
      res.status(401).json({
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
export const adminLogin = async (req: any, res: any) => {
  const { username, password } = req.body;
  // Check if username and password are set
  if (!username || !password) {
    res.status(400).json({
      error: "Username and Password required",
    });
    return;
  }

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({
        error: "User does not exist",
      });
      return;
    }

    // Check if user is admin
    if (user.role !== "admin") {
      res.status(401).json({
        error: "User is not an admin",
      });
      return;
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Check if password is correct
    if (passwordMatch) {
      // Generate jsonwebtoken
      const userData = {
        username: user.username,
        role: user.role,
      };
      const jwtToken = jwt.sign(userData, process.env.JWT_SECRET as string);

      // Save session
      // req.session.user = userData;
      // console.log("session when login : ", req.session.user);
      // console.log("session when login : ", req.session);

      res.status(200).json({
        message: "Login successful",
        jwtToken: jwtToken,
        role: user.role,
      });
      return;
    } else {
      res.status(401).json({
        error: "Wrong password",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const userLogin = async (req: any, res: any) => {
  const { username, password } = req.body;
  res.json({ username, password });
};
