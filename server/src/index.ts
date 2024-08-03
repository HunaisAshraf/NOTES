import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

const app = express();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
});
