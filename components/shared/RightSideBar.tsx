import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { getTopTags } from "@/lib/action/tags.action";
import { getTopUsers } from "@/lib/action/user.action";

const RightSideBar = async () => {
  const topTags = await getTopTags();
  const topUsers = await getTopUsers();
  return (
    <div className="sticky right-0 top-0 flex min-h-screen min-w-[250px] flex-col gap-6 border-l border-l-slate-100 px-6 py-10 dark:border-l-zinc-900 max-xl:hidden">
      <h1 className="h3-bold">Top Users</h1>
      <div className="flex flex-col gap-5">
        {topUsers.map((user) => (
          <Link
            className="flex items-center gap-4"
            key={user.id}
            href={`/profile/${user.id}`}
          >
            <Avatar className="size-8">
              <AvatarImage src={user.picture} />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <p className="body-semibold">{user.name}</p>
          </Link>
        ))}
      </div>
      <h1 className="h3-bold">Top Tags</h1>
      <div className="flex flex-col gap-5">
        {topTags.map((tag) => (
          <Link
            className="flex w-fit items-center rounded bg-secondary px-3 py-2.5 capitalize text-blue-500"
            key={tag.id}
            href={`/tags/${tag.id}`}
          >
            <p className="subtle-medium">{tag.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RightSideBar;
