import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data";
import { z } from "zod";
const bcrypt = require("bcrypt");

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(200),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // validate the user data
    const result = userSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
        },
        {
          status: 400,
        }
      );
    }

    const { email, password } = result.data;

    // get users from db
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Invalid password",
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Login successful!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error logging in user: ", error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
