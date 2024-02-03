"use client";
import { getGlobalSearch } from "@/lib/action/general.action";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";
import Link from "next/link";
import Image from "next/image";

const GlobalResult = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("globalSearch");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query) {
      const fetchResult = async () => {
        setData([]);
        setIsLoading(true);
        try {
          const res = await getGlobalSearch({ globalSearch: query });
          setData(JSON.parse(res));
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          setIsLoading(false);
        }
      };
      fetchResult();
    }
  }, [query]);

  const handleLink = ({ type, id }: { type: string; id: string }) => {
    switch (type) {
      case "user": {
        return `/profile/${id}`;
      }
      case "content": {
        return `/content-detail/${id}`;
      }
      case "tag": {
        return `/tags/${id}`;
      }
      default: {
        return "/";
      }
    }
  };

  return (
    <div className="absolute top-[4.5rem] z-10 min-w-full max-w-full rounded bg-secondary py-4 shadow">
      {isLoading ? (
        <div className="flex-center">
          <Spinner />
        </div>
      ) : data.length === 0 ? (
        <p className="body-semibold text-center">No result found</p>
      ) : (
        <div className="flex flex-col gap-2">
          {data.map((item: any, index) => (
            <Link
              key={index}
              className="flex items-center gap-2 px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-950"
              href={handleLink({ type: item.type, id: item.id })}
            >
              <Image
                src="/assets/icons/pin.svg"
                width={20}
                height={20}
                className="invert-colors -rotate-90 object-contain hover:invert-0"
                alt="pin icon"
              />
              <div className="flex flex-col gap-2">
                <p className="small-semibold line-clamp-1">{item.title}</p>
                <p className="small-regular">{item.type}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalResult;
