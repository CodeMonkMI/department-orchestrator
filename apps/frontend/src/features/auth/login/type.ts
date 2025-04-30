import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required!" }),
  password: z.string().min(1, { message: "Password is required!" }),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;

export type ZodError = {
  code: string;
  message: string;
  fatal: boolean;
  path: string[];
};
