import type { Request, Response } from "express";
import { signUpValidation } from "../utils/signUpValidation.js";
import User from "../model/UserModal.js";
import bcrypt from "bcrypt";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { userName, email, password, layout, gender, image, aboutYourself } =
      req.body;

    if (!userName) {
      return res.status(400).json({
        message: "Username is required",
      });
    }

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const alreadyExistEmail = await User.findOne({ email });
    if (alreadyExistEmail) {
      throw new Error("Email alreay exists.");
    }

    signUpValidation(email, password);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      userName,
      email,
      layout,
      password: hashedPassword,
      gender,
      image,
      aboutYourself,
    });

    await user.save();
    const token = await user.getJwtToken();

    res.setHeader("Authorization", `Bearer ${token}`);

    res.status(200).json({
      success: true,
      message: "Signup successful!",
      token,
      user: {
        _id: user._id,
        username: user.userName,
        email: user.email,
        layout: user.layout,
        gender: user.gender,
        image: user.image,
        aboutYourself: user.aboutYourself,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (err) {
    res.status(401).json({
      message: err instanceof Error ? err.message : "Error while Signing Up",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      throw new Error("Email and Password are required!");
    }

    const savedUser = await User.findOne({ userName: userName });
    if (!savedUser) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await savedUser.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }

    const token = await savedUser.getJwtToken();

    res.setHeader("Authorization", `Bearer ${token}`);

    res.status(200).json({
      success: true,
      message: "Login Successfull!",
      token: token,
      user: savedUser,
    });
  } catch (err) {
    res.status(401).json({
      message: err instanceof Error ? err.message : "Validation failed",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const fullUser = await User.findById(user._id).select("-password");
    if (!fullUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user: fullUser,
    });
  } catch (err) {
    res.status(400).json({
      message:
        err instanceof Error ? err.message : "Failed to get user details.",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "Logged out successfully!",
    });
  } catch (err) {
    res.status(500).json({ message: "Logout failed!" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, image, gender, layout, aboutYourself } = req.body;
    const user = req.user;
    if (!user) {
      throw new Error("No User Found.");
    }

    const loggedInUser = await User.findById({ _id: user._id });
    if (!loggedInUser) {
      throw new Error("Please LogIn First!");
    }

    if (userName !== undefined) loggedInUser.userName = userName;
    if (email !== undefined) loggedInUser.email = email;
    if (gender !== undefined) loggedInUser.gender = gender;
    if (layout !== undefined) loggedInUser.layout = layout;
    if (aboutYourself !== undefined) loggedInUser.aboutYourself = aboutYourself;

    await loggedInUser.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully!",
      user: loggedInUser,
    });
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "Failed to update user .",
    });
  }
};
