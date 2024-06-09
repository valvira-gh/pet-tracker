"use server";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (
    request: NextRequest,
    { params }: { params: { petId: string } }
) => {
    const { petId } = params;

    console.log("Backend API GET call, petId: ", petId)
    return;
}
