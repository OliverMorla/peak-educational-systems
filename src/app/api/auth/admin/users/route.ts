import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
  const users = await prisma.users.findMany();
  return NextResponse.json({ status: 200, ok: true, users: users });
}
