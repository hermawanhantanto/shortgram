"use client";
import { likeComment } from "@/lib/action/comment.action";
import {
  deleteComment,
  deleteContent,
  likeContent,
  saveContent,
} from "@/lib/action/content.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  hasLike: boolean;
  like: number;
  hasSaved?: boolean;
  type: string;
  userId: string;
  contentId?: string;
  commentId?: string;
  isAuthor: boolean;
}

const Votes = ({
  hasLike,
  like,
  hasSaved,
  type,
  userId,
  contentId,
  commentId,
  isAuthor,
}: Props) => {
  const pathname = usePathname();
  const [isLike, setIsLike] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  const handleLike = async () => {
    try {
      setIsLike(true);
      if (type === "content") {
        await likeContent({
          contentId: JSON.parse(contentId!),
          userId: JSON.parse(userId),
          path: pathname,
          hasLiked: hasLike,
        });
      } else {
        await likeComment({
          commentId: JSON.parse(commentId!),
          userId: JSON.parse(userId),
          path: pathname,
          hasLiked: hasLike,
        });
      }

      if (hasLike) {
        return toast("Successfully unliked");
      }

      return toast("Successfully liked");
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsLike(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaved(true);
      await saveContent({
        contentId: JSON.parse(contentId!),
        userId: JSON.parse(userId),
        path: pathname,
        hasSaved: hasSaved!,
      });

      if (hasSaved) {
        return toast("Successfully unsaved");
      }

      return toast("Successfully saved");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleDelete = async () => {
    try {
      if (type === "content") {
        await deleteContent({
          contentId: JSON.parse(contentId!),
        });
        toast("Success delete a content");
        router.push("/");
      } else {
        await deleteComment({
          commentId: JSON.parse(commentId!),
        });
        toast("Success delete a comment");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const handleEdit = async () => {};

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={handleLike}
          className="flex items-center gap-2"
          disabled={isLike}
        >
          {hasLike ? (
            <Image
              src="/assets/icons/heart-filled.svg"
              width={20}
              height={20}
              alt="like"
              className="cursor-pointer object-contain"
            />
          ) : (
            <Image
              src="/assets/icons/heart.svg"
              width={20}
              height={20}
              alt="like"
              className="invert-colors cursor-pointer object-contain"
            />
          )}
          <p className="body-semibold">{like}</p>
        </button>
      </div>
      {type === "content" && (
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-2"
            disabled={isSaved}
          >
            {hasSaved ? (
              <Image
                src="/assets/icons/star-filled.svg"
                width={20}
                height={20}
                alt="saved"
                className="cursor-pointer object-contain"
              />
            ) : (
              <Image
                src="/assets/icons/star.svg"
                width={20}
                height={20}
                alt="saved"
                className="invert-colors cursor-pointer object-contain"
              />
            )}
          </button>
        </div>
      )}

      <div className={`items-center gap-2 ${isAuthor ? "flex" : "hidden"}`}>
        <Image
          src="/assets/icons/trash.svg"
          alt="delete"
          onClick={handleDelete}
          width={20}
          height={20}
          className="cursor-pointer object-contain"
        />
        <Image
          src="/assets/icons/pencil-2.svg"
          alt="delete"
          onClick={handleEdit}
          width={20}
          height={20}
          className="cursor-pointer object-contain"
        />
      </div>
    </div>
  );
};

export default Votes;
