import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
  const users = await prisma.users.findMany();
  return NextResponse.json({ status: 200, ok: true, users: users });
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url as string, process.env.NEXT_PUBLIC_CLIENT_URL);
  const user_id = url.searchParams.get("id");

  try {
    const users = await prisma.users.delete({
      where: {
        id: Number(user_id),
      },
    });

    if (users) {
      return NextResponse.json({
        status: 200,
        ok: true,
        message: "News successfully deleted!",
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "News failed to delete!",
    });
  }
}
