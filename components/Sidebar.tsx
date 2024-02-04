"use client";

import { cn } from "@/lib/utils";
import { Home, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type Props = {};

export default function Sidebar({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    {
      icon: Home,
      href: "/",
      label: "Home",
    },
    {
      icon: Plus,
      href: "/tokoh-terkenal/buat",
      label: "Buat",
    },
  ];

  const onNavigate = (url: string) => {
    router.push(url);
  };

  return (
    <div className="flex space-x-4 h-full flex-col text-primary bg-secondary">
      <div className="p-3 flex-1 flex justify-center">
        <div className="space-y-2">
          {routes.map((route) => (
            <div
              key={route.href}
              onClick={() => onNavigate(route.href)}
              className={cn(
                "text-muted-foreground text-xs group flex p-3 px-4 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                {
                  "bg-primary/10 text-primary": pathname === route.href,
                }
              )}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1">
                <route.icon className="h-5 w-5" />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
