import FamousFigureForm from "@/components/FamousFigureForm";
import prismadb from "@/lib/prismadb";

type Props = {
  params: {
    tokohTerkenalId: string;
  };
};

export default async function TokohTerkenalIdPage({
  params: { tokohTerkenalId },
}: Props) {
  const famousFigure = await prismadb.famousFigure.findUnique({
    where: {
      id: tokohTerkenalId,
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <FamousFigureForm initialData={famousFigure} categories={categories} />
  );
}
