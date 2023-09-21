import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const PopularBlogs = await prisma.$queryRaw(
      Prisma.sql`
      SELECT b.blog_id, b.author, b.content, b.photo_cover_url, b.category, b.updated_at, b.created_at, CAST(COALESCE(c.number_of_comments, 0) as INT) AS number_of_comments
      FROM blogs b
      LEFT JOIN (
          SELECT blog_id, COUNT(blog_id) as number_of_comments
          FROM comments
          GROUP BY blog_id
      ) AS c ON b.blog_id = c.blog_id
      ORDER BY COALESCE(c.number_of_comments, 0) DESC
      LIMIT 10;
      `
    );
    
    const LatestBlogs = await prisma.$queryRaw(
      Prisma.sql`
      SELECT b.blog_id, b.author, b.content, b.photo_cover_url, b.category, b.updated_at, b.created_at, CAST(COALESCE(c.number_of_comments, 0) as INT) AS number_of_comments
      FROM blogs b
      LEFT JOIN (
          SELECT blog_id, COUNT(blog_id) as number_of_comments
          FROM comments
          GROUP BY blog_id
      ) AS c ON b.blog_id = c.blog_id
      ORDER BY b.created_at DESC
      LIMIT 10;
      `
    );

    if (PopularBlogs && LatestBlogs)
      return NextResponse.json({
        status: 200,
        ok: true,
        PopularBlogs,
        LatestBlogs,
      });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Failed to fetch blogs!",
      prisma_error: err instanceof Error ? err.message : undefined,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, content, category, photo_cover_url, author, user_id } =
      await req.json();

    if (
      title == "" ||
      content == "" ||
      category == "" ||
      photo_cover_url == "" ||
      author == "" ||
      user_id == ""
    ) {
      return NextResponse.json({
        status: 400,
        ok: false,
        message: "All fields are required.",
      });
    }

    const blog = await prisma.blogs.create({
      data: {
        author: author,
        content: content,
        user_id: Number(user_id),
        title: title,
        photo_cover_url: photo_cover_url,
        category: category,
      },
    });

    return NextResponse.json({
      status: 201,
      ok: true,
      message: "Blog created successfully!",
    });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({
        status: 400,
        ok: false,
        message: err.message,
      });
    }
  }
}
