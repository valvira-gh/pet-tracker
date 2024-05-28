/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Rooli" AS ENUM ('ADMIN', 'USER', 'GUEST');

-- CreateEnum
CREATE TYPE "ElainLaji" AS ENUM ('KISSA', 'KOIRA', 'HEVONEN');

-- CreateEnum
CREATE TYPE "Sukupuoli" AS ENUM ('MIES', 'NAINEN', 'MUU', 'EN_HALUA_VASTATA');

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Kayttaja" (
    "tunniste" SERIAL NOT NULL,
    "satunnaisTunniste" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "salasana" TEXT NOT NULL,
    "rooli" "Rooli" NOT NULL DEFAULT 'USER',
    "onKirjautunut" BOOLEAN NOT NULL DEFAULT false,
    "kayttajaLuotu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kayttajaPaivitetty" TIMESTAMP(3) NOT NULL,
    "kunViimeksiSisaankirjautui" TIMESTAMP(3),
    "kunViimeksiUloskirjautui" TIMESTAMP(3),

    CONSTRAINT "Kayttaja_pkey" PRIMARY KEY ("tunniste")
);

-- CreateTable
CREATE TABLE "Profiili" (
    "tunnisteNro" SERIAL NOT NULL,
    "kayttajaTunniste" TEXT NOT NULL,
    "etunimi" TEXT,
    "sukunimi" TEXT,
    "ika" INTEGER,
    "sukupuoli" "Sukupuoli",
    "luomisLeima" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "muutosLeima" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profiili_pkey" PRIMARY KEY ("tunnisteNro")
);

-- CreateTable
CREATE TABLE "Lemmikki" (
    "tunnisteNro" SERIAL NOT NULL,
    "referenssiAvain" TEXT NOT NULL,
    "laji" "ElainLaji" NOT NULL,
    "kayttajaTunniste" INTEGER NOT NULL,
    "nimi" TEXT NOT NULL,
    "ika" TEXT,
    "paino" TEXT,

    CONSTRAINT "Lemmikki_pkey" PRIMARY KEY ("tunnisteNro")
);

-- CreateTable
CREATE TABLE "Kissa" (
    "kissaNro" SERIAL NOT NULL,
    "siruNro" TEXT,
    "kissanReferenssi" TEXT NOT NULL,
    "lempinimet" TEXT[],
    "rotu" TEXT,
    "vari" TEXT,
    "turkki" TEXT,
    "luonne" TEXT,
    "rokotukset" TEXT,
    "kuvat" TEXT[],
    "vointiNyt" TEXT,
    "bio" TEXT,

    CONSTRAINT "Kissa_pkey" PRIMARY KEY ("kissaNro")
);

-- CreateTable
CREATE TABLE "Koira" (
    "koiraNro" SERIAL NOT NULL,
    "siruNro" TEXT,
    "referenssiTunniste" TEXT NOT NULL,
    "lempinimet" TEXT[],
    "rotu" TEXT,
    "vari" TEXT,
    "turkki" TEXT,
    "luonne" TEXT,
    "rokotukset" TEXT,
    "kuvat" TEXT[],
    "vointiNyt" TEXT,
    "bio" TEXT,

    CONSTRAINT "Koira_pkey" PRIMARY KEY ("koiraNro")
);

-- CreateTable
CREATE TABLE "Hevonen" (
    "hevonenNro" SERIAL NOT NULL,
    "siruNro" TEXT,
    "referenssiTunniste" TEXT NOT NULL,
    "lempinimet" TEXT[],
    "rotu" TEXT,
    "vari" TEXT,
    "turkki" TEXT,
    "luonne" TEXT,
    "rokotukset" TEXT,
    "kuvat" TEXT[],
    "vointiNyt" TEXT,
    "elamankaari" TEXT,

    CONSTRAINT "Hevonen_pkey" PRIMARY KEY ("hevonenNro")
);

