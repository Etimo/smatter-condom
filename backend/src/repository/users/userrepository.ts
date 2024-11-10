import { NewUserDto } from "../../controllers/users/types";
import { INewUser, IUser, User } from "../../model/user";

const mapToNew = (user: NewUserDto): IUser => {
  return new User(user);
};

const create = async (user: INewUser) => {
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

const getByEmail = async (email: string) => {
  return User.findOne({ email });
};

export const UserRepository = { getAll, mapToNew, create, getById, getByEmail };
