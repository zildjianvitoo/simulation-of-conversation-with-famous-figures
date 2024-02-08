import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      tokohTerkenalId: string;
    };
  }
) {
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

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      tokohTerkenalId: string;
    };
  }
) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse("Anda belum login", { status: 401 });
    }

    const famousFigure = await prismadb.famousFigure.delete({
      where: {
        userId: user.id,
        id: params.tokohTerkenalId,
      },
    });

    return NextResponse.json(famousFigure);
  } catch (error) {
    console.log("[FAMOUS-FIGURE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
