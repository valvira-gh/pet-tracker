/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[secretId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - The required column `secretId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userEmail_fkey";

-- DropIndex
DROP INDEX "Profile_userEmail_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "userEmail",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isLogged" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "secretId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_secretId_key" ON "User"("secretId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("secretId") ON DELETE RESTRICT ON UPDATE CASCADE;
