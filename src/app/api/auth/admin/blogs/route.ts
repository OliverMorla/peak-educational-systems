import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const blogs = await prisma.blogs.findMany();
  return NextResponse.json({ status: 200, ok: true, blogs: blogs });
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url as string, process.env.NEXT_PUBLIC_CLIENT_URL);
  const blog_id = url.searchParams.get("id");

  try {
    const blogs = await prisma.blogs.delete({
      where: {
        blog_id: Number(blog_id),
      },
    });

    if (blogs) {
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
