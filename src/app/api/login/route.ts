import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data";
import { z } from "zod";
import jwt from "jsonwebtoken";

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

    // get user from db
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

    // validate password
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

    // get the secret and ensure it's defined
    const jwtSecret = process.env.JWT_SECRET;
    console.log("jwt secret: ", jwtSecret);

    if (!jwtSecret) {
      console.error("JWT SECRET is not defined");
      return NextResponse.json(
        {
          message: "Internal server error (jwt)",
        },
        {
          status: 500,
        }
      );
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: "1h",
    });

    // 'update' isLogged-value to true in the database
    await db.user.update({
      where: { email },
      data: { isLogged: true },
    });

    return NextResponse.json(
      {
        message: "Login successful!",
        token, // return the token to client
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
