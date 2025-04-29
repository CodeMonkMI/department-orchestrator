import { Token } from "@/helpers/Token";
import { BaseService } from "@/lib/core/service/BaseService";
import { UserRepository } from "@/repository/user.repository";
import { AuthSchema } from "@/schema/auth.schema";
import { UserSelector } from "@/selectors/user.selector";
import { Prisma } from "@prisma/client";
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
      const findUser = await this.findOne({
        email: data.email,
      });

      const token = this.token.generateToken({
        id: findUser!.id,
        email: findUser!.email,
        username: findUser!.username,
      });

      return token;
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
