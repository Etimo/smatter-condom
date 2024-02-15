import { Schema, Types, model } from "mongoose";
interface IUser {
    _id: Types.ObjectId;
    username: string;
    email: string;
}

const userSchema = new Schema<IUser>({
    _id: { type: "ObjectID", required: true },
    username: { type: String, required: true },
    email: { type: String, required: true }
  });


const User = model<IUser>('User', userSchema);
export { IUser, User, userSchema };
