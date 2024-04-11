// Reflects the types of the api

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Post = {
  id: string;
  content: string;
  // authorId: string;
};

export type NewPost = Pick<Post, "content">;

export type Comment = {
  id: string;
  content: string;
};
