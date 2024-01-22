import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Votes from "./Votes";
import ParseHTML from "./ParseHTML";
import { timeAgo } from "@/lib/utils";

interface Props {
  comments: [];
  userId: string;
}

const AllComments = async ({ comments, userId }: Props) => {
  return (
    <div className="flex flex-col gap-10">
      {comments?.map((comment: any) => (
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
            />
          </div>
          <div className="body-regular ml-12 flex flex-col gap-4">
            <ParseHTML data={comment.description} />
            <p className="small-medium text-slate-500">
              {timeAgo(comment.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllComments;
