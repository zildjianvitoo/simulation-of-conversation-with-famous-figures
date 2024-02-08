"use client";

import { FamousFigure, Message } from "@prisma/client";
import ChatHeader from "./ChatHeader";

type Props = {
  famousFigure: FamousFigure & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
};

export default function ChatClient({ famousFigure }: Props) {
  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader famousFigure={famousFigure} />
    </div>
  );
}
