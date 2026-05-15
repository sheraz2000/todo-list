import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userroutes.js";
import cors from "cors";

const app = express();

dotenv.config();

const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

//  Middleware
app.use(express.json());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin not allowed"));
    },
  })
);

// Routes
app.use("/api/user", userRoute);

// PORT
const port = process.env.PORT || 8000;
const mongoUrl = process.env.MONGO_URL;

// DB CONNECT
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("DB connected successfully");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
