import { z } from "zod";

 export  const SignInValidation = z.object({
    email: z.string().email( {
      message: "Invalid Email Address",
    }),
    password: z.string().min(6, {
      message: "Email must be at least 6 characters.",
    }),
  });