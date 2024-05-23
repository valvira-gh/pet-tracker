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
        include: { profile: true },
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
        secretId: user.secretId,
        email: user.email,
        role: user.role,
        isLogged: user.isLogged,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        profile: {
          id: user.profile?.profileId,
          userId: user.profile?.userId,
          firstName: user.profile?.firstName,
          lastName: user.profile?.lastName,
        },
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

    if (
      typeof decodedToken === "object" &&
      decodedToken !== null &&
      "userId" in decodedToken
    ) {
      const decodedId = (decodedToken as JwtPayload).userId;
      console.log("userId after decodedToken: ", decodedId);

      const { firstName } = await request.json();
      console.log("First name after request resolving: ", firstName);

      // tarkistetaan profiilin olemassa olo
      const profile = await db.profile.findUnique({
        where: { userId: decodedId },
      });
      console.log("Profile: ", profile);

      // jos profiilia ei ole alustettu, luodaan profiili
      if (!profile) {
        await db.profile.create({
          data: {
            userId: decodedId,
            firstName: firstName,
          },
        });
      } else {
        // päivitä olemassa oleva profiili
        await db.profile.update({
          where: { userId: decodedId },
          data: { firstName: firstName },
        });
      }

      return NextResponse.json({
        message: "Profile updated successfully!",
        profile: profile,
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
