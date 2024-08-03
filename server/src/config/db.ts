import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("connection successfull");
  } catch (error: any) {
    console.log("error in connecting to db " + error.message);
  }
};
