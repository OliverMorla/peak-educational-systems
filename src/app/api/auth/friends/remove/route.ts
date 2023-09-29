import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type FriendRequestRemoveProps = {
  friend_id: number;
};

export async function POST(req: NextRequest, res: NextResponse) {
  const body: FriendRequestRemoveProps = await req.json();

  if (!body.friend_id)
    return NextResponse.json(
      {
        status: 400,
        ok: false,
        message: "User id and friend id are required",
      },
      { status: 400 }
    );

  try {
    const friendRequest = await prisma.friends.deleteMany({
      where: {
        OR: [{ user_id: body.friend_id, friend_id: body.friend_id }],
        AND: [{ status: "pending" }],
      },
    });

    if (friendRequest)
      return NextResponse.json({
        status: 200,
        ok: true,
        message: "Friend request removed",
      });
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({
        status: 500,
        ok: false,
        message: "Failed to remove friend request",
        prisma_error: err.message,
      });
  }
}
