import { FamousFigure, Message } from "@prisma/client";
import React from "react";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  Edit,
  MessageSquare,
  MoreVertical,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import BotAvatar from "./BotAvatar";
import { useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useToast } from "../ui/use-toast";
import axios from "axios";

type Props = {
  famousFigure: FamousFigure & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
};

export default function ChatHeader({ famousFigure }: Props) {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  const onDelete = async () => {
    try {
      await axios.delete(`/api/tokoh-terkenal/${famousFigure.id}`);

      toast({
        description: "Berhasil Hapus",
      });
      router.refresh();
      router.push("/");
    } catch (error) {
      toast({
        description: "Terjadi kesalahan,silahkan coba beberapa saat lagi",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
      <div className="flex gap-x-2 items-center">
        <Button size={"icon"} variant={"ghost"} onClick={() => router.back()}>
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <BotAvatar src={famousFigure.src} />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">{famousFigure.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MessageSquare className="w-3 h-3 m-1" />
              {famousFigure._count.messages}
            </div>
          </div>
          <p className="text-xs text-muted-foreground ">
            Dibuat oleh {famousFigure.userName}
          </p>
        </div>
      </div>
      {user?.id === famousFigure.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={"secondary"} size={"icon"}>
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push(`/tokoh-terkenal/${famousFigure.id}`)}
            >
              <Edit className="w-4 h-4 mr-2" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem className=" cursor-pointer" onClick={onDelete}>
              <Trash className="w-4 h-4 mr-2" />
              <span>Hapus</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
