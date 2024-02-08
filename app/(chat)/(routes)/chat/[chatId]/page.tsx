import ChatClient from "@/components/Chat/ChatClient";
import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

export default async function ChatIdPage({ params }: Props) {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const famousFigure = await prismadb.famousFigure.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId: userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!famousFigure) {
    return redirect("/");
  }

  return <ChatClient famousFigure={famousFigure} />;
}
