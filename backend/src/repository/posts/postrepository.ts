import { NewPostDto } from "../../controllers";
import { IPost, Post } from "../../model/post";

const mapToNew = (post: NewPostDto): IPost => {
  console.log("post", post);
  return new Post(post);
};

const save = async (post: IPost) => {
  const mongoDoc = new Post(post);
  return mongoDoc.save();
};

const getAll = async () => {
  const posts = await Post.find();
  return posts;
};

export const PostRepository = { mapToNew, getAll, save };
