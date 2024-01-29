import express from "express";
import cors from "cors";

// Configuration and Environment
import dotenv from "dotenv";
dotenv.config();

// Database
import connectToMongoDB from "./db/connect";
connectToMongoDB();

// Middleware
import bodyParser from "body-parser";

// Custom Middleware
import { authenticateUser, authorizeUser } from "./middlewares/auth";

// Router
import authRouter from "./routes/auth";
import productRouter from "./routes/product";

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: any, res: any) => {
  res.send("Hello, Express with TypeScript!");
});

app.use("/auth", authRouter);
app.use("/products", productRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
