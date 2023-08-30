import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const categories = await prisma.blogs.groupBy({
    by: "category",
    _count: {
      category: true,
    },
  });

  if (categories) return NextResponse.json({ status: 200, categories });
}
