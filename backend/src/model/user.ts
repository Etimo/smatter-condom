import { Schema, Types, model } from "mongoose";

type IUser = {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
};

type INewUser = Omit<IUser, "_id">;

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);
export { INewUser, IUser, User, userSchema };
