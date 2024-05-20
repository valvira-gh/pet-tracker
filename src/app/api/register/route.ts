import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data";
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(200),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the user data
    const result = userSchema.safeParse(body);
    console.log(result);
    if (!result.success) {
      return Response.json(
        {
          message: "Invalid input",
        },
        {
          status: 400,
        }
      );
    }

    const { email, password } = result.data;

    // Create the user in the database
    const user = await db.user.create({
      data: {
        email,
        password,
      },
    });

    return Response.json(
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
