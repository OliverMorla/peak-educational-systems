import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import isAdmin from "@/lib/isAdmin";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const user = await getToken({ req, secret: process.env.OAUTH_SECRET });
  if (isAdmin(user)) {
    try {
      const news = await prisma.news.findMany({
        select: {
          id: true,
          title: true,
          category: true,
          views: true,
          created_at: true,
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

      if (news) {
        return NextResponse.json({ status: 200, ok: true, news: news });
      }
    } catch (err) {
      if (err instanceof Error) {
        return NextResponse.json({
          status: 500,
          ok: false,
          message: "Failed to fetch news",
          prisma_error: err.message,
        });
      }
    }
  } else {
    return NextResponse.json({
      status: 401,
      ok: false,
      message: "Unauthorized",
    });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getToken({ req, secret: process.env.OAUTH_SECRET });
  const url = new URL(req.url as string, process.env.NEXT_PUBLIC_CLIENT_URL);
  const news_id = url.searchParams.get("id");

  if (!news_id) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Missing news id, please try again",
    });
  }

  if (isAdmin(user)) {
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
          message: "News successfully deleted",
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        return NextResponse.json({
          status: 400,
          ok: false,
          message: "News failed to be deleted",
          prisma_error: err.message,
        });
      }
    }
  } else {
    return NextResponse.json({
      status: 401,
      ok: false,
      message: "Unauthorized",
    });
  }
}
