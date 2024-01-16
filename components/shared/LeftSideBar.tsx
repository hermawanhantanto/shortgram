"use client";
import { leftSideBar } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6 border-r border-r-slate-100 py-10 dark:border-r-zinc-900">
      {leftSideBar.map((item) => (
        <Link
          key={item.href}
          className={`flex min-w-[200px] items-center gap-4 px-6 py-4 ${pathname === item.href && "bg-primary text-white"}`}
          href={item.href}
        >
          <Image
            width={18}
            height={18}
            src={item.icon}
            alt={item.label}
            className={`${pathname === item.href ? "invert" : "invert-colors"} `}
          />
          <p>{item.label}</p>
        </Link>
      ))}
    </div>
  );
};

export default LeftSideBar;
