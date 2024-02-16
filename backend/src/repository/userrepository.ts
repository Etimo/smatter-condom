import { NewUserDto } from "../controllers/users/types";
import { IUser, User } from "../model/user";

export const mapToNewUser = (user: NewUserDto): IUser => {
  return new User(user);
};

export const save = async (user: IUser) => {
  const mongoDoc = new User(user);
  return mongoDoc.save();
};

export const getAll = async () => {
  const users = await User.find();
  return users;
};
