import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  const blog = await prisma.blogs.delete({
    where: {
      blog_id: body.id,
    },
  });

  if (blog) {
    return NextResponse.json({
      status: 200,
      blog_created: true,
      message: "Blog deleted successfully!",
    });
  }
}
