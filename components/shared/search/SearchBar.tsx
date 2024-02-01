"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQueryParams, removeUrlQueryParams } from "@/lib/utils";

interface Props {
  placeholder: string;
}

const SearchBar = ({ placeholder }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    if (search) {
      const debounce = setTimeout(() => {
        const newUrl = formUrlQueryParams({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      }, 300);
      return () => clearTimeout(debounce);
    } else {
      const newUrl = removeUrlQueryParams({
        params: searchParams.toString(),
        keys: ["q"],
      });
      router.push(newUrl, { scroll: false });
    }
  }, [router, searchParams, search, query]);

  return (
    <div className="flex gap-2 rounded-xl bg-secondary px-5 py-1.5 shadow">
      <Input
        onChange={(e) => setSearch(e.target.value)}
        type="search"
        className="min-h-[46px] border-none bg-transparent "
        placeholder={placeholder}
        defaultValue={search}
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
