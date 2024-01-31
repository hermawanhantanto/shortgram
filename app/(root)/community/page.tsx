import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Paginate from "@/components/shared/Paginate";
import UserCard from "@/components/shared/cards/UserCard";
import SearchBar from "@/components/shared/search/SearchBar";
import { usersFilter } from "@/constant";
import { getAllUsers, getUserByClerkId } from "@/lib/action/user.action";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async ({ searchParams }: URLProps) => {
  const { users, sumUsers } = await getAllUsers({
    orderBy: searchParams.orderBy,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    pageSize: 10,
  });
  const { userId } = auth();
  const currentUser = await getUserByClerkId(userId!);

  return (
    <section>
      <h1 className="h1-bold text-primary max-sm:mt-8">All Users</h1>
      <div className="mt-10 flex w-full gap-6 max-sm:flex-col sm:items-center sm:justify-between">
        <div className="max-w-[600px] flex-1">
          <SearchBar placeholder="Search for spesific users" />
        </div>

        <Filter filter={usersFilter} />
      </div>
      {users?.length > 0 ? (
        <div className="mt-10 flex flex-wrap gap-6">
          {users?.map((user: any) => (
            <UserCard
              key={user._id}
              user={JSON.stringify(user)}
              currentUser={userId!}
              isFollowing={user.follower.includes(currentUser._id)}
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
          total={sumUsers}
        />
      </div>
    </section>
  );
};

export default Page;
