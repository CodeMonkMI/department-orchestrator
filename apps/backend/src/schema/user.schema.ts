import { singleton } from "tsyringe";
import { z } from "zod";

@singleton()
export class UserSchema {
  private static instance: UserSchema;
  private userBase = z.object({
    id: z.string(),
    fullname: z.string().optional(),
    email: z.string(),
    username: z.string(),
    password: z.string(),
    title: z.string(),
  });

  public getBaseUser() {
    return this.userBase;
  }
  public createUser() {
    return z.object({
      fullname: z.string({ message: "Name must be string" }).optional(),
      username: z
        .string({ message: "Username is required!" })
        .min(1, { message: "Username is required!" })
        .min(3, { message: "Username must be at least 3 characters" }),
      email: z
        .string({ message: "Email is required" })
        .min(1, { message: "Email is required" })
        .email({ message: "Email must be valid" }),
      password: z
        .string({ message: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters" }),
      title: z.string({ message: "Title is required!" }),
    });
  }
  public updateUserDTO() {
    return z
      .object({
        fullname: z.string({ message: "Name must be string" }).optional(),
        title: z
          .string({ message: "Title is required!" })
          .min(1, { message: "Title is required!" }),
      })
      .partial();
  }

  public static getInstance() {
    if (!UserSchema.instance) {
      UserSchema.instance = new UserSchema();
    }
    return UserSchema.instance;
  }
}
