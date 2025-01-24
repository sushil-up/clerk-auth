const { z } = require("zod");

export const VerifactionValidation = z.object({
    code: z.string().min(6, {
    message: "Verification code must be 6 character long",
  }),
});