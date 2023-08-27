import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const news = await prisma.news.findMany({
    take: 3,
  });
  if (news) return NextResponse.json({ status: 200, news });
}
