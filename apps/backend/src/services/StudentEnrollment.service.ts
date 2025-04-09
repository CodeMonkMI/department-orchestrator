import { BaseService } from "@/lib/core/service/BaseService";
import { StudentEnrollmentRepository } from "@/repository/StudentEnrollment.repository";
import { StudentEnrollmentSelector } from "@/selectors/StudentEnrollment.selector";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class StudentEnrollmentService extends BaseService<Prisma.StudentEnrollmentDelegate> {
  constructor(
    repository: StudentEnrollmentRepository,
    selector: StudentEnrollmentSelector
  ) {
    super(repository, selector);
  }
}

export const StudentEnrollmentServiceToken = Symbol(
  "StudentEnrollmentServiceToken"
);
