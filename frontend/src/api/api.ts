import { useQuery } from "@tanstack/react-query";

const baseUrl = "http://localhost:3001";

const fetchFn = async <T>(url: string): Promise<T> => {
  const res = await fetch(url, {
    credentials: "include",
  });

  if (!res.ok) throw new Error();

  return res.json() as T;
};

const postFn = async <Body, Response>(
  url: string,
  body: Body,
  put?: boolean
): Promise<Response> => {
  const res = await fetch(url, {
    method: put ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  if (!res.ok) throw new Error();

  return res.json() as Response;
};

export type Endpoint<T> = (param: string) => {
  key: string[];
  request: (body?: any) => Promise<T>;
};

type Post = { id: string; content: string };
type NewPost = Omit<Post, "id">;

export const Endpoints = {
  posts: {
    get: () => {
      return {
        key: ["GET-posts"],
        request: () => fetchFn<Post[]>(`${baseUrl}/posts`),
      };
    },
    create: () => {
      return {
        key: ["POST-posts"],
        request: (body: NewPost) =>
          postFn<NewPost, Post>(`${baseUrl}/posts`, body),
      };
    },
  },
  auth: {
    signup: () => {
      return {
        key: ["POST-auth-signup"],
        request: (body: {
          username: string;
          email: string;
          password: string;
          displayName: string
        }) =>
          postFn<
            { username: string; email: string; password: string },
            { id: string; username: string; email: string }
          >(`${baseUrl}/auth/signup`, body),
      };
    },
    login: () => {
      return {
        key: ["POST-auth-login"],
        request: (body: { email: string; password: string }) =>
          postFn<
            { email: string; password: string },
            { id: string; username: string; email: string }
          >(`${baseUrl}/auth/login`, body),
      };
    },
    logout: () => {
      return {
        key: ["GET-auth-logout"],
        request: () => fetchFn(`${baseUrl}/auth/logout`),
      };
    },
    me: () => {
      return {
        key: ["GET-auth-me"],
        request: () =>
          fetchFn<{ id: string; username: string; email: string }>(
            `${baseUrl}/auth/me`
          ),
      };
    },
  },
  users: {
    get: () => {
      return {
        key: ["GET-users"],
        request: () =>
          fetchFn<{ id: string; username: string; email: string }[]>(
            `${baseUrl}/users`
          ),
      };
    },
    getById: (id: string) => {
      return {
        key: ["GET-users", id],
        request: () =>
          fetchFn<{
            id: string;
            username: string;
            email: string;
            isMyself: boolean;
            bio?: string;
            profilePictureUrl?: string;
            bannerPictureUrl?: string;
            displayName: string;
          }>(`${baseUrl}/users/${id}`),
      };
    },
    updateById: (id: string) => {
      return {
        key: ["PUT-users", id],
        request: (body: {
          email: string;
          bio?: string;
          profilePictureUrl?: string;
          bannerPictureUrl?: string;
          displayName: string;
        }) =>
          postFn<
            {
              email: string;
              bio?: string;
              profilePictureUrl?: string;
              bannerPictureUrl?: string;
              displayName: string;
            },
            { username: string; email: string }
          >(`${baseUrl}/users/${id}`, body, true),
      };
    },
  },
  followers: {
    followUser: () => {
      return {
        key: ["POST-following"],
        request: (followerId: string) =>
          postFn<{ followerId: string},
                 {follower: {followerId: string,
                   ownerUserId: string}}>(
            `${baseUrl}/followers`, {followerId}
          ),
      };
    },

    listFollowing: () => { return { key: ["GET-following"],
        request: (findBy: {ownerUserId: string, followerId: string}) => {
           const args  = findBy.ownerUserId ? `?ownerUserId=${findBy.ownerUserId}` :
            `?followerId=${findBy.followerId}`;
            return fetchFn<{
            id: string,
            followingId: string,
            followerId: string}[]>(`${baseUrl}/followers${args}`);
        }
    }
  }
},
} as const satisfies Record<string, Record<string, Endpoint<any>>>;

type ReactQueryOptions<T> = Parameters<typeof useQuery<T>>[0];

export const useSmatterQuery = <T>(
  endpoint: ReturnType<Endpoint<T>>,
  options?: Omit<ReactQueryOptions<T>, "queryKey" | "queryFn">
) => {
  return useQuery({
    ...options,
    queryKey: endpoint.key,
    queryFn: endpoint.request,
  });
};
