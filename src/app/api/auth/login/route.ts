import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

interface RequestBody {
  email: string;
  password: string;
}

export async function GET(req: NextRequest, res: NextResponse) {
  const body: RequestBody = await req.json();

  const user = await prisma.users.findFirst({
    where: {
      email: body.email,
    },
  });

  if (user) {
    return NextResponse.json({ ok: true });
  }
}
