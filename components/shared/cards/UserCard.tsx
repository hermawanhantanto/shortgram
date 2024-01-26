"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import FollowBtn from "../FollowBtn";

interface Props {
  user: string;
  currentUser: string;
  isFollowing: boolean;
}

const UserCard = ({ user, currentUser, isFollowing }: Props) => {
  const { name, picture, username, follower, following, clerkId, _id } =
    JSON.parse(user);

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
          <FollowBtn
            isFollowing={isFollowing}
            currentUser={currentUser}
            targetUser={JSON.stringify(_id)}
            classname="min-w-full"
          />
        </CardFooter>
      )}
    </Card>
  );
};

export default UserCard;
