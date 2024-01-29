import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Votes from "./Votes";
import ParseHTML from "./ParseHTML";
import { timeAgo } from "@/lib/utils";
import CommentForm from "../forms/CommentForm";

interface Props {
  comments: [];
  userId: string;
  contentCap: string;
  contentId: string;
}

const AllComments = ({ comments, userId, contentCap, contentId }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-10">
        {comments?.map((comment: any) => {
          const isAuthor = String(comment.author._id) === String(userId);
          return (
            <div key={comment._id} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="size-8">
                    <AvatarImage src={comment.author.picture} />
                    <AvatarFallback>?</AvatarFallback>
                  </Avatar>
                  <p className="body-semibold">{comment.author.name}</p>
                </div>
                <Votes
                  hasLike={comment.like.includes(userId)}
                  like={comment.like.length}
                  type="comment"
                  commentId={JSON.stringify(comment._id)}
                  userId={JSON.stringify(userId)}
                  isAuthor={isAuthor}
                />
              </div>
              <div className="body-regular ml-12 flex flex-col gap-4">
                <ParseHTML data={comment.description} />
                <p className="small-medium text-slate-500">
                  {timeAgo(comment.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col">
        <CommentForm
          userId={userId}
          contentId={contentId}
          caption={contentCap}
        />
      </div>
    </>
  );
};

export default AllComments;
