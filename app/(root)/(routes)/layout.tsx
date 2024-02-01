import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

type Props = { children: ReactNode };

export default function RootLayout({ children }: Props) {
  return (
    <div className="h-full">
      <Navbar />
      <main className="md:pl-20 pt-16 h-full">{children}</main>
    </div>
  );
}
