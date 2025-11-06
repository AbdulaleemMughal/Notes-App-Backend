import mongoose, { Document, Schema, Model } from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';

dotenv.config();

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IUserMethods {
  getJwtToken(): Promise<string>;
  validatePassword(password: string): boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, Model<IUser, {}, IUserMethods>>(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.getJwtToken = function (): string {
  const user = this;
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    throw new Error("JWT_SECRET_KEY is not defined in environment variables");
  }

  const token = jwt.sign({ _id: user._id }, secretKey, {
    expiresIn: "1d",
  });
  return token;
};

UserSchema.methods.validatePassword = async function (passwordInputByUser: string): Promise<boolean> {
  const user = this;
  const hashedPassword = user.password;

  const isPasswordCorrect = await bcrypt.compare(passwordInputByUser, hashedPassword);

  return isPasswordCorrect;
}

const User =
  (mongoose.models.User as UserModel) ||
  mongoose.model<IUser, UserModel>("User", UserSchema);

export default User;
