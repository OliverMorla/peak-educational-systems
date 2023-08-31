import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      article_id: any;
    };
  }
) {
  const comment = await req.json();
  const comments = await prisma.comments.create({
    data: {
      blog_id: Number(params.article_id),
      content: comment,
      user_id: 1,
    },
  });
  console.log(comments);
  console.log(comment);
  console.log(params?.article_id);
}

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      article_id: any;
    };
  }
) {
  console.log(params?.article_id);

  const comments = await prisma.comments.findMany({
    where: {
      blog_id: Number(params?.article_id),
    },
  });

  if (comments) return NextResponse.json({ status: 200, comments });
}
