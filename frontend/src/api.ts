const baseUrl = "http://localhost:3001";

type Post = {
  id: string;
  content: string;
  authorId: string;
};

export const Api = {
  posts: {
    get: { url: () => `${baseUrl}/posts`, type: {} as Post, key: "GET-posts" },
  },
} as const;
