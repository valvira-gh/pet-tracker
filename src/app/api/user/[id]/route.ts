// src/app/api/user/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id, 10);
    const user = await db.user.findUnique({
      where: { id: userId }, // use the User-model's id to find the correct user
      include: { profile: true }, // include the Profile model
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(user);
  } catch (err: unknown) {
    console.error("Error fetching user data: ", err);
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
