import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const news = await prisma.news.findMany();
    return NextResponse.json({ status: 200, ok: true, news: news });
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({
        status: 500,
        ok: false,
        message: "Failed to fetch news",
        prisma_error: err.message,
      });
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url as string, process.env.NEXT_PUBLIC_CLIENT_URL);
  const news_id = url.searchParams.get("id");

  if (!news_id)
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "News id is required",
    });

  try {
    const news = await prisma.news.delete({
      where: {
        id: Number(news_id),
      },
    });

    if (news) {
      return NextResponse.json({
        status: 200,
        ok: true,
        message: "News successfully deleted!",
      });
    }
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({
        status: 400,
        ok: false,
        message: "News failed to delete!",
        prisma_error: err.message,
      });
  }
}
