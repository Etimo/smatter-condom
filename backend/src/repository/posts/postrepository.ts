import { INewPost, Post } from "../../model/post";

const save = async (post: INewPost) => {
  return new Post(post).save();
};

const getAll = async () => {
  const posts = await Post.find();
  return posts;
};

export const PostRepository = { getAll, save };
