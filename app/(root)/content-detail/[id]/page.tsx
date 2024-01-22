import CommentForm from "@/components/forms/CommentForm";
import AllComments from "@/components/shared/AllComments";
import Filter from "@/components/shared/Filter";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderImage from "@/components/shared/RenderImage";
import Votes from "@/components/shared/Votes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { commentsFilter } from "@/constant";
import { getAllCommentsContent } from "@/lib/action/comment.action";
import { getContentById } from "@/lib/action/content.action";
import { getUserByClerkId } from "@/lib/action/user.action";
import { timeAgo } from "@/lib/utils";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs";

const Page = async ({ params }: URLProps) => {
  const { userId } = auth();
  let user;
  if (userId) {
    user = await getUserByClerkId(userId);
  }
  const content = await getContentById({ id: params.id });
  const comments = await getAllCommentsContent({
    contentId: params.id,
  });

  return (
    <section className="flex w-full flex-col sm:mx-auto sm:max-w-[700px]">
      <div className="flex justify-between max-sm:flex-col-reverse max-sm:gap-4 sm:items-center">
        <div className="flex items-center gap-2">
          <Avatar className="size-8 max-sm:size-6">
            <AvatarImage src={content.author.picture} />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <p className="paragraph-semibold">{content.author.name}</p>
        </div>
        <div className="max-sm:self-end">
          <Votes
            hasLike={content.like.includes(user._id)}
            like={content.like.length}
            hasSaved={user.saved.includes(content._id)}
            type="content"
          />
        </div>
      </div>
      <div className="mb-5 mt-10">
        <ParseHTML data={content.caption} />
        {content.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {content.tags.map((tag: any, index: number) => (
              <Badge
                className="flex-center subtle-regular gap-2 rounded py-2 capitalize text-blue-400 "
                key={index}
                variant="secondary"
              >
                #{tag.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <RenderImage
        src={content.image}
        alt="Content"
        width={700}
        height={700}
        className="grid grid-cols-1"
        crop="fill"
      />
      <div className="mt-4 flex items-center justify-between">
        <Metric
          image="/assets/icons/comment.svg"
          label={content.comment.length || 0}
          alt="comment-icon"
        />
        <p className="body-medium text-slate-500">
          Created at {timeAgo(content.createdAt)}
        </p>
      </div>
      <div className="mt-20 flex items-center justify-between">
        <h1 className="h2-bold text-primary">All Comments</h1>
        <Filter filter={commentsFilter} />
      </div>
      <div className="my-10">
        <AllComments comments={comments} />
      </div>
      <CommentForm
        userId={JSON.stringify(user._id)}
        contentId={JSON.stringify(content._id)}
      />
    </section>
  );
};

export default Page;
