"use client";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import MobileSidebar from "./MobileSidebar";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className="w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16 fixed">
      <div className="flex items-center">
        <MobileSidebar />
        <Link href={"/"}>
          <h1
            className={cn(
              "hidden md:block text-xl md:text-3xl font-bold text-primary"
            )}
          >
            StarTalk Simulator
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        {/* <Button></Button> */}
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
