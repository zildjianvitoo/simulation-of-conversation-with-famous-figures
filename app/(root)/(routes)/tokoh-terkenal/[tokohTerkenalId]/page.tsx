import FamousFigureForm from "@/components/FamousFigureForm";
import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";

type Props = {
  params: {
    tokohTerkenalId: string;
  };
};

export default async function TokohTerkenalIdPage({
  params: { tokohTerkenalId },
}: Props) {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const famousFigure = await prismadb.famousFigure.findUnique({
    where: {
      id: tokohTerkenalId,
      userId,
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <FamousFigureForm initialData={famousFigure} categories={categories} />
  );
}
