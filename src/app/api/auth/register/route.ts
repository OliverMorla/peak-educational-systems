import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prismac = new PrismaClient();
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";



export async function POST(req: NextRequest, res: NextResponse) {
  const body: RegisterRequest = await req.json();

  const user = await prisma.users.findFirst({
    where: {
      email: body.email,
    },
  });

  if (user) {
    return NextResponse.json({ message: "Email Exist!" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(body.password, salt);

  if (hashedPassword) {
    const user = await prisma.users.create({
      data: { 
        first_name: body.first_name, 
        last_name: body.last_name,
        email: body.email,
        password: hashedPassword,        
        date_of_birth: body.date_of_birth,
        title: body.title,
        emp_type: body.emp_type,
        emp_region: body.emp_region,
        school_type: body.school_type,
        school_region: body.school_region,
      },
    }).catch((err: any) => {
      console.log(err);
    });

    if (user) {
      return NextResponse.json({
        status: 200,
        redirect: {
          url: "/login",
        },
      });
    }
  }
}
