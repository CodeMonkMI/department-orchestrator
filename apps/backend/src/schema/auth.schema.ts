import { UserService } from "@/services/user.service";
import bcrypt from "bcryptjs";
import { singleton } from "tsyringe";
import { z } from "zod";

@singleton()
export class AuthSchema {
  constructor(protected useService: UserService) {}
  public loginDTO() {
    return z
      .object({
        email: z
          .string({ message: "Email is required" })
          .min(1, { message: "Email is required" })
          .refine(
            async (email) => {
              const findUser = await this.useService.findOne({ email });
              if (!findUser) return false;
              return email;
            },
            { message: "Invalid username or password!" }
          ),
        password: z
          .string({ message: "Password is required" })
          .min(1, { message: "Password is required" }),
      })

      .superRefine(async (data, ctx) => {
        if (!data.email) return false;
        const findUser = await this.useService.findWithPassword(data.email);
        if (!findUser) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid username or password!",
            fatal: true,
            path: ["email", "username"],
          });
          return;
        }

        const isPasswordValid = bcrypt.compareSync(
          data.password,
          findUser.password
        );
        if (!isPasswordValid) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid username or password!",
            fatal: true,
            path: ["email", "username"],
          });
          return;
        }

        return data;
      });
  }
}
