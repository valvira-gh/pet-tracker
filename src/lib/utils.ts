import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cache } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUserPets = cache(async (userId: string) => {
  const response = await fetch(`/api/user/${userId}/pets`);

  return response;
});
