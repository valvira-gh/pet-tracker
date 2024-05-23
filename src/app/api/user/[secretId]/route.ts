import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data";

export const GET = async (
  request: NextRequest,
  { params }: { params: { secretId: string } }
) => {
  try {
    const user = await db.user.findUnique({
      where: { secretId: params.secretId }, // use the User-models secretId
      include: { profile: true }, // include the Profile-model
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
};
