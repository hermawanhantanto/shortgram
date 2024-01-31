"use client";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";
import { formUrlQueryParams } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";

interface Props {
  currentPage: number;
  pageSize: number;
  total: number;
}

const Paginate = ({ currentPage, pageSize, total }: Props) => {
  const router = useRouter();
  const totalPage = Math.ceil(total / pageSize);
  const searchParams = useSearchParams();

  const handlePage = (page: number) => {
    const newUrl = formUrlQueryParams({
      params: searchParams.toString(),
      key: "page",
      value: String(page),
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        className="cursor-pointer rounded bg-primary px-3 py-1"
        onClick={() => handlePage(1)}
        disabled={currentPage === 1}
      >
        <ChevronsLeft className="size-4 text-white" />
      </Button>
      <Button
        className="cursor-pointer rounded bg-primary px-3 py-1"
        onClick={() => handlePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="size-4 text-white" />
      </Button>
      <p className="body-semibold px-2">{currentPage}</p>
      <Button
        className="cursor-pointer rounded bg-primary px-3 py-1"
        onClick={() => handlePage(currentPage + 1)}
        disabled={currentPage === totalPage}
      >
        <ChevronRight className="size-4 text-white" />
      </Button>
      <Button
        className="cursor-pointer rounded bg-primary px-3 py-1"
        onClick={() => handlePage(totalPage)}
        disabled={currentPage === totalPage}
      >
        <ChevronsRight className="size-4 text-white" />
      </Button>
    </div>
  );
};

export default Paginate;
