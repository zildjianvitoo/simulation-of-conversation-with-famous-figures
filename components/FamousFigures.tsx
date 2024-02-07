("");

import { FamousFigure } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Card, CardFooter, CardHeader } from "./ui/card";
import Link from "next/link";
import { MessagesSquare } from "lucide-react";

type Props = {
  data: (FamousFigure & {
    _count: {
      messages: number;
    };
  })[];
};

export default function FamousFigures({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <div className="relative w-60 h-60">
          <Image fill src={"/empty.png"} className="grayscale" alt="kosong" />
        </div>
        <p className="text-sm text-muted-foreground">
          Tokoh Terkenal tidak ditemukan.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-6">
      {data.map((item) => (
        <Card
          key={item.id}
          className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0"
        >
          <Link href={`/chat/${item.id}`}>
            <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
              <div className="relative w-32 h-32">
                <Image
                  src={item.src}
                  fill
                  className="rounded-xl object-cover"
                  alt={item.name}
                />
              </div>
              <p className="font-bold">{item.name}</p>
              <p className="text-xs">{item.description}</p>
            </CardHeader>
            <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
              <p>@{item.userName}</p>
              <div className="flex items-center">
                <MessagesSquare className="w-3 h-3 mr-1" />
                {item._count.messages}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
}
