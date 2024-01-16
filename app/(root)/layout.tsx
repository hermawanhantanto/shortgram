import LeftSideBar from "@/components/shared/LeftSideBar";
import Navbar from "@/components/shared/Navbar";
import RightSideBar from "@/components/shared/RightSideBar";
import React, { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <Navbar />
      <section className="flex justify-between">
        <LeftSideBar />
        <div className="flex w-full flex-1">{children}</div>
        <RightSideBar />
      </section>
    </main>
  );
};

export default Layout;
