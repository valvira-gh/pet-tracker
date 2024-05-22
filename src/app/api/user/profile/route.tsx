// '@/app/api/user/profile/route.tsx:
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET(request: NextRequest) {
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
      console.error("JWT_SECRET is not defined.");
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

    if (
      typeof decodedToken === "object" &&
      decodedToken !== null &&
      "userId" in decodedToken
    ) {
      const userId = (decodedToken as JwtPayload).userId;

      const user = await db.user.findUnique({
        where: { id: userId },
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

      return NextResponse.json({
        id: user.id,
        email: user.email,
        role: user.role,
        isLogged: user.isLogged,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        // include other user data when needed
      });
    } else {
      return NextResponse.json(
        {
          message: "Invalid token payload.",
        },
        {
          status: 401,
        }
      );
    }
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
