import dotenv from "dotenv";
dotenv.config();

const config = {
  sessionSecret: process.env.SESSION_SECRET,
  saltRounds: process.env.BCRYPT_SALT_ROUNDS,
  port: process.env.PORT,
  mongoURI: process.env.MONGODB_URI,
};

export default config;
