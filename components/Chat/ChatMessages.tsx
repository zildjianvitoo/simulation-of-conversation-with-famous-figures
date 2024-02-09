import { FamousFigure, Message } from "@prisma/client";
import ChatMessage from "./ChatMessage";

type Props = {
  famousFigure: FamousFigure & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
  isLoading: boolean;
  messages: any[];
};

export default function ChatMessages({
  famousFigure,
  isLoading,
  messages = [],
}: Props) {
  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage />
    </div>
  );
}
