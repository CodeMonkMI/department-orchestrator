import { TaskService } from "@/services/task.service";
import { UserService } from "@/services/user.service";
import { TaskPriorityEnum, TaskStatusEnum } from "@prisma/client";
import { singleton } from "tsyringe";
import { z } from "zod";

@singleton()
export class TaskSchema {
  constructor(
    protected userService: UserService,
    protected taskService: TaskService
  ) {}
  public createDTO() {
    return z.object({
      title: z
        .string({ message: "Title is required!" })
        .min(1, { message: "Title is required!" }),
      description: z.string().optional(),
      assignedTo: z
        .string({ message: "Assignee is required!" })
        .min(1, { message: "Assignee is required!" })
        .refine(
          async (id) => {
            const user = await this.userService.findByID(id);
            return !!user;
          },
          { message: "Assignee user does not exist!" }
        ),
      assignedBy: z
        .string({ message: "Assigner is required!" })
        .min(1, { message: "Assigner is required!" })
        .refine(
          async (id) => {
            const user = await this.userService.findByID(id);
            return !!user;
          },
          { message: "Assigner user does not exist!" }
        ),
      dueDate: z
        .string()
        .min(1, { message: "Due date is required!" })
        .transform((val) => new Date(val))
        .pipe(z.date({ message: "Due date date must e valid date" })),
      priority: z
        .nativeEnum(TaskPriorityEnum, {
          message: "Priority must be a valid value",
        })
        .default(TaskPriorityEnum.MEDIUM),
      status: z
        .nativeEnum(TaskStatusEnum, {
          message: "Status must be a valid value",
        })
        .default(TaskStatusEnum.PENDING),
    });
  }

  public updateDTO(taskId: string) {
    return z
      .object({
        title: z
          .string({ message: "Title is required!" })
          .min(1, { message: "Title is required!" }),
        description: z.string().optional(),
        assignedTo: z
          .string({ message: "Assignee is required!" })
          .min(1, { message: "Assignee is required!" })
          .refine(
            async (id) => {
              const user = await this.userService.findByID(id);
              return !!user;
            },
            { message: "Assignee user does not exist!" }
          ),
        dueDate: z
          .string()
          .min(1, { message: "Due date is required!" })
          .transform((val) => new Date(val))
          .pipe(z.date({ message: "Due date must be a valid date" })),
        priority: z.nativeEnum(TaskPriorityEnum, {
          message: "Priority must be a valid TaskPriorityEnum value",
        }),
        status: z.nativeEnum(TaskStatusEnum, {
          message: "Status must be a valid TaskStatusEnum value",
        }),
      })
      .partial()
      .refine(
        async () => {
          const task = await this.taskService.findByID(taskId);
          return !!task;
        },
        { message: "Task does not exist!" }
      );
  }
}
