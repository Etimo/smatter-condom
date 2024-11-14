import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { useParams } from "react-router-dom";
import { Endpoints, useSmatterQuery } from "../../../api/api";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";

const ProfilePage = () => {
  const paramsUserId = useParams().userId;
  const query = useSmatterQuery(Endpoints.users.getById(paramsUserId!));
  const [parent] = useAutoAnimate();

  if (query.isError) return <p>Error: {query.error.message}</p>;
  if (query.isPending) return <div>Loading...</div>;

  const user = query.data;

  return (
    <div className="mx-auto bg-white dark:bg-gray-900">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">{user.username}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">3 Smats</p>
          </div>
        </div>
        <div className="relative h-48 bg-gray-300 dark:bg-gray-700">
          <img
            src="/placeholder.svg?height=192&width=768"
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <Avatar className="absolute -bottom-16 left-4 w-32 h-32 border-4 border-white dark:border-gray-900">
            <AvatarImage
              src="/placeholder.svg?height=128&width=128"
              alt={user.username}
            />
            <AvatarFallback>
              {user.username
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="p-4 pt-20">
          {user.isMyself && (
            <div className="flex justify-end mb-4">
              <Button variant="outline" className="rounded-full">
                Edit profile
              </Button>
            </div>
          )}
          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-gray-500 dark:text-gray-400">{user.username}</p>
          <p className="my-2">
            Hello, I love cats! 🐈
            {/* {user.bio} */}
          </p>
          <div className="flex flex-wrap gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center mr-4">
              <MapPin className="h-4 w-4 mr-1" />
              {/* {user.location} */}
              Stockholm
            </div>

            <div className="flex items-center mr-4">
              <Calendar className="h-4 w-4 mr-1" />
              Joined 2021-01-01
              {/* {user.joinDate} */}
            </div>
          </div>
          <div className="flex gap-4 mt-4 text-sm">
            <p>
              <span className="font-bold">5{/* {user.following} */}</span>{" "}
              <span className="text-gray-500 dark:text-gray-400">
                Following
              </span>
            </p>
            <p>
              {/* <span className="font-bold">{user.followers}</span>{" "} */}
              <span className="text-gray-500 dark:text-gray-400">
                Followers
              </span>
            </p>
          </div>
        </div>
      </header>
      <main>
        <nav className="flex border-b border-gray-200 dark:border-gray-800">
          <Button
            variant="ghost"
            className="flex-1 rounded-none border-b-2 border-blue-500"
          ></Button>
          <Button
            variant="ghost"
            className="flex-1 rounded-none text-gray-500 dark:text-gray-400"
          >
            Replies
          </Button>
        </nav>
        <div>
          {/* {user.tweets.map((tweet) => (
            <div
              key={tweet.id}
              className="p-4 border-b border-gray-200 dark:border-gray-800"
            >
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt={user.username}
                  />
                  <AvatarFallback>
                    {user.username
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold">{user.username}</p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {user.username}
                    </p>
                    <span className="text-gray-500 dark:text-gray-400">·</span>
                    <p className="text-gray-500 dark:text-gray-400">
                      {tweet.time}
                    </p>
                  </div>
                  <p className="mt-2">{tweet.content}</p>
                  <div className="flex justify-between mt-4 text-gray-500 dark:text-gray-400">
                    <p>{tweet.replies} Replies</p>
                    <p>{tweet.retweets} Retweets</p>
                    <p>{tweet.likes} Likes</p>
                  </div>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
