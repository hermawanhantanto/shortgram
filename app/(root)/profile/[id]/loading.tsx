import FollowBtn from "@/components/shared/FollowBtn";
import Metric from "@/components/shared/Metric";
import { Skeleton } from "@/components/ui/skeleton";
import { currentUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { Stats } from "fs";
import { Link } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between max-sm:flex-col-reverse">
        <div className="flex gap-4 max-sm:flex-col sm:items-center">
          <Skeleton className="size-32 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-6 w-[100px]" />
            <div className="mt-2 flex items-center gap-2">
              <div className="body-regular flex items-center gap-1">
                <Skeleton className="h-6 w-[200px]" />
              </div>
              <div className="body-regular flex items-center gap-1">
                <Skeleton className="h-6 w-[200px]" />
              </div>
            </div>
            <div className="mt-2">
              <Skeleton className="h-8 w-[200px] rounded" />
            </div>
          </div>
        </div>
        <Skeleton className="h-[46px] w-[200px] rounded" />
      </div>
      <h2 className="h3-bold mt-10 text-primary">
        <Skeleton className="h-10 w-[100px] rounded" />
      </h2>
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Skeleton className="h-[100px] w-[200px] rounded" />
        <Skeleton className="h-[100px] w-[200px] rounded" />
        <Skeleton className="h-[100px] w-[200px] rounded" />
        <Skeleton className="h-[100px] w-[200px] rounded" />
      </div>
      <div className="mt-10 grid grid-cols-2 gap-6 max-sm:grid-cols-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
          <Skeleton key={index} className="h-[200px] w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
};

export default Loading;
