import { BaseSelector } from "@/lib/core/selector/BaseSelector";
import { Prisma } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
export class UserSelector extends BaseSelector<Prisma.UserDelegate> {
  public getBase() {
    return {
      id: true,
      fullname: true,
      username: true,
      email: true,
      title: true,
      password: false,
    };
  }
}
