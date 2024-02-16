import { IUser, User } from "../model/user";

export const save = async (user: IUser) => {
  const mongoDoc = new User(user);
  await mongoDoc.save();
};

export const getAll = async () => {
  const users = await User.find();
  return users;
};
