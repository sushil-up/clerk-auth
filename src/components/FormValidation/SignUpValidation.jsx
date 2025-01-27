import { z } from "zod";

export const SignUpValidation = z.object({
    email: z.string().email( {
      message: "Invalid Email Address",
    }),
    firstName: z.string().min(4, {
      message: "Name must be at least 4 characters.",
    }),
    lastName: z.string().min(4, {
      message: "Name must be at least 4 characters.",
    }),
    username: z.string().min(4, {
      message: "Email must be at least 4 characters.",
    }),
    password: z.string().min(6, {
      message: "Email must be at least 6 characters.",
    }),
  });