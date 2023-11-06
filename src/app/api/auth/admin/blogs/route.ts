import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import isAdmin from "@/lib/isAdmin";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const user = await getToken({ req, secret: process.env.OAUTH_SECRET });
  if (isAdmin(user)) {
    try {
      const blogs = await prisma.blogs.findMany({
        select: {
          blog_id: true,
          author: true,
          title: true,
          created_at: true,
          category: true,
          _count: {
            select: {
              comments: true,
            },
          },
        },
      });
      if (blogs) {
        return NextResponse.json({ status: 200, ok: true, blogs: blogs });
      }
    } catch (err) {
      if (err instanceof Error) {
        return NextResponse.json({
          status: 500,
          ok: false,
          message: "Failed to fetch blogs",
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
  const blog_id = url.searchParams.get("id");

  if (!blog_id) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Missing blog id, please try again",
    });
  }

  if (isAdmin(user)) {
    try {
      const blog = await prisma.blogs.delete({
        where: {
          blog_id: Number(blog_id),
        },
      });

      if (blog) {
        return NextResponse.json({
          status: 200,
          ok: true,
          message: "Blog successfully deleted",
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        return NextResponse.json({
          status: 400,
          ok: false,
          message: "Blog failed to be deleted",
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
