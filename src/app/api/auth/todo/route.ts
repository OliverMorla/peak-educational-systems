import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.OAUTH_SECRET });

  if (token) {
    try {
      const todos = await prisma.todo.findMany({
        where: {
          user_id: Number(token?.sub),
        },
      });

      if (todos) {
        return NextResponse.json({
          status: 200,
          ok: true,
          todos: todos,
        });
      }
    } catch (err) {
      return NextResponse.json({
        status: 500,
        ok: false,
        message: "Failed to fetch todos!",
        prisma_error: err instanceof Error ? err.message : "An Internal Error Occurred!",
      });
    }
  }
}
