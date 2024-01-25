import {
    Card,
    CardDescription,
    CardHeader
} from "@/components/ui/card";
import Link from "next/link";

interface Props {
  name: string;
  contents: number;
  _id: string
}

const TagCard = ({ name, contents, _id }: Props) => {
  return (
    <Link href={`/tags/${_id}`}>
      <Card className="min-w-[200px] rounded-xl dark:border-none dark:bg-secondary">
        <CardHeader>
          <CardDescription className="body-semibold text-primary">
            #{name}
          </CardDescription>
          <CardDescription className="small-regular text-slate-500 dark:text-slate-400">
            <span className="body-semibold text-black dark:text-white">
              {contents}+{" "}
            </span>{" "}
            Contents
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default TagCard;
