import { BaseSelector } from "@/lib/core/selector/BaseSelector";
import { Prisma } from "@prisma/client";
import { injectable } from "tsyringe";
import { RoleSelector } from "./role.selector";

@injectable()
export class UserSelector extends BaseSelector<Prisma.UserDelegate> {
  constructor(protected roleSelector: RoleSelector) {
    super();
  }
  public getBase() {
    return {
      id: true,
      fullname: true,
      username: true,
      email: true,
      title: true,
      password: false,
      Role: true,
    };
  }
}
