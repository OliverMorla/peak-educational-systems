import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";
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
  const user = await prisma.users.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (user) return NextResponse.json({ status: 200, user });

  return NextResponse.json({
    status: 404,
    message: "Failed to get User from server!",
  });
}
