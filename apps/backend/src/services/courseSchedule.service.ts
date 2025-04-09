import { BaseService } from "@/lib/core/service/BaseService";
import { CourseScheduleRepository } from "@/repository/courseSchedule.repository";
import { CourseScheduleSelector } from "@/selectors/courseSchedule.selector";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class CourseScheduleService extends BaseService<Prisma.CourseScheduleDelegate> {
  constructor(repository: CourseScheduleRepository, selector: CourseScheduleSelector) {
    super(repository, selector);
  }
}

export const CourseScheduleServiceToken = Symbol("CourseScheduleServiceToken");
