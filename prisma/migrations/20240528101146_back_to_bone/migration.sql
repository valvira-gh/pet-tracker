/*
  Warnings:

  - You are about to drop the `Hevonen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Kayttaja` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Kissa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Koira` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lemmikki` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profiili` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rokote` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'GUEST');

-- CreateEnum
CREATE TYPE "AnimalSpecies" AS ENUM ('KISSA', 'KOIRA', 'HEVONEN');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'BLANK');

-- DropForeignKey
ALTER TABLE "Hevonen" DROP CONSTRAINT "Hevonen_referenssiTunniste_fkey";

-- DropForeignKey
ALTER TABLE "Kissa" DROP CONSTRAINT "Kissa_kissanReferenssi_fkey";

-- DropForeignKey
ALTER TABLE "Koira" DROP CONSTRAINT "Koira_referenssiTunniste_fkey";

-- DropForeignKey
ALTER TABLE "Lemmikki" DROP CONSTRAINT "Lemmikki_kayttajaTunniste_fkey";

-- DropForeignKey
ALTER TABLE "Profiili" DROP CONSTRAINT "Profiili_kayttajaTunniste_fkey";

-- DropForeignKey
ALTER TABLE "Rokote" DROP CONSTRAINT "Rokote_rokotettavanTunniste_hevonen_fkey";

-- DropForeignKey
ALTER TABLE "Rokote" DROP CONSTRAINT "Rokote_rokotettavanTunniste_kissa_fkey";

-- DropForeignKey
ALTER TABLE "Rokote" DROP CONSTRAINT "Rokote_rokotettavanTunniste_koira_fkey";

-- DropTable
DROP TABLE "Hevonen";

-- DropTable
DROP TABLE "Kayttaja";

-- DropTable
DROP TABLE "Kissa";

-- DropTable
DROP TABLE "Koira";

-- DropTable
DROP TABLE "Lemmikki";

-- DropTable
DROP TABLE "Profiili";

-- DropTable
DROP TABLE "Rokote";

-- DropEnum
DROP TYPE "ElainLaji";

-- DropEnum
DROP TYPE "Rooli";

-- DropEnum
DROP TYPE "Sukupuoli";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "randomId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cryptedPassword" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isLogged" BOOLEAN NOT NULL DEFAULT false,
    "userCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userUpdatedAt" TIMESTAMP(3) NOT NULL,
    "lastTimeWhenLoggedIn" TIMESTAMP(3),
    "lastTimeWhenLoggedOut" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "age" TEXT,
    "sex" "Sex",
    "luomisLeima" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "muutosLeima" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "referenceKey" TEXT NOT NULL,
    "species" "AnimalSpecies" NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" TEXT,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cat" (
    "id" SERIAL NOT NULL,
    "microchipSerialCode" TEXT,
    "catReference" TEXT NOT NULL,
    "pettyNames" TEXT[],
    "catSubSpecies" TEXT,
    "colorOfHair" TEXT,
    "hair" TEXT,
    "personality" TEXT,
    "images" TEXT[],
    "healthCheck" TEXT,
    "bio" TEXT,

    CONSTRAINT "Cat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dog" (
    "id" SERIAL NOT NULL,
    "microchipSerialCode" TEXT,
    "dogReference" TEXT NOT NULL,
    "pettyNames" TEXT[],
    "dogSubSpecies" TEXT,
    "colorOfHair" TEXT,
    "hair" TEXT,
    "personality" TEXT,
    "images" TEXT[],
    "healthCheck" TEXT,
    "bio" TEXT,

    CONSTRAINT "Dog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horse" (
    "id" SERIAL NOT NULL,
    "microchipSerialCode" TEXT,
    "horseReference" TEXT NOT NULL,
    "pettyNames" TEXT[],
    "horseSubSpecies" TEXT,
    "colorOfHair" TEXT,
    "hair" TEXT,
    "personality" TEXT,
    "images" TEXT[],
    "healthCheck" TEXT,
    "bio" TEXT,

    CONSTRAINT "Horse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vaccine" (
    "identifierNumber" TEXT NOT NULL,
    "vaccineName" TEXT,
    "vaccinatedName" TEXT NOT NULL,
    "vaccinatedIdentifier" TEXT NOT NULL,
    "vaccinatedAnimal" "AnimalSpecies" NOT NULL,
    "vaccinatedWeightAtTimeOfInjection" TIMESTAMP(3),
    "vaccinePrice" TEXT,
    "vaccineType" TEXT,
    "vaccineManufacturer" TEXT,
    "vaccineBatch" TEXT,
    "vaccineDate" TIMESTAMP(3),
    "vaccineResponse" TEXT,
    "sideEffects" TEXT,
    "sideEffectScale" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Vaccine_pkey" PRIMARY KEY ("identifierNumber")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_randomId_key" ON "User"("randomId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_referenceKey_key" ON "Pet"("referenceKey");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_name_key" ON "Pet"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cat_microchipSerialCode_key" ON "Cat"("microchipSerialCode");

-- CreateIndex
CREATE UNIQUE INDEX "Cat_catReference_key" ON "Cat"("catReference");

-- CreateIndex
CREATE UNIQUE INDEX "Dog_microchipSerialCode_key" ON "Dog"("microchipSerialCode");

-- CreateIndex
CREATE UNIQUE INDEX "Dog_dogReference_key" ON "Dog"("dogReference");

-- CreateIndex
CREATE UNIQUE INDEX "Horse_microchipSerialCode_key" ON "Horse"("microchipSerialCode");

-- CreateIndex
CREATE UNIQUE INDEX "Horse_horseReference_key" ON "Horse"("horseReference");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("randomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("randomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cat" ADD CONSTRAINT "Cat_catReference_fkey" FOREIGN KEY ("catReference") REFERENCES "Pet"("referenceKey") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dog" ADD CONSTRAINT "Dog_dogReference_fkey" FOREIGN KEY ("dogReference") REFERENCES "Pet"("referenceKey") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horse" ADD CONSTRAINT "Horse_horseReference_fkey" FOREIGN KEY ("horseReference") REFERENCES "Pet"("referenceKey") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vaccine" ADD CONSTRAINT "Vaccine_vaccinatedIdentifier_cat_fkey" FOREIGN KEY ("vaccinatedIdentifier") REFERENCES "Cat"("catReference") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vaccine" ADD CONSTRAINT "Vaccine_vaccinatedIdentifier_dog_fkey" FOREIGN KEY ("vaccinatedIdentifier") REFERENCES "Dog"("dogReference") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vaccine" ADD CONSTRAINT "Vaccine_vaccinatedIdentifier_horse_fkey" FOREIGN KEY ("vaccinatedIdentifier") REFERENCES "Horse"("horseReference") ON DELETE RESTRICT ON UPDATE CASCADE;
