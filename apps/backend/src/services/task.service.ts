import { BaseService } from "@/lib/core/service/BaseService";
import { TaskRepository } from "@/repository/task.repository";
import { TaskSelector } from "@/selectors/task.selector";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class TaskService extends BaseService<Prisma.TaskDelegate> {
  constructor(repository: TaskRepository, selector: TaskSelector) {
    super(repository, selector);
  }
}

export const TaskServiceToken = Symbol("TaskServiceToken");
