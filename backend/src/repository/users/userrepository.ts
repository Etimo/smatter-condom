import { NewUserDto } from "../../controllers/users/types";
import { INewUser, IUser, User } from "../../model/user";

const mapToNew = (user: NewUserDto): IUser => {
  return new User(user);
};

const save = async (user: INewUser) => {
  const mongoDoc = new User(user);
  return mongoDoc.save();
};

const getAll = async () => {
  const users = await User.find();
  return users;
};

const getById = async (id: string) => {
  return User.findById(id);
};

export const UserRepository = { getAll, mapToNew, save, getById };
