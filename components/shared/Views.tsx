"use client";
import { countViews } from "@/lib/action/interaction.action";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Metric from "./Metric";

interface Props {
  contentId: string;
  userId: string;
  views: number;
}
const Views = ({ contentId, userId, views }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const count = () => {
      try {
        countViews({
          contentId: JSON.parse(contentId!),
          userId: JSON.parse(userId),
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    return () => count();
  }, [pathname, userId, contentId, router]);

  return (
    <Metric label={String(views)} image="/assets/icons/eye.svg" alt="eye" />
  );
};

export default Views;
