import { BaseService } from "@/lib/core/service/BaseService";
import { TeacherRepository } from "@/repository/teacher.repository";
import { TeacherSelector } from "@/selectors/teacher.selector";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class TeacherService extends BaseService<Prisma.TeacherDelegate> {
  constructor(repository: TeacherRepository, selector: TeacherSelector) {
    super(repository, selector);
  }
}

export const TeacherServiceToken = Symbol("TeacherServiceToken");
