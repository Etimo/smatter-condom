import { Types } from "mongoose";
import { Follower, IFollowing, INewFollowing } from "./../../model/followers";

const mapToNew = (following: INewFollowing): IFollowing => {
  return new Follower(following);
};

const save = async (following: IFollowing) => {
  const mongoDoc = new Follower(following);
  return mongoDoc.save();
};

const getAll = async () => {
  const users = await Follower.find();
  return users;
};

const findByFollowingId = async (following: Types.ObjectId) => {
  const followingUsers = await Follower.find({ followingId: following });
  return followingUsers;
};
export const FollowingRepository = {
  getAll,
  findByFollowingId,
  mapToNew,
  save,
};
