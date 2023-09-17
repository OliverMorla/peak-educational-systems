import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.users.findMany();
    return NextResponse.json({ status: 200, ok: true, users: users });
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({
        status: 500,
        ok: false,
        message: "Failed to fetch users",
        prisma_error: err.message,
      });
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url as string, process.env.NEXT_PUBLIC_CLIENT_URL);
  const user_id = url.searchParams.get("id");

  if (!user_id)
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "User id is required",
    });

  try {
    const user = await prisma.users.delete({
      where: {
        id: Number(user_id),
      },
    });

    if (user) {
      return NextResponse.json({
        status: 200,
        ok: true,
        message: "User successfully deleted!",
      });
    }
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({
        status: 400,
        ok: false,
        message: "User failed to delete!",
        prisma_error: err.message,
      });
  }
}
