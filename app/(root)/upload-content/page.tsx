import ContentForm from "@/components/forms/ContentForm";
import { getUserByClerkId } from "@/lib/action/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async () => {
  const { userId } = auth();

  let mongoUser;

  if (userId) {
    mongoUser = await getUserByClerkId(userId);
  }

  return (
    <div className="flex w-full flex-col">
      <h1 className="h1-bold text-primary max-sm:mt-8">Upload</h1>

      <div className="mt-10">
        <ContentForm mongoUser={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default Page;
