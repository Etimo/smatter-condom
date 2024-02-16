import { Schema, Types, model } from "mongoose";
type IUser = {
  _id: Types.ObjectId;
  username: string;
  email: string;
  profilePictureUrl: string;
};

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  profilePictureUrl: { type: String, required: false },
});

const User = model<IUser>("User", userSchema);
export { IUser, User, userSchema };
