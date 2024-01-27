import EditProfileForm from "@/components/forms/EditProfileForm";
import NoResult from "@/components/shared/NoResult";
import { getUserByClerkId } from "@/lib/action/user.action";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async ({params}: URLProps) => {
  
  const { userId } = auth();

  const mongoUser = await getUserByClerkId(userId!);

  if (!mongoUser || userId !== params.id) {
    return <NoResult />;
  }

  return (
    <div className="flex w-full flex-col">
      <h1 className="h1-bold text-primary max-sm:mt-8">Edit Profile</h1>

      <div className="mt-10">
        <EditProfileForm
          bio={mongoUser.bio}
          location={mongoUser.location}
          clerkId={userId!}
        />
      </div>
    </div>
  );
};

export default Page;
