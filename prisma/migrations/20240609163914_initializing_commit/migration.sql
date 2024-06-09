-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'GUEST');

-- CreateEnum
CREATE TYPE "AnimalSpecies" AS ENUM ('CAT', 'DOG', 'HORSE');

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
    "lastLogin" TIMESTAMP(3),
    "lastLogout" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "age" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "refId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" TEXT,
    "species" "AnimalSpecies" NOT NULL DEFAULT 'CAT',

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cat" (
    "id" SERIAL NOT NULL,
    "petId" TEXT NOT NULL,
    "pettyNames" TEXT[],
    "catSubSpecies" TEXT,
    "colorOfHair" TEXT,
    "hair" TEXT,
    "personality" TEXT,
    "healthCheck" TEXT,
    "bio" TEXT,

    CONSTRAINT "Cat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dog" (
    "id" SERIAL NOT NULL,
    "petId" TEXT NOT NULL,
    "pettyNames" TEXT[],
    "dogSubSpecies" TEXT,
    "colorOfHair" TEXT,
    "hair" TEXT,
    "personality" TEXT,
    "healthCheck" TEXT,
    "bio" TEXT,

    CONSTRAINT "Dog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horse" (
    "id" SERIAL NOT NULL,
    "petId" TEXT NOT NULL,
    "pettyNames" TEXT[],
    "horseSubSpecies" TEXT,
    "colorOfHair" TEXT,
    "hair" TEXT,
    "personality" TEXT,
    "healthCheck" TEXT,
    "bio" TEXT,

    CONSTRAINT "Horse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_randomId_key" ON "User"("randomId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_refId_key" ON "Pet"("refId");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_name_key" ON "Pet"("name");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("randomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("randomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cat" ADD CONSTRAINT "Cat_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("refId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dog" ADD CONSTRAINT "Dog_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("refId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horse" ADD CONSTRAINT "Horse_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("refId") ON DELETE RESTRICT ON UPDATE CASCADE;
