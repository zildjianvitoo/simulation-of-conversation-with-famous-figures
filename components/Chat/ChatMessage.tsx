"use client";

import { useTheme } from "next-themes";
import { useToast } from "../ui/use-toast";

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

  return <div>ChatMessage</div>;
}
