import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Paginate from "@/components/shared/Paginate";
import TagCard from "@/components/shared/cards/TagCard";
import SearchBar from "@/components/shared/search/SearchBar";
import { tagsFilter } from "@/constant";
import { getAllTags } from "@/lib/action/tags.action";
import { URLProps } from "@/types";
import React from "react";

const Page = async ({ searchParams }: URLProps) => {
  const {tags, sumTags} = await getAllTags({
    orderBy: searchParams.orderBy,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    pageSize: 10,
    q: searchParams.q,
  });

  return (
    <section className="flex w-full flex-col">
      <h1 className="h1-bold text-primary max-sm:mt-8">All Tags</h1>
      <div className="mt-10 flex w-full gap-6 max-sm:flex-col sm:items-center sm:justify-between">
        <div className="max-w-[600px] flex-1">
          <SearchBar placeholder="Search for spesific contents" />
        </div>
        <Filter filter={tagsFilter} />
      </div>
      {tags.length > 0 ? (
        <div className="mt-10 flex flex-wrap gap-6">
          {tags.map((tag: any) => (
            <TagCard
              key={tag._id}
              name={tag.name}
              _id={tag._id}
              contents={tag.contents.length || 0}
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
          total={sumTags}
        />
      </div>
    </section>
  );
};

export default Page;
