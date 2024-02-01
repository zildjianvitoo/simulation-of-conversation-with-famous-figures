"use client";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className="w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary ">
      <div className="flex items-center">
        <Menu className="block md:hidden" />
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
        <UserButton />
      </div>
    </div>
  );
}
