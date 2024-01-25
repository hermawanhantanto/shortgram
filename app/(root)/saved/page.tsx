import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import ContentCard from "@/components/shared/cards/ContentCard";
import SearchBar from "@/components/shared/search/SearchBar";
import { savedFilter } from "@/constant";
import { getContentSaved } from "@/lib/action/user.action";
import { timeAgo } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async () => {
  const { userId } = auth();

  const contents = await getContentSaved({
    userId: userId!,
  });

  return (
    <section className="flex w-full flex-col">
      <div className="flex justify-between max-sm:flex-col-reverse sm:items-center">
        <h1 className="h1-bold text-primary max-sm:mt-8">All Contents Saved</h1>
      </div>
      <div className="mt-10 flex w-full gap-6 max-sm:flex-col sm:items-center sm:justify-between">
        <div className="max-w-[600px] flex-1">
          <SearchBar placeholder="Search for spesific contents" />
        </div>

        <Filter filter={savedFilter} />
      </div>
      {contents?.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-6 max-sm:grid-cols-1">
          {contents?.map((content: any, index:number) => (
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
    </section>
  );
};

export default Page;