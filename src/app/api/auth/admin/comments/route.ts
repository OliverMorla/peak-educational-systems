import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import isAdmin from "@/lib/isAdmin";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const user = await getToken({ req, secret: process.env.OAUTH_SECRET });
  if (isAdmin(user)) {
    try {
      const comments = await prisma.comments.findMany({
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
          blogs: {
            select: {
              title: true,
            },
          },
          news: {
            select: {
              title: true,
            },
          },
        },
      });
      if (comments) {
        return NextResponse.json({ status: 200, ok: true, comments: comments });
      }
    } catch (err) {
      if (err instanceof Error) {
        return NextResponse.json({
          status: 500,
          ok: false,
          message: "Failed to fetch comments",
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
  const comment_id = url.searchParams.get("id");

  if (!comment_id) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Missing comment id, please try again",
    });
  }

  if (isAdmin(user)) {
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
          message: "Comment successfully deleted",
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        return NextResponse.json({
          status: 400,
          ok: false,
          message: "Comment failed to be deleted",
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
