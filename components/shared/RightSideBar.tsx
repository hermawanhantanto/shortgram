import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const topUsers = [
  {
    id: "1",
    name: "Render Network",
    image: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    name: "Celestia",
    image: "https://github.com/shadcn.png",
  },
  {
    id: "3",
    name: "Solana",
    image: "https://github.com/shadcn.png",
  },
  {
    id: "4",
    name: "Polygon",
    image: "https://github.com/shadcn.png",
  },
  {
    id: "5",
    name: "Cardano",
    image: "https://github.com/shadcn.png",
  },
];

const topTags = [
  {
    id: "1",
    name: "Cryptocurrency",
  },
  {
    id: "2",
    name: "Blockchain",
  },
  {
    id: "3",
    name: "Artificial",
  },
  {
    id: "4",
    name: "Sofware",
  },
  {
    id: "5",
    name: "Social",
  },
];

const RightSideBar = () => {
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
              <AvatarImage src={user.image} />
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
            className="flex w-fit items-center rounded bg-secondary px-3 py-2.5 capitalize text-slate-500"
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
