import Filter from "@/components/shared/Filter";
import SearchBar from "@/components/shared/search/SearchBar";
import { homeFilter } from "@/constant";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between max-sm:flex-col-reverse sm:items-center">
        <h1 className="h1-bold text-primary max-sm:mt-8">All Contents</h1>

        <Link
          href="/upload-content"
          className="flex w-fit items-center justify-center rounded bg-primary px-5 py-2.5 text-white shadow-sm hover:bg-blue-800 max-sm:self-end"
        >
          Upload
        </Link>
      </div>
      <div className="mt-10 flex w-full gap-6 max-sm:flex-col sm:items-center sm:justify-between">
        <div className="max-w-[600px] flex-1">
          <SearchBar placeholder="Search for contents" />
        </div>

        <Filter filter={homeFilter} />
      </div>
    </div>
  );
}
