import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";

export async function GET(req: NextRequest, res: NextResponse) {
  const database = await db;
  const { rows } = await database.query("SELECT * FROM quotes");
  return NextResponse.json(rows);
}
