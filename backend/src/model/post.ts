import { Schema, Types, model } from "mongoose";
type IPost = {
  _id: Types.ObjectId;
  content: string;
  authorId: Types.ObjectId;
};

const postSchema = new Schema<IPost>({
  content: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, required: false },
});

const Post = model<IPost>("Post", postSchema);
export { IPost, Post, postSchema };
