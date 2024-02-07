import Categories from "@/components/Categories";
import FamousFigures from "@/components/FamousFigures";
import SearchInput from "@/components/SearchInput";
import prismadb from "@/lib/prismadb";

type Props = {
  searchParams: {
    categoryId: string;
    name: string;
  };
};

export default async function Home({ searchParams }: Props) {
  const data = await prismadb.famousFigure.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
      <FamousFigures data={data} />
    </div>
  );
}
