import { RoleEnum } from "@prisma/client";
import { singleton } from "tsyringe";
import { z } from "zod";

@singleton()
export class RoleSchema {
  private static instance: RoleSchema;
  public base() {
    return z.object({
      email: z
        .string({ message: "Email is required" })
        .min(1, { message: "Email is required" }),
      password: z
        .string({ message: "Password is required" })
        .min(1, { message: "Password is required" }),
    });
  }
  public roleDTO() {
    return z.object({
      name: z
        .string({ message: "Name is required" })
        .min(1, { message: "Name is required" }),
      role: z.nativeEnum(RoleEnum, { message: "Role must be valid!" }),
    });
  }
  public roleUpdateDTO() {
    return z.object({
      name: z
        .string({ message: "Name is required" })
        .min(1, { message: "Name is required" }),
    });
  }

  public static getInstance() {
    if (!RoleSchema.instance) {
      RoleSchema.instance = new RoleSchema();
    }
    return RoleSchema.instance;
  }
}
