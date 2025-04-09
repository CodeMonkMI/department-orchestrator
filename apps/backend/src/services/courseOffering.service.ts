import { BaseService } from "@/lib/core/service/BaseService";
import { CourseOfferingRepository } from "@/repository/courseOffering.repository";
import { CourseOfferingSelector } from "@/selectors/courseOffering.selector";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class CourseOfferingService extends BaseService<Prisma.CourseOfferingDelegate> {
  constructor(repository: CourseOfferingRepository, selector: CourseOfferingSelector) {
    super(repository, selector);
  }
}

export const CourseOfferingServiceToken = Symbol("CourseOfferingServiceToken");
