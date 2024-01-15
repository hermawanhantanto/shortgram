import React from "react";
import GlobalSearchBar from "./search/GlobalSearchBar";
import { ModeToggle } from "../theme/ThemeToogle";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="relative top-0 flex items-center justify-between">
      <h1 className="h1-bold max-md:h3-bold">
        Short<span className="text-primary">gram</span>
      </h1>
      <GlobalSearchBar />
      <div className="flex items-center gap-4">
        <ModeToggle />
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </nav>
  );
};

export default Navbar;
