import { BaseSelector } from "@/lib/core/selector/BaseSelector";
import { Prisma } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
export class SemesterSelector extends BaseSelector<Prisma.SemesterDelegate> {
  public getBase(): Prisma.Args<Prisma.SemesterDelegate, "findMany">["select"] {
    return {
      id: true,
      name: true,
      type: true,
      maxStudents: true,
      maxCourses: true,
    };
  }
}
