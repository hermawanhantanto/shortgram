"use client";
import { likeComment } from "@/lib/action/comment.action";
import { likeContent, saveContent } from "@/lib/action/content.action";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
}

const Votes = ({
  hasLike,
  like,
  hasSaved,
  type,
  userId,
  contentId,
  commentId,
}: Props) => {
  const pathname = usePathname();
  const [isLike, setIsLike] = useState(false);
  const [isSaved, setIsSaved] = useState(false);


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
    </div>
  );
};

export default Votes;
