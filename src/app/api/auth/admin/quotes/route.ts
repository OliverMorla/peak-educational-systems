import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import isAdmin from "@/lib/isAdmin";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const user = await getToken({ req, secret: process.env.OAUTH_SECRET });
  if (isAdmin(user)) {
    try {
      const quotes = await prisma.quotes.findMany();

      if (quotes) {
        return NextResponse.json({ status: 200, ok: true, quotes: quotes });
      }
    } catch (err) {
      if (err instanceof Error) {
        return NextResponse.json({
          status: 500,
          ok: false,
          message: "Failed to fetch quotes",
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
  const quote_id = url.searchParams.get("id");

  if (!quote_id) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Missing quote id, please try again",
    });
  }

  if (isAdmin(user)) {
    try {
      const quote = await prisma.quotes.delete({
        where: {
          id: Number(quote_id),
        },
      });

      if (quote) {
        return NextResponse.json({
          status: 200,
          ok: true,
          message: "Quote successfully deleted",
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        return NextResponse.json({
          status: 400,
          ok: false,
          message: "Quote failed to be deleted",
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
