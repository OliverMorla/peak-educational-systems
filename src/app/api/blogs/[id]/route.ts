import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = {
  id: string | number | undefined;
};

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Params;
  }
) {
  try {
    const post = await prisma.blogs.findUnique({
      where: {
        blog_id: Number(params.id),
      },
    });

    if (post) return NextResponse.json({ status: 200, ok: true, post: post });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Failed to fetch post!",
      prisma_error: err instanceof Error ? err.message : undefined,
    });
  }
}

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string | number | undefined;
    };
  }
) {
  const { id, title, content, category, coverPhotoUrl } = await req.json();
  try {
    if (!id || !title || !content || !category || !coverPhotoUrl)
      throw new Error("Missing required fields!");
  } catch (err) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Missing required fields!",
      prisma_error: err instanceof Error ? err.message : undefined,
    });
  }
  try {
    const post = await prisma.blogs.update({
      where: {
        blog_id: Number(id),
      },
      data: {
        title: title,
        content: content,
        category: category,
        photo_cover_url: coverPhotoUrl,
      },
    });
    if (post) return NextResponse.json({ status: 200, ok: true, post: post });
  } catch (err) {
    NextResponse.json({
      status: 500,
      ok: false,
      message: "Failed to update post!",
      prisma_error: err instanceof Error ? err.message : undefined,
    });
  }
}
