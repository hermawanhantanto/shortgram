"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import Metric from "../Metric";

interface Props {
  content: string;
  timeago: string;
}

const ContentCard = ({ content, timeago }: Props) => {
  const { author, caption, image, tags, like, _id, comment, views } =
    JSON.parse(content);

  return (
    <Link href={`/content-detail/${_id}`}>
      <Card className="cursor-pointer rounded-xl shadow transition ease-in-out hover:translate-y-4 dark:border-none ">
        <CardHeader className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="size-8 max-sm:size-6">
                <AvatarImage src={author.picture} />
                <AvatarFallback>?</AvatarFallback>
              </Avatar>
              <CardTitle className="paragraph-semibold max-sm:small-semibold">
                {author.name}
              </CardTitle>
            </div>
            <p className="small-medium max-sm:hidden">{timeago}</p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <CldImage
            src={image}
            width={450}
            height={450}
            alt="content-image"
            crop="fill"
            sizes="100vw"
          />

          <p className="sm:paragraph-regular body-regular truncate">
            {caption}
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag: any, index: number) => (
                <Badge
                  className="flex-center subtle-regular gap-2 rounded py-2 capitalize text-blue-400"
                  key={index}
                  variant="secondary"
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Metric
              image="/assets/icons/heart.svg"
              label={like.length || 0}
              alt="heart-icon"
            />
            <Metric
              image="/assets/icons/comment.svg"
              label={comment.length || 0}
              alt="comment-icon"
            />
          </div>

          <Metric image="/assets/icons/eye.svg" label={views} alt="eye-icon" />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ContentCard;
