"use client";
import Image from "next/image";
import React from "react";

interface Props {
  hasLike: boolean;
  like: number;
  hasSaved?: boolean;
  type: string;
}

const Votes = ({ hasLike, like, hasSaved, type }: Props) => {
  const handleLike = async () => {};
  const handleSave = async () => {};
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <button onClick={handleLike} className="flex items-center gap-2">
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
          <button onClick={handleSave} className="flex items-center gap-2">
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
