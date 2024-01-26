import Image from "next/image";
import { Card, CardDescription, CardHeader } from "../ui/card";

interface Props {
  gold: number;
  silver: number;
  bronze: number;
  comments: number;
  contents: number;
}

const Stats = ({ gold, silver, bronze, comments, contents }: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Card className="h-fit rounded dark:border-none dark:bg-secondary">
        <CardHeader>
          <div className="flex items-center gap-4 px-1">
            <div className="flex flex-col gap-1">
              <p className="body-semibold">{contents}</p>
              <CardDescription>Contents</CardDescription>
            </div>
            <div className="flex flex-col gap-1">
              <p className="body-semibold">{comments}</p>
              <CardDescription>Comments</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card className="h-fit rounded dark:border-none dark:bg-secondary">
        <CardHeader>
          <div className="flex items-center gap-4 px-1">
            <Image
              src="/assets/icons/gold-medal.svg"
              width={32}
              height={32}
              alt="gold"
            />
            <div className="flex flex-col gap-1 px-1">
              <p className="body-semibold">{gold}</p>
              <CardDescription>Gold badges</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card className="h-fit rounded dark:border-none dark:bg-secondary">
        <CardHeader>
          <div className="flex items-center gap-4 px-1">
            <Image
              src="/assets/icons/silver-medal.svg"
              width={32}
              height={32}
              alt="silver"
            />
            <div className="flex flex-col gap-1">
              <p className="body-semibold">{silver}</p>
              <CardDescription>Silver badges</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card className="h-fit rounded dark:border-none dark:bg-secondary">
        <CardHeader>
          <div className="flex items-center gap-4 px-1">
            <Image
              src="/assets/icons/bronze-medal.svg"
              width={32}
              height={32}
              alt="bronze"
            />
            <div className="flex flex-col gap-1">
              <p className="body-semibold">{bronze}</p>
              <CardDescription>Bronze badges</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Stats;
