import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const comments = await prisma.comments.findMany();
  if (comments)
    return NextResponse.json({ status: 200, ok: true, comments: comments });
}
