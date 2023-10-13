import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    status: 200,
    ok: true,
    message: "This route is still work in progress.",
  });
}
