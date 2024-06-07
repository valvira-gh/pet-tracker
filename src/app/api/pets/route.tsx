"use server";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data";
import { JwtPayload } from "jsonwebtoken";

/**
 * Defines the schema for the 'Pet' object.
 * The 'Pet' object represents the pet data stored in the database.
 * Extract the user's id from the JWT token and use it as a reference key: 'ownerId'.
 * @param id - The unique identifier for the pet.
 * @param ownerId - The unique identifier for the pet owner.
 * @param referenceKey - The unique reference key for the pet.
 */

const PetsSchema = z.object({
  id: z.number(),
  referenceKey: z.string(),
  species: z.enum(["dog", "cat", "horse", "rabbit", "chicken", "sheep"]),
  ownerId: z.string(),
  name: z.string().min(2).max(100),
  age: z.string().min(1).max(2),
});

export const GET = async (request: NextRequest) => {
  // Fetch the 'Authorization' header from the incoming request
};
