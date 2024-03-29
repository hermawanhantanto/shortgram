import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Paginate from "@/components/shared/Paginate";
import ContentCard from "@/components/shared/cards/ContentCard";
import SearchBar from "@/components/shared/search/SearchBar";
import { homeFilter } from "@/constant";
import { getAllContents } from "@/lib/action/content.action";
import { getRecommendation } from "@/lib/action/general.action";
import { timeAgo } from "@/lib/utils";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home({ searchParams }: URLProps) {
  const { userId } = auth();

  let contents = [];
  let sumContents = 0;

  if (userId && searchParams.orderBy === "recommended") {
    const result = await getRecommendation({
      userId,
      page: searchParams.page ? parseInt(searchParams.page) : 1,
      pageSize: 10,
      q: searchParams.q,
    });
    contents = result.contents;
    sumContents = result.sumContents;
  } else {
    const result = await getAllContents({
      orderBy: searchParams.orderBy,
      page: searchParams.page ? parseInt(searchParams.page) : 1,
      pageSize: 10,
      q: searchParams.q,
    });
    contents = result.contents;
    sumContents = result.sumContents;
  }

  return (
    <section className="flex w-full flex-col">
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
          <SearchBar placeholder="Search for spesific contents" />
        </div>

        <Filter filter={homeFilter} />
      </div>
      {contents?.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-6 max-sm:grid-cols-1">
          {contents?.map((content: any, index) => (
            <ContentCard
              key={index}
              content={JSON.stringify(content)}
              timeago={timeAgo(content.createdAt)}
            />
          ))}
        </div>
      ) : (
        <NoResult />
      )}
      <div className="flex-center mt-20">
        <Paginate
          currentPage={searchParams.page ? parseInt(searchParams.page) : 1}
          pageSize={10}
          total={sumContents}
        />
      </div>
    </section>
  );
}
