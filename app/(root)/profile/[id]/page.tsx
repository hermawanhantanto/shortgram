import Metric from "@/components/shared/Metric";
import NoResult from "@/components/shared/NoResult";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getContentSaved, getUserByClerkId } from "@/lib/action/user.action";
import { URLProps } from "@/types";
import React from "react";
import { format } from "date-fns";
import { auth } from "@clerk/nextjs";
import FollowBtn from "@/components/shared/FollowBtn";
import Link from "next/link";
import Stats from "@/components/shared/Stats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getContentByAuthor } from "@/lib/action/content.action";
import ContentCard from "@/components/shared/cards/ContentCard";
import { timeAgo } from "@/lib/utils";
import { countComments } from "@/lib/action/comment.action";
import Paginate from "@/components/shared/Paginate";
import { getMedals } from "@/lib/action/general.action";

const Page = async ({ params, searchParams }: URLProps) => {
  const { userId } = auth();
  const user = await getUserByClerkId(params.id);

  if (!user) return <NoResult />;

  const currentUser = await getUserByClerkId(userId!);
  const { contents, sumContents } = await getContentByAuthor({
    userId: user.clerkId,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    pageSize: 10,
  });
  const { gold, silver, bronze } = await getMedals({ userId: user.clerkId });

  const result = await getContentSaved({
    userId: params.id,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    pageSize: 10,
  });
  const sumComment = await countComments({ userId: currentUser._id });

  return (
    <section className="flex w-full flex-col">
      <div className="flex justify-between max-sm:flex-col-reverse">
        <div className="flex gap-4 max-sm:flex-col sm:items-center">
          <Avatar className="size-32">
            <AvatarImage src={user.picture} />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h3 className="h3-bold">{user.name}</h3>
            <p className="body-regular">@{user.username}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="body-regular flex items-center gap-1">
                <span>{user.follower.length}</span>
                <p className="text-slate-500 dark:text-slate-300">Followers</p>
              </div>
              <div className="body-regular flex items-center gap-1">
                <span>{user.following.length}</span>
                <p className="text-slate-500 dark:text-slate-300">Following</p>
              </div>
            </div>
            <div className="mt-2">
              <Metric
                image="/assets/icons/calendar.svg"
                alt="calendar"
                label={`Joined at ${format(user.joinedAt, "dd MMMM yyyy").toString()}`}
              />
            </div>
          </div>
        </div>
        {userId === user.clerkId ? (
          <Link
            className="body-semibold flex-center h-[46px] rounded bg-secondary px-6 py-2 text-primary dark:hover:text-white max-sm:self-end"
            href={`/profile/${userId}/edit`}
          >
            Edit Profile
          </Link>
        ) : (
          <FollowBtn
            isFollowing={user.follower.includes(currentUser._id)}
            currentUser={userId!}
            targetUser={JSON.stringify(user._id)}
            classname="max-sm:self-end"
          />
        )}
      </div>
      <h2 className="h3-bold mt-10 text-primary">
        All Stats - {user.reputation}
      </h2>
      <div className="mt-10">
        <Stats
          gold={gold}
          silver={silver}
          bronze={bronze}
          comments={sumComment}
          contents={contents.length}
        />
      </div>
      <div className="mt-10">
        <Tabs defaultValue="contents" className="max-w-full">
          <TabsList>
            <TabsTrigger value="contents">Contents</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
          <TabsContent value="contents" className="mt-8 grid grid-cols-2 gap-6">
            {contents.length > 0 ? (
              contents?.map((content: any) => (
                <ContentCard
                  content={JSON.stringify(content)}
                  timeago={timeAgo(content.createdAt)}
                  key={content._id}
                />
              ))
            ) : (
              <div className="body-semibold mt-8 size-full text-gray-500">
                You have&apos;nt post a content
              </div>
            )}
            <div className="flex-center mt-20">
              <Paginate
                pageSize={10}
                currentPage={
                  searchParams.page ? parseInt(searchParams.page) : 1
                }
                total={sumContents}
              />
            </div>
          </TabsContent>
          <TabsContent value="saved" className="mt-8 grid grid-cols-2 gap-6">
            {result.contents.length > 0 ? (
              result.contents?.map((content: any) => (
                <ContentCard
                  content={JSON.stringify(content)}
                  timeago={timeAgo(content.createdAt)}
                  key={content._id}
                />
              ))
            ) : (
              <div className="body-semibold size-full text-gray-500">
                You have&apos;nt save a content
              </div>
            )}
            <div className="flex-center mt-20">
              <Paginate
                pageSize={10}
                currentPage={
                  searchParams.page ? parseInt(searchParams.page) : 1
                }
                total={result.sumContents}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Page;
