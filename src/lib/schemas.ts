import { z } from "zod";

export const userSchema = z.object({
  email: z
    .string({
      required_error: "Email is required.",
      invalid_type_error: "Email must be a string.",
    })
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "Password is required.",
      invalid_type_error: "Error with the type of given password input.",
    })
    .min(8, {
      message: "Password must be 8 or more characters long.",
    })
    .max(200, {
      message: "Password can't be more than 200 character long.",
    }),
});
