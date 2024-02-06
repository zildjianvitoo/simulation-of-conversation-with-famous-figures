import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type Parameters = {
  req: Request;
  params: {
    tokohTerkenalId: string;
  };
};

export async function PATCH({ req, params }: Parameters) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!params.tokohTerkenalId) {
      return new NextResponse("Id Tokoh Terkenal Diperlukan", { status: 401 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse("Field tidak lengkap", { status: 400 });
    }

    const companion = await prismadb.famousFigure.update({
      where: {
        id: params.tokohTerkenalId,
      },
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log("[FAMOUS-FIGURE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
