import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          message: "Authorization header is missing or invalid.",
        },
        {
          status: 401,
        }
      );
    }

    const token = authHeader.split(" ")[1];

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error("JWT SECRET is not defined.");
      return NextResponse.json(
        {
          message: "Internal server error.",
        },
        {
          status: 500,
        }
      );
    }

    let decodedToken: string | JwtPayload;
    try {
      decodedToken = jwt.verify(token, jwtSecret);
    } catch (err) {
      return NextResponse.json(
        {
          message: "Invalid or expired token.",
        },
        {
          status: 401,
        }
      );
    }

    const decodedId = (decodedToken as JwtPayload).userId;

    const user = await db.user.findUnique({
      where: { id: decodedId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await db.user.update({
      where: { id: decodedId },
      data: { isLogged: false },
    });

    return NextResponse.json({
      message: "User logged out successfully.",
    });
  } catch (err: unknown) {
    console.error("Error during logout:", err);
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
