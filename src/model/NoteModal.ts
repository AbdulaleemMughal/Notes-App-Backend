import mongoose, { Document, Schema, Model } from "mongoose";

export interface INote extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  isFavourite: boolean;
  color: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const NoteSchema = new Schema<INote>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [200000, "Description is too long"],
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "0_6px_12px_rgba(255,223,186,0.5)",
    },
  },
  {
    timestamps: true,
  }
);

export const Note: Model<INote> =
  mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);
