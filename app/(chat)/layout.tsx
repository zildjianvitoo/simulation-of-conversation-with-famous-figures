import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function LayoutChat({ children }: Props) {
  return <main className="mx-auto max-w-4xl h-full w-full">{children}</main>;
}
