import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const news = await prisma.news.findMany();
  return NextResponse.json({ status: 200, ok: true, news: news });
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url as string, process.env.NEXT_PUBLIC_CLIENT_URL);
  const news_id = url.searchParams.get("id");

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
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "News failed to delete!",
    });
  }
}
