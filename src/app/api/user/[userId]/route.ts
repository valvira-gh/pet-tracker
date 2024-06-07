"use server";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { db } from "@/lib/data";

const prisma = new PrismaClient();

export const GET = async (
  request: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const { userId } = params;

  try {
    const pets = await prisma.pet.findMany({
      where: { ownerId: userId },
    });

    if (!pets || pets.length === 0) {
      return NextResponse.json(
        { message: "Käyttäjällä ei vielä ole lemmikkejä rekisteröitynä." },
        { status: 404 }
      );
    }

    return NextResponse.json(pets);
  } catch (err: unknown) {
    console.error("Error fetching pets: ", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
