import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type friendProps = {
  user_id: number;
  friend_id: number;
  status: "pending" | "accepted" | "blocked";
};

export async function POST(req: NextRequest, res: NextResponse) {
  const body: friendProps = await req.json();

  if (!body.user_id || !body.friend_id || !body.status)
    return NextResponse.json(
      {
        status: 400,
        ok: false,
        message: "User id, friend id and status are required",
      },
      { status: 400 }
    );

  try {
    const friend = await prisma.friends.create({
      data: {
        user_id: body.user_id,
        friend_id: body.friend_id,
        status: body.status,
      },
    });

    if (friend)
      return NextResponse.json({
        status: 200,
        ok: true,
        message: "Friend request sent",
      });
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({
        status: 500,
        ok: false,
        message: "Failed to send friend request",
        prisma_error: err.message,
      });
  }
}
