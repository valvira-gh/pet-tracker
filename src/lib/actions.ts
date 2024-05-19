import { db } from "@/lib/data";
import { User } from "@prisma/client";
import { notFound } from "next/navigation";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
// GET USERS //
export const fetchUsers = async (): Promise<User[]> => {
  return await db.user.findMany();
};

// POST USER //
type UserFormState = {
  message: string;
};

type NewUser = {
  email: string;
  password: string;
};
