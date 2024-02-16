import { NewUserDto } from "../controllers/users/types";
import { IUser, User } from "../model/user";

const mapToNew = (user: NewUserDto): IUser => {
  return new User(user);
};

const save = async (user: IUser) => {
  const mongoDoc = new User(user);
  return mongoDoc.save();
};

const getAll = async () => {
  const users = await User.find();
  return users;
};

export const UserRepository = { getAll, mapToNew, save };
