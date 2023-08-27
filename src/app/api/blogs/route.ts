import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const blogs = await prisma.blogs.findMany();
  if (blogs) return NextResponse.json({ status: 200, blogs });
}
