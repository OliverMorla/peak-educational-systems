import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = {
  id: string | number | undefined;
};

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Params;
  }
) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    if (user) return NextResponse.json({ status: 200, ok: true, user: user });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Failed to fetch user!",
      prisma_error: err instanceof Error ? err.message : undefined,
    });
  }
}
