import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function LayoutAuth({ children }: Props) {
  return (
    <main className="flex min-h-screen justify-center items-center">
      {children}
    </main>
  );
}
