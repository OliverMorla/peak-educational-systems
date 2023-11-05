import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      article_id: string;
    };
  }
) {
  const user = await getToken({ req, secret: process.env.OAUTH_SECRET });
  const comment: string = await req.json();

  if (comment === "") {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Comment cannot be empty!",
    });
  }

  if (user) {
    try {
      const comments = await prisma.comments.create({
        data: {
          blog_id: Number(params.article_id),
          user_id: Number(user?.sub),
          content: comment,
        },
      });
      if (comments) {
        return NextResponse.json({
          status: 200,
          ok: true,
          message: "Comment successfully created!",
        });
      }
    } catch (err) {
      return NextResponse.json({
        status: 500,
        ok: false,
        message: "Failed to create comment!",
        prisma_error:
          err instanceof Error ? err.message : "An Internal Error Occurred!",
      });
    }
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url as string, process.env.NEXT_PUBLIC_CLIENT_URL);
  const article_id = url.searchParams.get("article_id");
  try {
    const comments = await prisma.$queryRaw(
      Prisma.sql`
      SELECT 
        c.id,
        c.content,
        c.created_at,
        c.updated_at,
        u.first_name
      FROM comments c
      INNER JOIN users u ON c.user_id = u.id
      WHERE blog_id = ${Number(article_id)}`
    );
    if (comments)
      return NextResponse.json({ ok: true, status: 200, comments: comments });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      status: 500,
      message: "Failed to fetch comments!",
      prisma_error:
        err instanceof Error ? err.message : "An Internal Error Occurred!",
    });
  }
}
