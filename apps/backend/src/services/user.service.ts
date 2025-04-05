import { Password } from "@/helpers/Password";
import { BaseService } from "@/lib/core/service/BaseService";
import { UserRepository } from "@/repository/user.repository";
import { UserSelector } from "@/selectors/user.selector";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";
import { RoleService } from "./role.service";

type UserDelegate = Prisma.UserDelegate;

@autoInjectable()
export class UserService extends BaseService<UserDelegate> {
  constructor(
    repository: UserRepository,
    readonly selector: UserSelector,
    readonly roleService: RoleService
  ) {
    // its required to be here
    super(repository, selector);
  }

  async create(
    data: Prisma.Args<UserDelegate, "create">["data"]
  ): Promise<
    Prisma.Result<
      UserDelegate,
      { data: Prisma.Args<UserDelegate, "create">["data"] },
      "create"
    >
  > {
    try {
      // check if user role is exist
      const findRole = await this.roleService.findByID(data.roleId!!);
      if (!findRole) {
        throw this.generateError("Invalid role!", 400);
      }
      // check if email and username is already exists
      const findUser = await this.repository.findOne({
        where: { OR: [{ email: data.email }, { username: data.username }] },
      });

      if (findUser) {
        throw this.generateError("Email or username already exists", 400);
      }

      const hashPassword = Password.hashPassword(data.password);

      return this.repository.create(
        { ...data, password: hashPassword },
        this.selector.getBase() as Prisma.UserSelect
      );
    } catch (error: unknown) {
      if (error && (error as any)?.statusCode) {
        throw error;
      }
      throw this.generateError(`[User service] Create - failed`);
    }
  }
}

export const UserServiceToken = Symbol("UserServiceToken");
