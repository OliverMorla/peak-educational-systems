import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      user_id: string | number | undefined;
    };
  }
) {
  const url = new URL(req.url as string, process.env.NEXT_PUBLIC_CLIENT_URL);
  const friend_id = url.searchParams.get("friend_id");
  try {
    const chatHistory = await prisma.$queryRaw(
      Prisma.sql`
      SELECT * FROM (
        SELECT 
            cm.message_id,
            cm.from_user_id,
            CONCAT(u.first_name, ' ', u.last_name) as sender_name,
            cm.to_user_id,
            CONCAT(us.first_name, ' ', us.last_name) as receiver_name,
            cm.message_text,
            cm.timestamp
        FROM chat_messages cm
        LEFT JOIN (
            SELECT id, first_name, last_name
            FROM users
        ) AS u ON cm.from_user_id = u.id
        LEFT JOIN (
            SELECT id, first_name, last_name
            FROM users
        ) AS us ON cm.to_user_id = us.id
        WHERE cm.from_user_id = ${Number(
          params.user_id
        )} AND cm.to_user_id = ${Number(friend_id)}
    
        UNION
    
        SELECT 
            cm.message_id,
            cm.from_user_id,
            CONCAT(u.first_name, ' ', u.last_name) as sender_name,
            cm.to_user_id,
            CONCAT(us.first_name, ' ', us.last_name) as receiver_name,
            cm.message_text,
            cm.timestamp
        FROM chat_messages cm
        LEFT JOIN (
            SELECT id, first_name, last_name
            FROM users
        ) AS u ON cm.from_user_id = u.id
        LEFT JOIN (
            SELECT id, first_name, last_name
            FROM users
        ) AS us ON cm.to_user_id = us.id
        WHERE cm.from_user_id = ${Number(
          friend_id
        )} AND cm.to_user_id = ${Number(params.user_id)}
        ) AS combined_result
        ORDER BY combined_result.timestamp;
        `
    );
    if (chatHistory)
      return NextResponse.json({
        status: 200,
        ok: true,
        chatHistory: chatHistory,
      });
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({
        status: 500,
        ok: false,
        message: "Failed to fetch chat history",
        prisma_error: err.message,
      });
  }
}

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  try {
    const chat = await prisma.chat_messages.create({
      data: {
        message_text: message,
      },
    });
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({
        status: 500,
        ok: false,
        message: "Failed to create chat",
        prisma_error: err.message,
      });
  }
}
