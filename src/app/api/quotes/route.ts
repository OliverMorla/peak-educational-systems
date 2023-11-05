import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const quotes = await prisma.quotes.findMany();
  if (quotes) return NextResponse.json({ status: 200, ok: true, quotes });
}
