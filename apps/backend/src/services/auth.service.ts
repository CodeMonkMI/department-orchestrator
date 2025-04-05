import { Token } from "@/helpers/Token";
import { BaseService } from "@/lib/core/service/BaseService";
import { UserRepository } from "@/repository/user.repository";
import { AuthSchema } from "@/schema/auth.schema";
import { UserSelector } from "@/selectors/user.selector";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { autoInjectable } from "tsyringe";
import { z } from "zod";

@autoInjectable()
export class AuthService extends BaseService<Prisma.UserDelegate> {
  constructor(
    repository: UserRepository,
    selector: UserSelector,
    protected schema: AuthSchema,
    readonly token: Token
  ) {
    super(repository, selector);
  }
  async login(data: z.infer<ReturnType<typeof this.schema.loginDTO>>) {
    try {
      // check if user exists
      const findUser = await this.repository.findOne({
        where: {
          email: data.email,
        },
      });
      if (!findUser) {
        throw this.generateError("Invalid username or password!", 400);
      }

      const isPasswordValid = bcrypt.compareSync(
        data.password,
        findUser.password
      );

      if (!isPasswordValid) {
        throw this.generateError("Invalid username or password!", 400);
      }

      const token = this.token.generateToken({
        id: findUser.id,
        email: findUser.email,
        username: findUser.username,
      });

      const resData = {
        message: "Login successful!",
        data: { token },
      };
      return resData;
    } catch (error) {
      if (error && (error as any)?.statusCode) {
        throw error;
      }
      console.log(error);
      throw new Error(`[Auth service] Login - failed`);
    }
  }
}

export const AuthServiceToken = Symbol("AuthServiceToken");
