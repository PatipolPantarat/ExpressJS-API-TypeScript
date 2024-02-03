import express from "express";
import cors from "cors";

// Configuration and Environment
import { serverConfig } from "./config/config";

// Database
import connectToMongoDB from "./db/connect";
connectToMongoDB();

// Middleware
import bodyParser from "body-parser";

// Custom Middleware
import { authenticateUser, authorizeUser } from "./middlewares/auth";
import sessionApp from "./middlewares/session";

// Router
import authRouter from "./routes/auth";
import productRouter from "./routes/product";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(sessionApp);

app.get("/", (req: any, res: any) => {
  res.send("Hello, Express with TypeScript!");
});

app.use("/auth", authRouter);
app.use("/products", productRouter);

app.listen(serverConfig.port, () => {
  console.log(`Example app listening on port ${serverConfig.port}!`);
});
