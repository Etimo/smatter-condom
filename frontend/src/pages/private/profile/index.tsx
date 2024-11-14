import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useMutation } from "@tanstack/react-query";
import { Calendar, MapPin } from "lucide-react";
import { useParams } from "react-router-dom";
import { Endpoints, useSmatterQuery } from "../../../api/api";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { EditProfileModal } from "./edit-profile";
import { ProfileSmats } from "./profile-smats";

const ProfilePage = () => {
  const paramsUserId = useParams().userId;
  const profileQuery = useSmatterQuery(Endpoints.users.getById(paramsUserId!));
  const followMutation = useMutation({
    mutationFn: Endpoints.followers.followUser().request,
    //onSucce
  });
  const [parent] = useAutoAnimate();

  if (profileQuery.isError) return <p>Error: {profileQuery.error.message}</p>;
  if (profileQuery.isPending) return <div>Loading...</div>;

  const user = profileQuery.data;

  return (
    <>
      <div className="mx-auto bg-white dark:bg-gray-900">
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="relative h-48 bg-gray-300 dark:bg-gray-700">
            <img
              src={user.bannerPictureUrl}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <Avatar className="absolute -bottom-16 left-4 w-32 h-32 border-4 border-white dark:border-gray-900">
              <AvatarImage src={user.profilePictureUrl} alt={user.username} />
              <AvatarFallback>{user.username}</AvatarFallback>
            </Avatar>
          </div>
          <div className="p-4 pt-20">
            {user.isMyself && (
              <div className="mb-8">
                <EditProfileModal
                  userId={user.id}
                  defaultValues={{ ...user }}
                />
              </div>
            )}

            {!user.isMyself && (
              <div className="flex justify-end mb-4">
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => followMutation.mutate(paramsUserId!)}
                >
                  Follow this user
                </Button>
              </div>
            )}
            <h2 className="text-xl font-bold">{user.displayName}</h2>
            <p className="text-gray-500 dark:text-gray-400">{user.username}</p>
            <p className="my-2">{user.bio}</p>
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
            >
              Recent Smats
            </Button>
            <Button
              variant="ghost"
              className="flex-1 rounded-none text-gray-500 dark:text-gray-400"
            >
              Replies
            </Button>
          </nav>
          <div>
            <ProfileSmats userId={user.id} />
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfilePage;
