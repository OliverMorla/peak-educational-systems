import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: NextRequest, res: NextApiResponse) {
  
  const comment = await req.json();
  const comments = await prisma.comments.create({
    data: {
      blog_id: Number(params.article_id),
      content: comment,
      user_id: Number(params.user_id),
    },
  });
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const url = new URL(req.url as string, process.env.NEXT_PUBLIC_CLIENT_URL);
  const article_id = url.searchParams.get("article_id");
  const session = await getServerSession(req, res, authOptions);
  console.log(session);
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
  if (comments) return NextResponse.json({ status: 200, comments: comments });
}
