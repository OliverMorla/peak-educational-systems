import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const LatestNews = await prisma.$queryRaw(
    Prisma.sql`
    SELECT 
        n.id,
        CONCAT(u.first_name, ' ', u.last_name) as author, 
        n.title,
        n.content,
        n.photo_cover_url,
        n.created_at,
        n.category,
        n.views,
        CAST(COALESCE(c.number_of_comments, 0) as INT) AS number_of_comments
    FROM news n
    LEFT JOIN (
        SELECT id, first_name, last_name
        FROM users
    ) AS u ON n.user_id = u.id
    LEFT JOIN (
        SELECT news_id, COUNT(news_id) as number_of_comments
        FROM comments
        GROUP BY news_id
    ) AS c ON n.id = c.news_id
    ORDER BY n.created_at DESC;
    `
  );

  const PopularNews = await prisma.$queryRaw(
    Prisma.sql`
    SELECT 
        n.id,
        CONCAT(u.first_name, ' ', u.last_name) as author, 
        n.title,
        n.content,
        n.photo_cover_url,
        n.created_at,
        n.category,
        n.views,
        CAST(COALESCE(c.number_of_comments, 0) as INT) AS number_of_comments
    FROM news n
    LEFT JOIN (
        SELECT id, first_name, last_name
        FROM users
    ) AS u ON n.user_id = u.id
    LEFT JOIN (
        SELECT news_id, COUNT(news_id) as number_of_comments
        FROM comments
        GROUP BY news_id
    ) AS c ON n.id = c.news_id
    ORDER BY n.views DESC;
    `
  );
  return NextResponse.json({ status: 200, ok: true, LatestNews, PopularNews });
}
