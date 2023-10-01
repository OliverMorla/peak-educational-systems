import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { friend_id, user_id, status } = await req.json();

  if (!friend_id || !user_id || !status)
    return NextResponse.json(
      {
        status: 400,
        ok: false,
        message: "User id and friend id are required",
      },
      { status: 400 }
    );

  try {
    const friendRequest = await prisma.friends.updateMany({
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
      data: {
        status: status,
      },
    });

    if (friendRequest) {
      return NextResponse.json({
        status: 200,
        ok: true,
        message: "Friend blocked!",
      });
    }

    console.log(friendRequest);
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Failed to block friend!",
      prisma_error:
        err instanceof Error ? err.message : "An internal error occurred!",
    });
  }
}
