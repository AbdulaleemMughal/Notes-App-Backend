import { Document, Model } from "mongoose";
export interface IUser extends Document {
    userName: string;
    email: string;
    password: string;
    layout: string;
    image: string;
    gender: string;
    aboutYourself: string;
    createdAt?: Date;
    updatedAt?: Date;
}
interface IUserMethods {
    getJwtToken(): Promise<string>;
    validatePassword(password: string): boolean;
}
type UserModel = Model<IUser, {}, IUserMethods>;
declare const User: UserModel;
export default User;
//# sourceMappingURL=UserModal.d.ts.map