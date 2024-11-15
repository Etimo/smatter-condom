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

const search = async (query: string) => {
  const searchRegex = new RegExp(query, 'i');

  return User.find({
    $or: [
      { username: searchRegex },
      { email: searchRegex }
    ]
  })
  .select('username email')
  .exec();
};

export const UserRepository = { getAll, mapToNew, create, getById, getByEmail, search };
