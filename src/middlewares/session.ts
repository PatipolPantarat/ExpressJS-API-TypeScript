import express from "express";
import session from "express-session";

const app = express();

app.use(
  session({
    secret: "random-secret-key-string",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  })
);

export default app;
