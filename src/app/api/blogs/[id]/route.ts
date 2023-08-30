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
  const post = await prisma.blogs.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (post) return NextResponse.json({ status: 200, post });

  return NextResponse.json({
    status: 404,
    message: "Failed to get User from server!",
  });
}
