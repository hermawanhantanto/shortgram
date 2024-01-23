"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { followUser } from "@/lib/action/user.action";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface Props {
  user: string;
  currentUser: string;
  isFollowing: boolean;
}

const UserCard = ({ user, currentUser, isFollowing }: Props) => {
  const { name, picture, username, follower, following, clerkId, _id } =
    JSON.parse(user);

  const pathname = usePathname();
  const handleFollow = async () => {
    try {
      await followUser({
        currentClerkId: currentUser,
        targetUserId: _id,
        path: pathname,
        isFollowing,
      });

      if (isFollowing) {
        toast("Success Unfollowing");
      } else {
        toast("Success Following");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <Card className="min-w-full rounded-xl shadow transition ease-in-out hover:translate-y-5 dark:border-none sm:min-w-[250px]">
      <CardHeader className="flex flex-col items-center justify-center">
        <Avatar className="size-20">
          <AvatarImage src={picture} />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
        <Link href={`/profile/${clerkId}`}>
          <CardTitle className="paragraph-semibold">{name}</CardTitle>
        </Link>
        <CardDescription>@{username}</CardDescription>
      </CardHeader>
      <CardContent className="flex-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <p className="base-bold">{follower.length}</p>
          <CardDescription>Follower</CardDescription>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="base-bold">{following.length}</p>
          <CardDescription>Following</CardDescription>
        </div>
      </CardContent>
      {currentUser !== clerkId && (
        <CardFooter className="flex-center">
          <Button
            className="min-w-full rounded text-white"
            onClick={handleFollow}
            variant={`${isFollowing ? "destructive" : "default"}`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default UserCard;
