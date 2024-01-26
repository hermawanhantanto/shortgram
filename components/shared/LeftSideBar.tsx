"use client";
import { leftSideBar } from "@/constant";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSideBar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <div className="sticky left-0 top-0 flex min-h-screen w-[200px] flex-col gap-6 border-r border-r-slate-100 py-10 dark:border-r-zinc-900">
      {leftSideBar.map((item) => {
        const isProfile = item.label === "Profile";
        item.href = isProfile ? `/profile/${userId}` : item.href;
        return (
          <Link
            key={item.href}
            className={`flex items-center gap-4 px-6 py-4 ${pathname === item.href && "bg-primary text-white"} ${isProfile && !userId && "hidden"}`}
            href={item.href}
          >
            <Image
              width={18}
              height={18}
              src={item.icon}
              alt={item.label}
              className={`${pathname === item.href ? "invert" : "invert-colors"} `}
            />
            <p className="body-semibold">{item.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default LeftSideBar;
