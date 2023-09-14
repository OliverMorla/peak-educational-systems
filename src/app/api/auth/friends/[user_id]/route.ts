import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

// export async function handler(
//   req: NextRequest,
//   { params }
// ): Promise<NextResponse> {
//   switch (req.method) {
//     case "GET":
//       console.log("params", params);

//       try {
//         const friends = await prisma.friends.findMany({
//           where: {
//             user_id: Number(params.user_id),
//           },
//         });
//         return NextResponse.json({ status: 200, ok: true, friends: friends });
//       } catch (error) {
//         console.error("Error fetching friends:", error);
//         return NextResponse.json(
//           { error: "Unable to fetch friends" },
//           { status: 500 }
//         );
//       }

//     case "POST":
//       // Implement POST logic here
//       return NextResponse.json(
//         { message: "POST not implemented" },
//         { status: 501 }
//       );

//     case "PUT":
//       // Implement PUT logic here
//       return NextResponse.json(
//         { message: "PUT not implemented" },
//         { status: 501 }
//       );

//     case "DELETE":
//       // Implement DELETE logic here
//       return NextResponse.json(
//         { message: "DELETE not implemented" },
//         { status: 501 }
//       );

//     default:
//       return NextResponse.json(
//         { message: "Method not supported" },
//         { status: 405 }
//       );
//   }
// }

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
  console.log("params", params);

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
        WHERE f.user_id = ${Number(params.user_id)} AND f.status = 'pending'`);
    return NextResponse.json({
      status: 200,
      ok: true,
      currentFriends: currentFriends,
      pendingFriends: pendingFriends,
      blockedFriends: blockedFriends,
    });
  } catch (error) {
    console.error("Error fetching friends:", error);
    return NextResponse.json(
      { error: "Unable to fetch friends" },
      { status: 500 }
    );
  }
}
