import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/lib/data";
import { JwtPayload } from "jsonwebtoken";

/**
 * Handles the GET request for user data.
 * @param request - The NextRequest object representing the incoming request.
 * @returns A NextResponse object containing the user data or an error message.
 */
export async function GET(request: NextRequest) {
  try {
    // Initialize the 'authHeader' variable with the 'token' value sent in the header from the frontend
    const authHeader = request.headers.get("Authorization");
    console.log("authHeader @ '/home': ", authHeader);

    // Verify the validity of the 'authHeader' value
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

    // Extract the 'token' value from the 'authHeader'
    const token = authHeader.split(" ")[1];
    console.log("Token after split: ", token);

    // Retrieve and verify the jwtSecret value from the .env file
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

    // Initialize the 'decodedToken' variable for the decoded JWT value
    let decodedToken: string | JwtPayload;
    // Validate the JWT token or return an error message
    try {
      decodedToken = jwt.verify(token, jwtSecret);
    } catch (err) {
      return NextResponse.json(
        {
          message: `Your session has expired.
                  Please log in to continue using the service.
            `,
        },
        {
          status: 401,
        }
      );
    }

    // Initialize the 'decodedId' variable with the actual 'id' value of the user
    const decodedId = (decodedToken as JwtPayload).userId;

    // Retrieve the user from the database based on the 'id' value
    let user = await db.user.findUnique({
      where: { id: decodedId },
    });

    // Update the 'lastLoggedInAt' field of the user in the database
    await db.user.update({
      where: { id: decodedId },
      data: { lastLoggedInAt: new Date() },
    });

    console.log("User data: ", user);

    // If the correct user is not found, return an error message with status 404
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // If everything is okay, return the requested user data
    return NextResponse.json({
      id: user.id,
      email: user.email,
      isLogged: user.isLogged,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLoggedInAt: user.lastLoggedInAt,
      lastLoggedOutAt: user.lastLoggedOutAt,
    });

    // Handle the error case for the Promise resolution
  } catch (err: unknown) {
    console.error("error fetching user data: ", err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
