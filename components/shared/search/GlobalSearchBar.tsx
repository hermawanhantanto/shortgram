"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import GlobalResult from "./GlobalResult";
import { formUrlQueryParams, removeUrlQueryParams } from "@/lib/utils";

const GlobalSearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");
  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    if (search) {
      const debounce = setTimeout(() => {
        const newUrl = formUrlQueryParams({
          params: searchParams.toString(),
          key: "globalSearch",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      }, 300);

      return () => clearTimeout(debounce);
    } else {
      const newUrl = removeUrlQueryParams({
        params: searchParams.toString(),
        keys: ["globalSearch"],
      });
      router.push(newUrl, { scroll: false });
    }
  }, [search, router, searchParams, query]);

  return (
    <div className="relative flex flex-col">
      <div className="flex gap-2 rounded-xl bg-secondary px-5 py-1.5 shadow max-sm:hidden">
        <Input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
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
      {search && <GlobalResult />}
    </div>
  );
};

export default GlobalSearchBar;
