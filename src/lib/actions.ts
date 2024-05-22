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

// CREATE USER //
type FormState = {
  message: string;
};

// validation terms that data must pass
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(200),
});

export const createUser = async (formState: FormState, data: FormData) => {
  // test data against 'userSchema'
  const result = userSchema.safeParse({
    email: data.get("email"),
    password: data.get("password"),
  });
  // result now contains an object that has properties
  // success: true / false && data: { email: matti@gmail.com, password: salasana }
  console.log(result);

  if (!result.success) {
    return {
      message: "Given inputs does not pass validation.",
    };
  }

  let user: User;
  try {
    user = await db.user.create({
      data: {
        email: result.data.email,
        password: result.data.password,
      },
    });
  } catch (error: unknown) {
    return error;
  }

  revalidatePath("/");
  redirect("/");
  return {
    message: "New user added successfully!",
  };
};

// GET LOGGED USER
export const fetchLoggedUser = async () => {
  const token = await localStorage.getItem("token");

  if (!token) {
    console.error("No token found, please log in first.");
    return;
  }

  return token;
};
