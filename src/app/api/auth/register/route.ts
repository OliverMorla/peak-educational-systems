import { NextRequest, NextResponse } from "next/server";

interface Request {}

export async function POST(req: NextRequest, res: NextResponse) {
  const body: Request = await req.json();
}
