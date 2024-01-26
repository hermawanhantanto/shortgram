"use client";
import React from "react";
import { Button } from "../ui/button";
import { followUser } from "@/lib/action/user.action";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface Props {
  isFollowing: boolean;
  currentUser: string;
  targetUser: string;
  classname?: string;
}

const FollowBtn = ({
  isFollowing,
  currentUser,
  targetUser,
  classname,
}: Props) => {
  const pathname = usePathname();
  const handleFollow = async () => {
    try {
      await followUser({
        currentClerkId: currentUser,
        targetUserId: JSON.parse(targetUser),
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
    <Button
      className={`${isFollowing ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-blue-800"} flex-center w-fit rounded px-6 py-2 text-white transition-colors duration-200 ease-in-out ${classname}`}
      onClick={handleFollow}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowBtn;
