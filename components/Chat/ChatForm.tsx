"use client";

import { ChangeEvent, FormEvent } from "react";
import { ChatRequestOptions } from "ai";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SendHorizonal } from "lucide-react";

type Props = {
  isLoading: boolean;
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
};

export default function ChatForm({
  handleInputChange,
  input,
  isLoading,
  onSubmit,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="border-t border-primary/10 py-4 flex items-center gap-x-2"
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder="Ketik pesan"
        className="rounded-lg bg-primary/10"
      />
      <Button disabled={isLoading} variant={"ghost"}>
        <SendHorizonal className="w-6 h-6" />
      </Button>
    </form>
  );
}
