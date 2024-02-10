"use client";
import { FamousFigure, Message } from "@prisma/client";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import { ElementRef, useEffect, useRef, useState } from "react";

type Props = {
  famousFigure: FamousFigure & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
  isLoading: boolean;
  messages: ChatMessageProps[];
};

export default function ChatMessages({
  famousFigure,
  isLoading,
  messages = [],
}: Props) {
  const scrollRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        src={famousFigure.src}
        role={"system"}
        content={`Halo, Saya ${famousFigure.name}, ${famousFigure.description}`}
        isLoading={fakeLoading}
      />
      {messages.map((message, index) => (
        <ChatMessage
          role={message.role}
          content={message.content}
          isLoading={isLoading}
          key={index}
          src={message.src}
        />
      ))}
      {isLoading && (
        <ChatMessage role="system" src={famousFigure.src} isLoading />
      )}

      <div ref={scrollRef} />
    </div>
  );
}
