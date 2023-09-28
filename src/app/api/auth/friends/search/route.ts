import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const name = await req.json();

  if (!name)
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Name is required",
    });

  try {
    const users = await prisma.users.findMany({
      where: {
        first_name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    if (users)
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
