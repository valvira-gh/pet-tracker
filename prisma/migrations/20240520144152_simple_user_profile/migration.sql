/*
  Warnings:

  - You are about to drop the column `bio` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Cat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Horse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cat" DROP CONSTRAINT "Cat_petId_fkey";

-- DropForeignKey
ALTER TABLE "Dog" DROP CONSTRAINT "Dog_petId_fkey";

-- DropForeignKey
ALTER TABLE "Horse" DROP CONSTRAINT "Horse_petId_fkey";

-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropIndex
DROP INDEX "Profile_userId_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "bio",
DROP COLUMN "userId",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "sex" TEXT,
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropTable
DROP TABLE "Cat";

-- DropTable
DROP TABLE "Dog";

-- DropTable
DROP TABLE "Horse";

-- DropTable
DROP TABLE "Pet";

-- DropTable
DROP TABLE "Test";

-- DropEnum
DROP TYPE "Animal";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "Unit";

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userEmail_key" ON "Profile"("userEmail");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
