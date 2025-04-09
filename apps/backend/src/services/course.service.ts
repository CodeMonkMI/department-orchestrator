import { BaseService } from "@/lib/core/service/BaseService";
import { CourseRepository } from "@/repository/course.repository";
import { CourseSelector } from "@/selectors/course.selector";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class CourseService extends BaseService<Prisma.CourseDelegate> {
  constructor(repository: CourseRepository, selector: CourseSelector) {
    super(repository, selector);
  }
}

export const CourseServiceToken = Symbol("CourseServiceToken");
