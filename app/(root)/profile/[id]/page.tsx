import Metric from "@/components/shared/Metric";
import NoResult from "@/components/shared/NoResult";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserByClerkId } from "@/lib/action/user.action";
import { URLProps } from "@/types";
import React from "react";
import { format } from "date-fns";
import { auth } from "@clerk/nextjs";
import FollowBtn from "@/components/shared/FollowBtn";
import Link from "next/link";
import Stats from "@/components/shared/Stats";

const Page = async ({ params }: URLProps) => {
  const { userId } = auth();
  const user = await getUserByClerkId(params.id);
  const currentUser = await getUserByClerkId(userId!);

  if (!user) return <NoResult />;
  return (
    <section className="flex w-full flex-col">
      <div className="flex justify-between max-sm:flex-col-reverse">
        <div className="flex gap-4 max-sm:flex-col sm:items-center">
          <Avatar className="size-32">
            <AvatarImage src={user.picture} />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h3 className="h3-bold">{user.name}</h3>
            <p className="body-regular">@{user.username}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="body-regular flex items-center gap-1">
                <span>{user.follower.length}</span>
                <p className="text-slate-500 dark:text-slate-300">Followers</p>
              </div>
              <div className="body-regular flex items-center gap-1">
                <span>{user.following.length}</span>
                <p className="text-slate-500 dark:text-slate-300">Following</p>
              </div>
            </div>
            <div className="mt-2">
              <Metric
                image="/assets/icons/calendar.svg"
                alt="calendar"
                label={`Joined at ${format(user.joinedAt, "dd MMMM yyyy").toString()}`}
              />
            </div>
          </div>
        </div>
        {userId === user.clerkId ? (
          <Link
            className="body-semibold flex-center h-[46px] rounded bg-secondary px-6 py-2 text-primary dark:hover:text-white max-sm:self-end"
            href={`/profile/${userId}/edit`}
          >
            Edit Profile
          </Link>
        ) : (
          <FollowBtn
            isFollowing={user.follower.includes(currentUser._id)}
            currentUser={userId!}
            targetUser={JSON.stringify(user._id)}
            classname="max-sm:self-end"
          />
        )}
      </div>
      <h2 className="h3-bold mt-10 text-primary">
        All Stats - {user.reputation}
      </h2>
      <div className="mt-10">
        <Stats gold={10} silver={10} bronze={10} comments={10} contents={10} />
      </div>
    </section>
  );
};

export default Page;
