import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data";
import { z } from "zod";
import jwt, { JwtPayload } from "jsonwebtoken";

const bcrypt = require("bcrypt");

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(200),
});

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    console.log("authHeader: ", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer: ")) {
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
    console.log("token after split: ", token);
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
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      isLogged: user.isLogged,
    });
  } catch (err: unknown) {
    console.error("error fetching user data: ", err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}

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
