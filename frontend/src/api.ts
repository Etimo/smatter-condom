import { useQuery } from "@tanstack/react-query";
import { NewPost, Post } from "shared/src/spec";

const baseUrl = "http://localhost:3001";

const fetchFn = async <T>(url: string): Promise<T> => {
  const res = await fetch(url, {
    credentials: "include",
  });
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
