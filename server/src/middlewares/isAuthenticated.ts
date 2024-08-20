import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { IRequestWithUser } from "../utils/type";

export const isAuthenticated = (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token, process.env.JWT_SECRET!);
    if (!token) {
      throw new Error("token not found");
    }
    const user: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!user) {
      throw new Error("token not found");
    }
    req.user = { id: user._id.toString() };

    next();
  } catch (error) {
    console.log(error);

    res.status(403).send({ success: false, message: "User not authorised" });
  }
};
