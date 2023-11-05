import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";

type Params = {
  id: string | number | undefined;
};

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Params;
  }
) {
  try {
    const userToken = await getToken({
      req,
      secret: process.env.OAUTH_SECRET,
    });
    
    const isSignedIn = userToken ? true : false;

    if (isSignedIn) {
      const user = await prisma.users.findUnique({
        where: {
          id: Number(params.id),
        },
        select: {
          avatar_url: true,
          first_name: true,
          last_name: true,
          role: true,
          school_region: true,
          school_type: true,
          employment_region: true,
          employment_type: true,
          title: true,
          created_at: true,
        },
      });
      if (user) {
        return NextResponse.json({ status: 200, ok: true, user: user });
      }
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Failed to fetch user!",
      prisma_error: err instanceof Error ? err.message : undefined,
    });
  }
}
