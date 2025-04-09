import { BaseSelector } from "@/lib/core/selector/BaseSelector";
import { Prisma } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
export class CourseSelector extends BaseSelector<Prisma.CourseDelegate> {
  public getBase(): Prisma.Args<Prisma.CourseDelegate, "findMany">["select"] {
    return {
      id: true,
      code: true,
      type: true,
      name: true,
      description: true,
      credits: true,
    };
  }
}
