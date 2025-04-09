import { BaseSelector } from "@/lib/core/selector/BaseSelector";
import { Prisma } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
export class CourseScheduleSelector extends BaseSelector<Prisma.CourseScheduleDelegate> {
  public getBase(): Prisma.Args<
    Prisma.CourseScheduleDelegate,
    "findMany"
  >["select"] {
    return {
      id: true,
      courseOfferingId: true,
      dayOfWeek: true,
      endTime: true,
      startTime: true,
      roomId: true,
    };
  }
}
