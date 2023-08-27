import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";

export async function GET() {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({ message: "You are not logged in!" });
  // }
  // if (session.user?.email === "admin@peakeducationalsystems.com") {
  //   return NextResponse.json("You are logged in as admin");
  // }
  const news = await prisma.news.findMany();
  return NextResponse.json({ status: 200, ok: true, news: news });
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  try {
    const news = await prisma.news.delete({
      where: {
        id: body.id,
      },
    });
  } catch (err) {}
}
