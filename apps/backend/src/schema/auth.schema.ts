import { singleton } from "tsyringe";
import { z } from "zod";

@singleton()
export class AuthSchema {
  private static instance: AuthSchema;
  public loginDTO() {
    return z.object({
      email: z
        .string({ message: "Email is required" })
        .min(1, { message: "Email is required" }),
      password: z
        .string({ message: "Password is required" })
        .min(1, { message: "Password is required" }),
    });
  }

  public static getInstance() {
    if (!AuthSchema.instance) {
      AuthSchema.instance = new AuthSchema();
    }
    return AuthSchema.instance;
  }
}
