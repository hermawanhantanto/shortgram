import ContentForm from "@/components/forms/ContentForm";
import { getContentById } from "@/lib/action/content.action";
import { getUserByClerkId } from "@/lib/action/user.action";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async ({ params }: URLProps) => {
  const { userId } = auth();

  let mongoUser;

  if (userId) {
    mongoUser = await getUserByClerkId(userId);
  }

  const content = await getContentById({ id: params.id });

  const tags = content.tags.map((tag: any) => tag.name);

 
  return (
    <div className="flex w-full flex-col">
      <h1 className="h1-bold text-primary max-sm:mt-8">Edit Content</h1>

      <div className="mt-10">
        <ContentForm
          mongoUser={JSON.stringify(mongoUser._id)}
          caption={content.caption}
          image={content.image}
          tags={tags}
          contentId={JSON.stringify(content._id)}
        />
      </div>
    </div>
  );
};

export default Page;
