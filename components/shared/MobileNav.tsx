"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { leftSideBar } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          width={18}
          height={18}
          alt="Hamburger-menu"
          src="/assets/icons/hamburger.svg"
          className="invert-colors hidden object-contain max-lg:block"
        />
      </SheetTrigger>
      <SheetContent side="left">
        <div className="mt-12 flex min-h-screen flex-col gap-6">
          {leftSideBar.map((item) => (
            <Link
              key={item.href}
              className={`flex min-w-[200px] items-center gap-4 rounded px-6 py-4 ${pathname === item.href && "bg-primary text-white"}`}
              href={item.href}
            >
              <Image
                width={18}
                height={18}
                src={item.icon}
                alt={item.label}
                className={`${pathname === item.href ? "invert" : "invert-colors"} `}
              />
              <p className="body-semibold">{item.label}</p>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
