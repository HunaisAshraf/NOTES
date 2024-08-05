import { Request, Response } from "express";
import { UserModel } from "../model/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .json({ success: true, message: "Login successfull", user, token });
  } catch (error) {
    console.log(error);
    res.send("failed to login");
  }
};

export const signupController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Enter valid" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new UserModel({ name, email, password: hashedPassword });

    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .json({ success: true, message: "Login successfull", user, token });
  } catch (error) {}
};
