import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    status: 200,
    ok: true,
    message: "Server is running!",
  });
}
