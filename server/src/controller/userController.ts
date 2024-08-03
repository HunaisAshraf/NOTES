import { Request, Response } from "express";
import { UserModel } from "../model/userModel";
import bcryptjs from "bcryptjs";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const passwordMatch = await bcryptjs.compare(password, user?.password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Login successfull" });
  } catch (error) {
    console.log(error);
    res.send("failed to login");
  }
};

export const signupController = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
