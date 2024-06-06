/*
  Warnings:

  - You are about to drop the column `luomisLeima` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `muutosLeima` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `lastTimeWhenLoggedIn` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastTimeWhenLoggedOut` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "luomisLeima",
DROP COLUMN "muutosLeima",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastTimeWhenLoggedIn",
DROP COLUMN "lastTimeWhenLoggedOut",
ADD COLUMN     "lastLogin" TIMESTAMP(3),
ADD COLUMN     "lastLogout" TIMESTAMP(3);
