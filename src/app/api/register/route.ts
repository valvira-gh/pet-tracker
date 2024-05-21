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

    // Validate the user data
    const result = userSchema.safeParse(body);
    console.log("Result: ", result);

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

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Create the user in the database
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "New user added successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating user: ", error);
    return Response.json(
      {
        messsage: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}
