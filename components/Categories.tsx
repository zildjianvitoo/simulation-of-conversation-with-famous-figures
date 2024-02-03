"use client";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

type Props = {
  data: Category[];
};

export default function Categories({ data }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const onButtonClick = (id: string) => {
    const query = {
      categoryId: id,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="w-full overflow-x-auto space-x-2 flex p-1">
      <button
        onClick={() => onButtonClick("")}
        className={cn(
          "flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-85 transition",
          {
            "bg-primary/25": !categoryId,
          }
        )}
      >
        Terbaru
      </button>
      {data.map((item) => (
        <button
          key={item.id}
          onClick={() => onButtonClick(item.id)}
          className={cn(
            "flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-85 transition",
            {
              "bg-primary/25": item.id === categoryId,
            }
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}
