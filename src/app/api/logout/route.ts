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
      // > { userId: <value>, iat: <value>, exp: <value> }
    } catch (err) {
      return NextResponse.json(
        { message: "Virheellinen tai vanhetunut token." },
        { status: 401 }
      );
    }

    // Käyttäjän yksilöivä ID-arvo saadaan 'decodedToken'-objektin (JwtPayload)
    // 'userId'-arvosta. Talletetaan se muuttujaan 'decodedId', joka on nimetty
    // ajatellen koodin luettavuutta ja prosessien seurannan helpottamiseksi.
    const decodedId = (decodedToken as JwtPayload).userId;

    // Varmistetaan, että käyttäjä on olemassa hyödyntämällä aiemmin dekoodatua 'decodedId'-arvoa.
    const user = await db.user.findUnique({
      where: { id: decodedId },
    });

    // Jos käyttäjä löytyy, päivitetään hänen tietonsa tavalla, joka muuntaa
    // hänen kirjautumistilansa ('isLogged'-attribuutin) arvoon 'false':
    if (user) {
      await db.user.update({
        where: { id: decodedId },
        data: { isLogged: false },
      });

      return NextResponse.json(
        { message: "Käyttäjä uloskirjattu onnistuneesti." },
        { status: 200 }
      );
    }
    // Jos käyttäjää ei löydy, palautetaan asianmukainen virheilmoitus:
    else {
      return NextResponse.json(
        { message: "Käyttäjä ei löytynyt (id-arvot eivät täsmää)." },
        { status: 404 }
      );
    }
  } catch (err: unknown) {
    console.error("Virhe uloskirjautumisen yhteydessä. Virhe:\n", err);
    return NextResponse.json(
      { message: "Palvelimen sisäinen virhe." },
      { status: 500 }
    );
  }
}
