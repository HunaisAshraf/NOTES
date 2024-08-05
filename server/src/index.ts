import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import userRouter from "./routes/userRoutes";
import noteRouter from "./routes/notesRoute";

const app = express();
dotenv.config();
connectDB();
app.use(cors());

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/note", noteRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
});
