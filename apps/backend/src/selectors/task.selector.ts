import { BaseSelector } from "@/lib/core/selector/BaseSelector";
import { Prisma } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
export class TaskSelector extends BaseSelector<Prisma.TaskDelegate> {
  public getBase(): Prisma.Args<Prisma.TaskDelegate, "findMany">["select"] {
    return {
      id: true,
      dueDate: true,
      title: true,
      description: true,
      priority: true,
      status: true,
      assignedBy: true,
      assignedTo: true,
      createdAt: true,
      updatedAt: true,
    };
  }
}
