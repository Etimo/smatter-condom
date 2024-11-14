import { Types } from "mongoose";
import { Follower, IFollowing, INewFollowing } from "./followermodel";

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


const findByOwnerId = async (owningUserId: Types.ObjectId) => {
  const ownedFollowers = await Follower.find({ owningUserId: owningUserId });
  return ownedFollowers;
};

export const FollowingRepository = {
  getAll,
  findByFollowingId,
  mapToNew,
  save,
};
