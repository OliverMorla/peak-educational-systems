import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  const body: Blog = await req.json();

  // if (body) {
  //   const blog = await prisma.blogs.create({
  //     data: {
  //       author: body.author,
  //       author_id: body.author_id,
  //       content: body.content,

  //     },
  //   });

  //   if (blog) {
  //     return NextResponse.json({
  //       status: 200,
  //       blog_created: true,
  //       message: "Blog successfully created!",
  //     });
  //   }
  // }
}
