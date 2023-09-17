import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      user_id: string;
    };
  }
) {
  // testing
  // console.log("params", params);
  if (!params.user_id)
    return NextResponse.json({ error: "User id is required" }, { status: 400 });
  try {
    const currentFriends = await prisma.$queryRaw(Prisma.sql`
        SELECT 
        f.user_id,
        CONCAT(u.first_name, ' ', u.last_name) as friend_name,
        f.friend_id,
        f.status
        FROM friends f
        JOIN users u ON f.friend_id = u.id
        WHERE f.user_id = ${Number(params.user_id)} AND f.status = 'accepted'`);

    const pendingFriends = await prisma.$queryRaw(Prisma.sql`
        SELECT 
        f.user_id,
        CONCAT(u.first_name, ' ', u.last_name) as friend_name,
        f.friend_id,
        f.status
        FROM friends f
        JOIN users u ON f.friend_id = u.id
        WHERE f.user_id = ${Number(params.user_id)} AND f.status = 'pending'`);

    const blockedFriends = await prisma.$queryRaw(Prisma.sql`
        SELECT 
        f.user_id,
        CONCAT(u.first_name, ' ', u.last_name) as friend_name,
        f.friend_id,
        f.status
        FROM friends f
        JOIN users u ON f.friend_id = u.id
        WHERE f.user_id = ${Number(params.user_id)} AND f.status = 'blocked'`);
    return NextResponse.json({
      status: 200,
      ok: true,
      currentFriends: currentFriends,
      pendingFriends: pendingFriends,
      blockedFriends: blockedFriends,
    });
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({
        status: 500,
        ok: false,
        message: "Failed to fetch friends",
        prisma_error: err.message,
      });
  }
}
