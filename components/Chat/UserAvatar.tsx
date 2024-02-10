import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

type Props = {
  src: string;
};

export default function UserAvatar({ src }: Props) {
  return (
    <Avatar className="h-12 w-12 ">
      <AvatarImage src={src} />
    </Avatar>
  );
}
