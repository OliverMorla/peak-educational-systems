import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const chatHistory = await prisma.$queryRaw(
      Prisma.sql`
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
        ) AS us ON cm.to_user_id = us.id;
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

// SELECT
// cm.message_id,
// cm.from_user_id,
// CONCAT(u.first_name, ' ', u.last_name) as sender_name,
// cm.to_user_id,
// CONCAT(us.first_name, ' ', us.last_name) as receiver_name,
// cm.message_text,
// cm.timestamp
// FROM chat_messages cm
// LEFT JOIN (
// 	SELECT id, first_name, last_name
// 	FROM users
// ) AS u ON cm.from_user_id = u.id
// LEFT JOIN (
// 	SELECT id, first_name, last_name
// 	FROM users
// ) AS us ON cm.to_user_id = us.id;
