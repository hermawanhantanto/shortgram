import Navbar from "@/components/shared/Navbar";
import React, { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="p-4">
      <Navbar />
      <section className="flex flex-1">{children}</section>
    </main>
  );
};

export default Layout;
