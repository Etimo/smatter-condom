// not important, just here to test imports!

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

export type NewPost = Pick<Post, "content">;

export type Comment = {
  id: string;
  content: string;
};
