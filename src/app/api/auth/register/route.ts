import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body: RegisterRequest = await req.json();

    if (
      !body.email ||
      !body.password ||
      !body.first_name ||
      !body.last_name ||
      !body.date_of_birth ||
      !body.title ||
      !body.role ||
      !body.child_grade_level ||
      !body.employment_type ||
      !body.employment_region ||
      !body.school_type ||
      !body.school_region
    ) {
      return NextResponse.json({
        status: 400,
        account_created: false,
        message: "All fields are required.",
      });
    }

    const existingUser = await prisma.users.findFirst({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      return NextResponse.json({
        status: 409,
        account_created: false,
        message: "Email already Exist!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const date = new Date(body.date_of_birth);
    const date_of_birth = date.toISOString();

    if (hashedPassword) {
      const user = await prisma.users.create({
        data: {
          first_name: body.first_name,
          last_name: body.last_name,
          email: body.email,
          password: hashedPassword,
          date_of_birth: date_of_birth,
          title: body.title,
          role: body.role,
          child_grade_level: body.child_grade_level,
          employment_type: body.employment_type,
          employment_region: body.employment_region,
          school_type: body.school_type,
          school_region: body.school_region,
        },
      });
      
      if (user) {
        return NextResponse.json({
          status: 201,
          account_created: true,
          message: "Your account has been created!",
        });
      }
    }
  } catch (err) {
    return NextResponse.json({
      status: 400,
      account_created: false,
      message: err instanceof Error ? err.message : "Something went wrong!",
    });
  }
}
