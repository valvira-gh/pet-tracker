import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    // Alustetaan muuttuja 'authHeader' frontendista
    // lähetetyllä headerillä, jossa mukana 'token' arvo
    const authHeader = request.headers.get("Authorization");
    console.log("authHeader @ '/home': ", authHeader);

    // Varmennetaan arvon oikeellisuus
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

    // Eriytetään 'token' arvo muusta 'authHeader':sta
    const token = authHeader.split(" ")[1];
    console.log("Token after split: ", token);

    // Noudetaan ja varmennetaan jwtSecret-arvo .env-tiedostosta
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

    // Alustetaan muuttuja murretulle JWT-arvolle
    let decodedToken: string | JwtPayload;
    // Validioitaan JWToken-arvo tai palautetaan virheilmoitus
    try {
      decodedToken = jwt.verify(token, jwtSecret);
    } catch (err) {
      return NextResponse.json(
        {
          message: `Istuntosi on vanhentunut.
                  Kirjaudu sisään jatkaaksesi palvelun käyttöä.
            `,
        },
        {
          status: 401,
        }
      );
    }

    // Alustetaan 'decodedId' muuttuja käyttäjän
    // todellisella 'id'-arvolla.
    const decodedId = (decodedToken as JwtPayload).userId;

    // Haetaan käyttäjä tietokannasta 'id'-arvon perusteella
    const user = await db.user.findUnique({
      where: { id: decodedId },
    });

    // Jos oikeaa käyttäjää ei löydy, palautetaan
    // virheilmoitus ja asetetaan status 404
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // Jos kaikki ok, palautetaan pyydetyt käyttäjätiedot
    return NextResponse.json({
      id: user.id,
      email: user.email,
      isLogged: user.isLogged,
    });

    // Käsitellään virheellinen Promise-ratkaisu
  } catch (err: unknown) {
    console.error("error fetching user data: ", err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
