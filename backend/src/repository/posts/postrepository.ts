import { IPost, Post } from "../../model/post";

// const mapToNew = (user: NewUserDto): IPost => {
//   return new User(user);
// };

const save = async (post: IPost) => {
  const mongoDoc = new Post(post);
  return mongoDoc.save();
};

const getAll = async () => {
  const posts = await Post.find();
  return posts;
};

export const PostRepository = { getAll, save };
