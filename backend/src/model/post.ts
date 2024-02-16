import { Schema, Types, model } from "mongoose";
type IPost = {
  _id: Types.ObjectId;
  content: string;
  authorId: Types.ObjectId;
};

const postSchema = new Schema<IPost>({
  content: { type: String, required: true },
  authorId: { type: "ObjectID", required: false },
});

const Post = model<IPost>("Post", postSchema);
export { IPost, Post, postSchema };
