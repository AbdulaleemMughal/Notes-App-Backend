import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/UserModal.js";

dotenv.config();

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Please Log In first.");
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(
      token as string,
      process.env.JWT_SECRET_KEY as string
    ) as { _id: string };

    const user = await User.findById({ _id: decodedToken._id });
    if (!user) {
      throw new Error("No User Found!");
    }

    (req as any).user = user;

    next();
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "Unauthorized User",
    });
  }
};
