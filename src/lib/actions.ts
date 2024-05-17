import { z } from "zod";
import { db } from "@/lib/data";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getUsers = async (): Promise<User[]> => {
  "use server";
  const users = await db.user.findMany();
  return users;

  revalidatePath("/user-auth");
};
