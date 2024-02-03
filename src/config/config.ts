import dotenv from "dotenv";
dotenv.config();

export const serverConfig = {
  port: process.env.PORT,
};
export const sessionConfig = {
  sessionSecret: process.env.SESSION_SECRET,
};

export const dbConfig = {
  mongoURI: process.env.MONGODB_URI,
};

export const jwtConfig = {
  saltRounds: process.env.BCRYPT_SALT_ROUNDS,
};