-- CreateTable
CREATE TABLE "Rokote" (
    "tunnisteNro" TEXT NOT NULL,
    "rokotteenNimi" TEXT,
    "rokotettavanNimi" TEXT NOT NULL,
    "rokotettavanTunniste" INTEGER NOT NULL,
    "rokotettavaElain" "ElainLaji" NOT NULL,
    "rokotettavanPainoPistopvm" TIMESTAMP(3),
    "rokotteenHinta" TEXT,
    "rokotteenTyyppi" TEXT,
    "rokotteenValmistaja" TEXT,
    "rokotteenEra" TEXT,
    "rokotteenPvm" TIMESTAMP(3),
    "rokoteVaste" TEXT,
    "haittavaikutukset" TEXT,
    "haittaSkaala" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Rokote_pkey" PRIMARY KEY ("tunnisteNro")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kayttaja_satunnaisTunniste_key" ON "Kayttaja"("satunnaisTunniste");

-- CreateIndex
CREATE UNIQUE INDEX "Kayttaja_email_key" ON "Kayttaja"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profiili_kayttajaTunniste_key" ON "Profiili"("kayttajaTunniste");

-- CreateIndex
CREATE UNIQUE INDEX "Lemmikki_referenssiAvain_key" ON "Lemmikki"("referenssiAvain");

-- CreateIndex
CREATE UNIQUE INDEX "Lemmikki_nimi_key" ON "Lemmikki"("nimi");

-- CreateIndex
CREATE UNIQUE INDEX "Kissa_siruNro_key" ON "Kissa"("siruNro");

-- CreateIndex
CREATE UNIQUE INDEX "Kissa_kissanReferenssi_key" ON "Kissa"("kissanReferenssi");

-- CreateIndex
CREATE UNIQUE INDEX "Koira_siruNro_key" ON "Koira"("siruNro");

-- CreateIndex
CREATE UNIQUE INDEX "Koira_referenssiTunniste_key" ON "Koira"("referenssiTunniste");

-- CreateIndex
CREATE UNIQUE INDEX "Hevonen_siruNro_key" ON "Hevonen"("siruNro");

-- CreateIndex
CREATE UNIQUE INDEX "Hevonen_referenssiTunniste_key" ON "Hevonen"("referenssiTunniste");

-- AddForeignKey
ALTER TABLE "Profiili" ADD CONSTRAINT "Profiili_kayttajaTunniste_fkey" FOREIGN KEY ("kayttajaTunniste") REFERENCES "Kayttaja"("satunnaisTunniste") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lemmikki" ADD CONSTRAINT "Lemmikki_kayttajaTunniste_fkey" FOREIGN KEY ("kayttajaTunniste") REFERENCES "Kayttaja"("tunniste") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kissa" ADD CONSTRAINT "Kissa_kissanReferenssi_fkey" FOREIGN KEY ("kissanReferenssi") REFERENCES "Lemmikki"("referenssiAvain") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Koira" ADD CONSTRAINT "Koira_referenssiTunniste_fkey" FOREIGN KEY ("referenssiTunniste") REFERENCES "Lemmikki"("referenssiAvain") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hevonen" ADD CONSTRAINT "Hevonen_referenssiTunniste_fkey" FOREIGN KEY ("referenssiTunniste") REFERENCES "Lemmikki"("referenssiAvain") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rokote" ADD CONSTRAINT "Rokote_rokotettavanTunniste_kissa_fkey" FOREIGN KEY ("rokotettavanTunniste") REFERENCES "Kissa"("kissaNro") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rokote" ADD CONSTRAINT "Rokote_rokotettavanTunniste_koira_fkey" FOREIGN KEY ("rokotettavanTunniste") REFERENCES "Koira"("koiraNro") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rokote" ADD CONSTRAINT "Rokote_rokotettavanTunniste_hevonen_fkey" FOREIGN KEY ("rokotettavanTunniste") REFERENCES "Hevonen"("hevonenNro") ON DELETE RESTRICT ON UPDATE CASCADE;
