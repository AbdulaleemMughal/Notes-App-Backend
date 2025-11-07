import mongoose, { Document, Schema, Model } from "mongoose";

export interface INote extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  isFavourite: boolean;
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
  },
  {
    timestamps: true,
  }
);

export const Note: Model<INote> =
  mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);
