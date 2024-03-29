import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "../theme/ThemeToogle";
import MobileNav from "./MobileNav";
import GlobalSearchBar from "./search/GlobalSearchBar";

const Navbar = () => {
  const { userId } = auth();

  return (
    <nav className="relative top-0 flex items-center justify-between border-b border-b-slate-100 p-5 dark:border-b-zinc-900">
      <div className="flex items-center gap-4">
        <MobileNav />
        <Link href="/">
          <h1 className="h1-bold max-md:h3-bold">
            Short<span className="text-primary">gram</span>
          </h1>
        </Link>
      </div>

      <GlobalSearchBar />
      <div className="flex items-center gap-4">
        <ModeToggle />
        <UserButton afterSignOutUrl="/sign-in" />
        {!userId && (
          <Link
            href="/sign-in"
            className="flex-center body-semibold rounded-xl bg-primary px-5 py-2.5 text-white"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
