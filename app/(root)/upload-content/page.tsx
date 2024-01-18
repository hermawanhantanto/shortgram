import ContentForm from "@/components/forms/ContentForm";
import { getAllUsers } from "@/lib/action/user.action";
import React from "react";

const Page = async () => {
  const user = await getAllUsers();
  console.log(user);
  return (
    <div className="flex w-full flex-col">
      <h1 className="h1-bold text-primary max-sm:mt-8">Upload</h1>

      <div className="mt-10">
        <ContentForm />
      </div>
    </div>
  );
};

export default Page;
