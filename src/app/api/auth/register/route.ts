import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const body: RegisterRequest = await req.json();

  // Debugging Purposes
  // console.log(body);

  const date = new Date(body.date_of_birth);
  const date_of_birth = date.toISOString();

  const user = await prisma.users.findFirst({
    where: {
      email: body.email,
    },
  });

  if (user) {
    return NextResponse.json({
      status: 403,
      account_created: false,
      message: "Email already Exist!",
    });
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
        date_of_birth: date_of_birth,
        title: body.title,
        child_grade_level: body.child_grade_level,
        emp_type: body.emp_type,
        emp_region: body.emp_region,
        school_type: body.school_type,
        school_region: body.school_region,
      },
    });
    if (user) {
      return NextResponse.json({
        status: 200,
        account_created: true,
        message: "Your account has been created!",
      });
    }
    return NextResponse.json({
      status: 200,
      account_created: false,
    });
  }
}
