import React from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface Props {
  placeholder: string;
}

const SearchBar = ({ placeholder }: Props) => {
  return (
    <div className="flex gap-2 rounded-xl bg-secondary px-5 py-1.5 shadow">
      <Input
        type="search"
        className="min-h-[46px] border-none bg-transparent "
        placeholder={placeholder}
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

export default SearchBar;
