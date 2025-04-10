import { BaseSelector } from "@/lib/core/selector/BaseSelector";
import { Prisma } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
export class TeacherCourseAssignmentSelector extends BaseSelector<Prisma.TeacherCourseAssignmentDelegate> {
  public getBase(): Prisma.Args<
    Prisma.TeacherCourseAssignmentDelegate,
    "findMany"
  >["select"] {
    return {
      id: true,
      assignDate: true,
      grade: true,
      status: true,
      teacherId: true,
      courseOfferingId: true,
    };
  }
}
