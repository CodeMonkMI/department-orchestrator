import { BaseSelector } from "@/lib/core/selector/BaseSelector";
import { Prisma } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
export class StudentEnrollmentSelector extends BaseSelector<Prisma.StudentEnrollmentDelegate> {
  public getBase(): Prisma.Args<
    Prisma.StudentEnrollmentDelegate,
    "findMany"
  >["select"] {
    return {
      id: true,
      enrollmentDate: true,
      status: true,
      grade: true,
      studentId: true,
      courseOfferingId: true,
    };
  }
}
