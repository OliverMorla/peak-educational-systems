import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const blogs = await prisma.blogs.findMany();
    return NextResponse.json({ status: 200, ok: true, blogs: blogs });
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({
        status: 500,
        ok: false,
        message: "Failed to fetch blogs",
        prisma_error: err.message,
      });
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url as string, process.env.NEXT_PUBLIC_CLIENT_URL);
  const blog_id = url.searchParams.get("id");

  if (!blog_id)
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Blog id is required",
    });

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
        message: "Blog successfully deleted!",
      });
    }
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({
        status: 400,
        ok: false,
        message: "Blog failed to delete!",
        prisma_error: err.message,
      });
  }
}
