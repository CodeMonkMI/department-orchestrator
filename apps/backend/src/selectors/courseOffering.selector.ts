import { BaseSelector } from "@/lib/core/selector/BaseSelector";
import { Prisma } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
export class CourseOfferingSelector extends BaseSelector<Prisma.CourseOfferingDelegate> {
  public getBase(): Prisma.Args<
    Prisma.CourseOfferingDelegate,
    "findMany"
  >["select"] {
    return {
      id: true,
      status: true,
      courseId: true,
      semesterId: true,
      courseAssignmentIds: true,
    };
  }
}
