import React from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const GlobalSearchBar = () => {
  return (
    <div className="flex gap-2 rounded-xl bg-secondary px-5 py-1.5 shadow max-sm:hidden">
      <Input
        type="search"
        className="min-h-[46px] border-none bg-transparent "
        placeholder="Search for globally"
      />
      <Image
        src="/assets/icons/search.svg"
        width={28}
        height={28}
        alt="Search bar"
        className="invert-colors object-contain"
      />
    </div>
  );
};

export default GlobalSearchBar;
