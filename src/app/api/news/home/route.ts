import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const news = await prisma.news.findMany({
      take: 3,
      select: {
        id: true,
        category: true,
        title: true,
        views: true,
        photo_cover_url: true,
        users: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    if (news) return NextResponse.json({ status: 200, ok: true, news: news });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Failed to fetch news!",
      prisma_error: err instanceof Error ? err.message : null,
    });
  }
}
