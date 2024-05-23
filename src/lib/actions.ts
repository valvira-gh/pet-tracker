import { db } from "@/lib/data";
import { User } from "@prisma/client";
import { notFound } from "next/navigation";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// GET USER //

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

// generateStaticParams
type UserDataTypes = {
  id: number;
  email: string;
};

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const users = await fetch(`${apiUrl}/api/users`).then((res) => res.json());

  console.log("Fetched users: ", users);

  return users.map((user: UserDataTypes) => ({
    slug: user.id.toString(),
  }));
}

// addProfileData action
type ProfileFormState = {
  message: string;
};

export const addProfileDataAction = async (
  prevState: FormState,
  data: FormData
) => {
  // Process the data
  return {
    message: "Profile form data processed.",
  };
};

// LOG OUT //

export const logoutUser = async (): Promise<string> => {
  const token = localStorage.getItem("token");
  console.log("Before: ", token);

  if (token) {
    localStorage.removeItem("token");
  }

  const tokenAfter = localStorage.getItem("token");
  console.log("After: ", tokenAfter);

  if (tokenAfter) {
    return "Token still in localStorage";
  } else {
    return "Token removed from localStorage.";
  }
};
