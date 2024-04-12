import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Post } from "shared/src/index";
import { Endpoints, useSmatterQuery } from "../api";

export const Feed = () => {
  const { isPending, data, error } = useSmatterQuery(Endpoints.posts.get);
  const [parent] = useAutoAnimate(/* optional config */);

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ul role="list" ref={parent} className="divide-y divide-gray-100">
      {data.map((post) => (
        <li
          key={post.id}
          className="items-center justify-center gap-x-6 gap-y-4 py-5 sm:flex-nowrap"
        >
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
};

type PostProps = {
  post: Post;
};

const PostCard = (props: PostProps) => {
  return (
    <div className="rounded-md shadow-md p-6">
      <div className="flex items-center">
        <img
          className="h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <div className="ml-3">
          <div className="min-w-0 flex-1">
            <div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">Mr Martinez</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Commented 5 days ago
              </p>
            </div>
            <div className="mt-2 text-sm text-gray-700">
              {/* <p>{activityItem.comment}</p> */}
            </div>
          </div>
          <p className="text-sm text-gray-900">{props.post.content}</p>
        </div>
      </div>
    </div>
  );
};
