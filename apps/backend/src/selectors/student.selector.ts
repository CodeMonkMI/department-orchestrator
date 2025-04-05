import { BaseSelector } from "@/lib/core/selector/BaseSelector";
import { Prisma } from "@prisma/client";
import { singleton } from "tsyringe";
import { UserSelector } from "./user.selector";

@singleton()
export class StudentSelector extends BaseSelector<Prisma.StudentDelegate> {
  constructor(protected userSelector: UserSelector) {
    super();
  }
  public getBase(): Prisma.Args<Prisma.StudentDelegate, "findMany">["select"] {
    return {
      id: true,
      status: true,
      rollNumber: true,
      session: true,
      graduationYear: true,
      registrationNo: true,
      startingDate: true,
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
