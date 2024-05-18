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

export const createNewUser = async (
  formState: UserFormState,
  data: FormData
) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const email = data.get("email");
  const password = data.get("password");

  console.log(email, password);
};
