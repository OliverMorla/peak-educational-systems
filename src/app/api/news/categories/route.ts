import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.news.groupBy({
      by: "category",
      _count: {
        category: true,
      },
    });

    if (categories)
      return NextResponse.json({
        status: 200,
        ok: true,
        categories: categories,
      });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Failed to fetch categories!",
      prisma_error: err instanceof Error ? err.message : undefined,
    });
  }
}
