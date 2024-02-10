"use client";

import { useTheme } from "next-themes";
import { useToast } from "../ui/use-toast";
import { cn } from "@/lib/utils";
import { BeatLoader } from "react-spinners";
import BotAvatar from "./BotAvatar";
import UserAvatar from "./UserAvatar";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";

export interface ChatMessageProps {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
}

export default function ChatMessage({
  role,
  content,
  isLoading,
  src,
}: ChatMessageProps) {
  const { toast } = useToast();
  const { theme } = useTheme();
  const { user } = useUser();

  const onCopy = () => {
    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content);
    toast({
      description: "Pesan sukses disalin",
    });
  };

  return (
    <div
      className={cn("group flex items-start gap-x-3 py-4 w-full", {
        "justify-end": role === "user",
      })}
    >
      {role === "system" && src && <BotAvatar src={src} />}
      <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
        {isLoading ? (
          <BeatLoader size={5} color={theme === "light" ? "black" : "white"} />
        ) : (
          content
        )}
      </div>
      {role === "user" && src && (
        <UserAvatar src={user?.imageUrl || "/placeholder.png"} />
      )}
      {role === "system" && !isLoading && (
        <Button
          onClick={onCopy}
          className="opacity-0 group-hover:opacity-100 transition"
          size={"icon"}
          variant={"ghost"}
        >
          <Copy />
        </Button>
      )}
    </div>
  );
}
