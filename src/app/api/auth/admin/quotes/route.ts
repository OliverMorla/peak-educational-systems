import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const quotes = await prisma.quotes.findMany();
    return NextResponse.json({ status: 200, ok: true, quotes: quotes });
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({
        status: 500,
        ok: false,
        message: "Failed to fetch quotes",
        prisma_error: err.message,
      });
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url as string, process.env.NEXT_PUBLIC_CLIENT_URL);
  const quote_id = url.searchParams.get("id");

  if (!quote_id)
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Quote id is required",
    });

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
        message: "Quote successfully deleted!",
      });
    }
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({
        status: 400,
        ok: false,
        message: "Quote failed to delete!",
        prisma_error: err.message,
      });
  }
}
