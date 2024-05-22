// src/app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data";

export async function GET(request: NextRequest) {
  try {
    const users = await db.user.findMany();

    if (!users) {
      return NextResponse.json(
        {
          message: "No users found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(users);
  } catch (err: unknown) {
    console.error("Error fetching users data: ", err);
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
