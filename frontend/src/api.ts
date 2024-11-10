import { useQuery } from "@tanstack/react-query";
import type { NewPost, Post } from "./types/spec";

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
  body: Body
): Promise<Response> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  if (!res.ok) throw new Error();

  return res.json() as Response;
};

export type Endpoint<T> = {
  key: string[];
  request: (body?: any) => Promise<T>;
};

export const Endpoints = {
  posts: {
    get: {
      key: ["GET-posts"],
      request: () => fetchFn<Post[]>(`${baseUrl}/posts`),
    },
    create: {
      key: ["POST-posts"],
      request: (body: NewPost) =>
        postFn<NewPost, Post>(`${baseUrl}/posts`, body),
    },
  },
  auth: {
    signup: {
      key: ["POST-auth-signup"],
      request: (body: { username: string; email: string; password: string }) =>
        postFn<{ username: string; email: string; password: string }, void>(
          `${baseUrl}/auth/signup`,
          body
        ),
    },
    login: {
      key: ["POST-auth-login"],
      request: (body: { email: string; password: string }) =>
        postFn<{ email: string; password: string }, void>(
          `${baseUrl}/auth/login`,
          body
        ),
    },
  },
} as const satisfies Record<string, Record<string, Endpoint<any>>>;

type ReactQueryOptions<T> = Parameters<typeof useQuery<T>>[0];

export const useSmatterQuery = <T>(
  endpoint: Endpoint<T>,
  options?: Omit<ReactQueryOptions<T>, "queryKey" | "queryFn">
) => {
  return useQuery({
    ...options,
    queryKey: endpoint.key,
    queryFn: endpoint.request,
  });
};
