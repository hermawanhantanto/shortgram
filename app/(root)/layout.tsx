import LeftSideBar from "@/components/shared/LeftSideBar";
import Navbar from "@/components/shared/Navbar";
import RightSideBar from "@/components/shared/RightSideBar";
import React, { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <Navbar />
      <section className="flex justify-between">
        <div className="max-lg:hidden">
          <LeftSideBar />
        </div>

        <div className="flex w-full flex-1">{children}</div>
        <div className="max-lg:hidden">
          <RightSideBar />
        </div>
      </section>
    </main>
  );
};

export default Layout;
