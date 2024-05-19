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

export const createNewUser = async (
  formState: UserFormState,
  data: FormData
) => {
  // validation process:
  // 1. initialize conditions for formData object
  const newUserSchema = z.object({
    email: z.string().email().max(200),
    password: z.string().min(8).max(200),
  });

  // 2. use the schema to parse the formData object
  const result = await newUserSchema.safeParseAsync({
    email: data.get("email"),
    password: data.get("password"),
  });

  if (!result.success) {
    return {
      message: "There were an error occured while validation process.",
    };
  }

  let newUser: User;
  try {
    // if validation passes, create new user in the database
    newUser = await db.user.create({
      data: {
        email: result.data.email,
        password: result.data.password,
      },
    });
  } catch (error: unknown) {
    return error;
  }

  revalidatePath("/user-auth");
  redirect("/user-auth");
};
