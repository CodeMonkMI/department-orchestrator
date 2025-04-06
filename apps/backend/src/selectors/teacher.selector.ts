import { BaseSelector } from "@/lib/core/selector/BaseSelector";
import { Prisma } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
export class TeacherSelector extends BaseSelector<Prisma.TeacherDelegate> {
  public getBase(): Prisma.Args<Prisma.TeacherDelegate, "findMany">["select"] {
    return {
      id: true,
      status: true,
      joinDate: true,
      officeLocation: true,
      title: true,
      user: {
        select: {
          id: true,
          fullname: true,
          username: true,
          email: true,
          title: true,
        },
      },
    };
  }
}
