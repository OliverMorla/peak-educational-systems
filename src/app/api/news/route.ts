import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const LatestNews = await prisma.news.findMany({
        take: 3,
    });

    const PopularNews = await prisma.news.findMany({
        take: 3,
        orderBy: {
            // views: "desc",
        },
    });
  return NextResponse.json({ status: 200, ok: true, LatestNews, PopularNews});
};
