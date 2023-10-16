import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type FriendRequestRemoveProps = {
  friend_id: number;
  user_id: number;
};

export async function POST(req: NextRequest, res: NextResponse) {
  const { friend_id, user_id } = await req.json();
  if (!friend_id)
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
        OR: [
          {
            status: "accepted",
            user_id: friend_id,
            friend_id: user_id,
          },
          {
            status: "accepted",
            user_id: user_id,
            friend_id: friend_id,
          },
        ],
      },
    });
    if (friendRequest)
      return NextResponse.json({
        status: 200,
        ok: true,
        message: "Friend  removed",
      });
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({
        status: 500,
        ok: false,
        message: "Failed to remove friend",
        prisma_error: err.message,
      });
  }
}
