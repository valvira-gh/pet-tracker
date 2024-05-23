// src/lib/profile-actions.ts
import { db } from "./data";
import { z } from "zod";

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const users = await fetch(`${apiUrl}/api/users`).then((res) => res.json());

  return users.map((user: { id: string }) => ({
    id: user.id.toString(),
  }));
}

// Määritä profiiliskema Zod-kirjaston avulla
const profileSchema = z.object({
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  age: z.number(),
});

// Lomaketila-rajapinta
interface ProfileFormState {
  errors: {
    firstName?: string[];
    lastName?: string[];
    age?: string[];
    _form?: string[];
  };
}

// Asynkroninen palvelinpuolen toiminto profiilitietojen lisäämiseksi
export const addProfileDataAction = async (
  formState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> => {
  // Validointi
  const result = profileSchema.safeParse({
    firstName: formData.get("first-name"),
    lastName: formData.get("last-name"),
    age: Number(formData.get("age")), // Muunna age numeroksi
  });

  // Jos validointi epäonnistuu, palauta virheet
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let profile;
  try {
    // Jos validointi onnistuu, luo uusi profiili tietokantaan
    profile = await db.profile.create({
      data: {
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        age: result.data.age,
        userEmail: formData.get("email") as string, // Oletetaan, että email annetaan formData:ssa
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      throw error;
    }
  }

  return { errors: {} };
};
