import { BaseService } from "@/lib/core/service/BaseService";
import { ActivityRepository } from "@/repository/activity.repository";
import { ActivitySelector } from "@/selectors/activity.selector";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class ActivityService extends BaseService<Prisma.ActivityDelegate> {
  constructor(repository: ActivityRepository, selector: ActivitySelector) {
    super(repository, selector);
  }
}

export const ActivityServiceToken = Symbol("ActivityServiceToken");
