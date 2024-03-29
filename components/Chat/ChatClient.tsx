"use client";

import { FamousFigure, Message } from "@prisma/client";
import ChatHeader from "./ChatHeader";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCompletion } from "ai/react";
import ChatForm from "./ChatForm";
import ChatMessages from "./ChatMessages";
import { ChatMessageProps } from "./ChatMessage";

type Props = {
  famousFigure: FamousFigure & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
};

export default function ChatClient({ famousFigure }: Props) {
  const [messages, setMessages] = useState<ChatMessageProps[]>(
    famousFigure.messages
  );

  const router = useRouter();

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${famousFigure.id}`,
      onFinish(prompt, completion) {
        console.log(completion);
        const systemMessage: ChatMessageProps = {
          role: "system",
          content: completion,
        };

        setMessages((prev) => [...prev, systemMessage]);

        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input,
    };
    setInput("");
    setMessages((prev) => [...prev, userMessage]);
    handleSubmit(e);
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader famousFigure={famousFigure} />
      <ChatMessages
        famousFigure={famousFigure}
        isLoading={isLoading}
        messages={messages}
      />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
