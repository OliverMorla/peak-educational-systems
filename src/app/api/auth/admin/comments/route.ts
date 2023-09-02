import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const comments = await prisma.$queryRaw(
    Prisma.sql`
    SELECT 
      c.id,
      c.content,
      c.created_at,
      c.updated_at,
      u.first_name
    FROM comments c
    INNER JOIN users u ON c.user_id = u.id;`
  );
  if (comments)
    return NextResponse.json({ status: 200, ok: true, comments: comments });
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url as string, process.env.NEXT_PUBLIC_CLIENT_URL);
  const comment_id = url.searchParams.get("id");

  try {
    const comment = await prisma.comments.delete({
      where: {
        id: Number(comment_id),
      },
    });

    if (comment) {
      return NextResponse.json({
        status: 200,
        ok: true,
        message: "Comment successfully deleted!",
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Comment failed to delete!",
    });
  }
}
