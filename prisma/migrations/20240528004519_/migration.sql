-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastLoggedInAt" TIMESTAMP(3),
ADD COLUMN     "lastLoggedOutAt" TIMESTAMP(3);
