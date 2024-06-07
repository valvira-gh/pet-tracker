import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

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

    console.log("1. JWT_SECRET", jwtSecret);

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

    let decodedToken: JwtPayload;
    try {
      decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid or expired token." },
        { status: 401 }
      );
    }

    if (decodedToken && decodedToken.userId) {
      const userId = decodedToken.userId;

      console.log("UserId: ", userId); // User.id NOT User.randomId

      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        include: { profile: true },
      });

      if (!user) {
        return NextResponse.json(
          { message: "User not found." },
          { status: 404 }
        );
      }

      return NextResponse.json({
        id: user.id,
        userId: user.randomId,
        email: user.email,
        role: user.role,
        isLogged: user.isLogged,
        createdAt: user.profile?.createdAt,
        updatedAt: user.profile?.updatedAt,
        profile: {
          id: user.profile?.id,
          userId: user.profile?.userId,
          firstName: user.profile?.firstName,
          lastName: user.profile?.lastName,
        },
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

export async function POST(request: NextRequest) {
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

    let decodedToken: JwtPayload;
    try {
      decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
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

    if (decodedToken && decodedToken.userId) {
      const userId = decodedToken.userId;

      const { firstName } = await request.json();

      const profile = await prisma.profile.findUnique({
        where: { userId: userId },
      });

      if (!profile) {
        await prisma.profile.create({
          data: {
            userId: userId,
            firstName: firstName,
          },
        });
      } else {
        await prisma.profile.update({
          where: { userId: userId },
          data: { firstName: firstName },
        });
      }

      return NextResponse.json({
        message: "Profile updated successfully!",
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
    console.error("Error updating profile ", err);
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
