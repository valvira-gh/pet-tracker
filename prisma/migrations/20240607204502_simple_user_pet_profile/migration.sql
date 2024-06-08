/*
  Warnings:

  - You are about to drop the column `referenceKey` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `species` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `sex` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `Cat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Horse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vaccine` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[refId]` on the table `Pet` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Cat" DROP CONSTRAINT "Cat_catReference_fkey";

-- DropForeignKey
ALTER TABLE "Dog" DROP CONSTRAINT "Dog_dogReference_fkey";

-- DropForeignKey
ALTER TABLE "Horse" DROP CONSTRAINT "Horse_horseReference_fkey";

-- DropForeignKey
ALTER TABLE "Vaccine" DROP CONSTRAINT "Vaccine_vaccinatedIdentifier_cat_fkey";

-- DropForeignKey
ALTER TABLE "Vaccine" DROP CONSTRAINT "Vaccine_vaccinatedIdentifier_dog_fkey";

-- DropForeignKey
ALTER TABLE "Vaccine" DROP CONSTRAINT "Vaccine_vaccinatedIdentifier_horse_fkey";

-- DropIndex
DROP INDEX "Pet_referenceKey_key";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "referenceKey",
DROP COLUMN "species",
ADD COLUMN     "refId" TEXT;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "sex";

-- DropTable
DROP TABLE "Cat";

-- DropTable
DROP TABLE "Dog";

-- DropTable
DROP TABLE "Horse";

-- DropTable
DROP TABLE "Vaccine";

-- DropEnum
DROP TYPE "AnimalSpecies";

-- DropEnum
DROP TYPE "Sex";

-- CreateIndex
CREATE UNIQUE INDEX "Pet_refId_key" ON "Pet"("refId");
