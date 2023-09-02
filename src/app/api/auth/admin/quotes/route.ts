import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";

export async function GET() {
  const quotes = await prisma.quotes.findMany();
  return NextResponse.json({ status: 200, ok: true, quotes: quotes });
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url as string, process.env.NEXT_PUBLIC_CLIENT_URL);
  const quote_id = url.searchParams.get("id");

  try {
    const quotes = await prisma.quotes.delete({
      where: {
        id: Number(quote_id),
      },
    });

    if (quotes) {
      return NextResponse.json({
        status: 200,
        ok: true,
        message: "News successfully deleted!",
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "News failed to delete!",
    });
  }
}
