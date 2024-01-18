import React from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const GlobalSearchBar = () => {
  return (
    <div className="hidden gap-2 rounded-xl bg-transparent px-5 py-2.5 sm:flex">
      <Input
        type="search"
        className="min-h-[46px] shadow-sm"
        placeholder="Search"
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
