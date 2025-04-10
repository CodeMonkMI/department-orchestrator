import { BaseService } from "@/lib/core/service/BaseService";
import { TeacherCourseAssignmentRepository } from "@/repository/teacherCourseAssignment.repository";
import { TeacherCourseAssignmentSelector } from "@/selectors/teacherCourseAssignment.selector";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class TeacherCourseAssignmentService extends BaseService<Prisma.TeacherCourseAssignmentDelegate> {
  constructor(repository: TeacherCourseAssignmentRepository, selector: TeacherCourseAssignmentSelector) {
    super(repository, selector);
  }
}

export const TeacherCourseAssignmentServiceToken = Symbol("TeacherCourseAssignmentServiceToken");
