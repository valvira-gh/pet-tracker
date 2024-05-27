import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data";
import jwt, { JwtPayload } from "jsonwebtoken";

// KÄYTTÄJÄN ULOSKIRJAUS //
export async function PUT(request: NextRequest) {
  // Frontendistä tuleva HTTP-pyynnön tulee sisältää Authorization Headerissä
  // käyttäjän yksilöivä JWToken. Alustetaan se muuttujaan 'authHeader'.
  try {
    const authHeader = request.headers.get("Authorization");
    // Varmennetaan että token saapui ja että se on oikeanlainen
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Authorization header puuttuu tai on virheellinen." },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];

    // Haetaan JWT-salaisus .env-tiedostosta ja varmennetaan se.
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET arvoa ei pystytty noutamaan envelopesta.");
      return NextResponse.json(
        { message: "Sisäinen palvelinvirhe. Yritä kirjautumista uudelleen." },
        { status: 500 }
      );
    }

    // Alustetaan muuttuja 'decodedToken', joka saa arvokseen tuloksen
    // jwt.verify()-funktion tuloksen
    let decodedToken: string | JwtPayload;
    try {
      decodedToken = jwt.verify(token, jwtSecret);
      console.log("Dekoodattu token: ", decodedToken);
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
