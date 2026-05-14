import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userroutes.js";
import cors from "cors";

const app = express();

dotenv.config();

//  Middleware
app.use(express.json());
app.use(cors());

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