import mongoose, { Document, Model } from "mongoose";
export interface INote extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    isFavourite: boolean;
    color: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const Note: Model<INote>;
//# sourceMappingURL=NoteModal.d.ts.map