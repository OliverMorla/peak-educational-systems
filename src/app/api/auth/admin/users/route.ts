import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import isAdmin from "@/lib/isAdmin";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const user = await getToken({
    req,
    secret: process.env.OAUTH_SECRET,
  });

  if (isAdmin(user)) {
    try {
      const users = await prisma.users.findMany({
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          date_of_birth: true,
          role: true,
          title: true,
          created_at: true,
        },
      });

      if (users) {
        return NextResponse.json({ status: 200, ok: true, users: users });
      }
    } catch (err) {
      if (err instanceof Error) {
        return NextResponse.json({
          status: 500,
          ok: false,
          message: "Failed to fetch users",
          prisma_error: err.message,
        });
      }
    }
  } else {
    return NextResponse.json({
      status: 401,
      ok: false,
      message: "Unauthorized",
    });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getToken({ req, secret: process.env.OAUTH_SECRET });
  const url = new URL(req.url as string, process.env.NEXT_PUBLIC_CLIENT_URL);
  const user_id = url.searchParams.get("id");

  if (!user_id) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Missing user id, please try again",
    });
  }

  if (isAdmin(user)) {
    try {
      const user = await prisma.users.delete({
        where: {
          id: Number(user_id),
        },
      });

      if (user) {
        return NextResponse.json({
          status: 200,
          ok: true,
          message: "User successfully deleted",
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        return NextResponse.json({
          status: 400,
          ok: false,
          message: "User failed to be deleted",
          prisma_error: err.message,
        });
      }
    }
  } else {
    return NextResponse.json({
      status: 401,
      ok: false,
      message: "Unauthorized",
    });
  }
}
