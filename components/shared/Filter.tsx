import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterType } from "@/types";

interface Props {
  filter: FilterType[];
}

const Filter = ({ filter }: Props) => {
  return (
    <Select>
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
