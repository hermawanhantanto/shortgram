"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterType } from "@/types";
import { useSearchParams, useRouter } from "next/navigation";
import { formUrlQueryParams, removeUrlQueryParams } from "@/lib/utils";

interface Props {
  filter: FilterType[];
}

const Filter = ({ filter }: Props) => {
  const searchParams = useSearchParams();

  const query = searchParams.get("filter") || "";
  const router = useRouter();
  const [orderBy, setOrderBy] = useState(query);

  useEffect(() => {
    if (orderBy) {
      const newUrl = formUrlQueryParams({
        params: searchParams.toString(),
        key: "filter",
        value: orderBy,
      });
      router.push(newUrl, { scroll: false });
    } else {
      const newUrl = removeUrlQueryParams({
        params: searchParams.toString(),
        keys: ["filter"],
      });
      router.push(newUrl, { scroll: false });
    }
  }, [query, orderBy, router, searchParams]);

  return (
    <Select onValueChange={(value) => setOrderBy(value)} defaultValue={orderBy}>
      <SelectTrigger className="min-h-[46px] w-[200px] rounded border-secondary bg-secondary shadow max-sm:w-full">
        <SelectValue placeholder="Select a filter" />
      </SelectTrigger>
      <SelectContent className="border-none bg-secondary">
        {filter.map((item: FilterType) => (
          <SelectItem
            key={item.id}
            value={item.value}
            className="cursor-pointer"
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Filter;
