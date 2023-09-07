import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const blogs = await prisma.blogs.findMany();
  if (blogs) return NextResponse.json({ status: 200, blogs });
}

export async function POST(req: NextRequest) {
  const {
    title,
    content,
    category,
    coverPhoto,
    author,
    user_id,
    number_of_comments,
  } = await req.json();

  const blog = await prisma.blogs.create({
    data: {
      id: 7,
      title: title,
      content: content,
      category: category,
      photo_cover_url: coverPhoto,
      user_id: user_id,
      author: author,
      number_of_comments: number_of_comments,
    },
  });

  if (blog) {
    return NextResponse.json({
      status: 200,
      ok: true,
      message: "blog created successfully!",
    });
  }
  return NextResponse.json({
    status: 400,
    ok: false,
    message: "blog failed to create!",
  });
}
