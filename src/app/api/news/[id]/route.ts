import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = {
  id: string | number | undefined;
};

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Params;
  }
) {
  try {
    const news = await prisma.news.findUnique({
      where: {
        id: Number(params.id),
      },
      include: {
        comments: {
          select: {
            id: true,
            content: true,
            created_at: true,
            users: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
        },
        users: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    });

    if (news) return NextResponse.json({ status: 200, ok: true, news: news });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Failed to fetch post!",
      prisma_error: err instanceof Error ? err.message : undefined,
    });
  }
}
