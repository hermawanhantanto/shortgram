import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section className="flex w-full flex-col">
      <div className="flex justify-between max-sm:flex-col-reverse sm:items-center">
        <h1 className="h1-bold text-primary max-sm:mt-8">All Contents Saved</h1>

        <Skeleton className="h-[46px] w-[100px] rounded-full" />
      </div>
      <div className="mt-10 flex w-full gap-6 max-sm:flex-col sm:items-center sm:justify-between">
        <div className="max-w-[600px] flex-1">
          <Skeleton className="h-[46px] min-w-full rounded-full" />
        </div>

        <Skeleton className="h-[46px]  w-[200px] rounded-full" />
      </div>

      <div className="mt-10 grid grid-cols-2 gap-6 max-sm:grid-cols-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
          <Skeleton key={index} className="h-[200px] w-full rounded-xl" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
