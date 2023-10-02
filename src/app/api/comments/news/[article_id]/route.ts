import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

let user: {
  id?: number;
} = {};

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
  const comment: string = await req.json();
  if (user?.id && comment) {
    const comments = await prisma.comments.create({
      data: {
        blog_id: Number(params.article_id),
        content: comment,
        user_id: Number(user?.id),
      },
    });

    if (comments) {
      return NextResponse.json({
        status: 200,
        ok: true,
        message: "Comment successfully created!",
      });
    }
  } else {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Comment failed to create!",
    });
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url as string, process.env.NEXT_PUBLIC_CLIENT_URL);
  const article_id = url.searchParams.get("article_id");
  const session = await fetch("http://localhost:3000/api/auth/session", {
    method: "GET",
    headers: headers(),
  });
  const data = await session.json();
  user = data.user;
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
    WHERE news_id = ${Number(article_id)}`
  );
  if (comments) return NextResponse.json({ status: 200, comments: comments });
}
