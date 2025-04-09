import { CourseOfferingService } from "@/services/courseOffering.service";
import { CourseScheduleService } from "@/services/courseSchedule.service";
import { RoomService } from "@/services/room.service";
import { TeacherService } from "@/services/teacher.service";
import { DayOfWeekEnum } from "@prisma/client";
import { singleton } from "tsyringe";
import { z } from "zod";

@singleton()
export class CourseScheduleSchema {
  constructor(
    protected csService: CourseScheduleService,
    protected roomService: RoomService,
    protected teacherService: TeacherService,
    protected coService: CourseOfferingService
  ) {}
  public createDTO() {
    return z.object({
      courseOfferingId: z
        .string()
        .min(1, "courseOfferingId is required")
        .refine(
          async (id) => {
            const co = await this.coService.findByID(id);
            return !!co;
          },
          { message: "Room does not exist" }
        ),
      dayOfWeek: z.nativeEnum(DayOfWeekEnum, {
        message: "Day of week is required",
      }),
      startTime: z
        .string()
        .min(1, { message: "startTime is required!" })
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
          message: "Start time must be in HH:mm format",
        }),
      endTime: z
        .string()
        .min(1, { message: "startTime date is required!" })
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
          message: "End time must be in HH:mm format",
        }),
      roomId: z
        .string()
        .min(1, "Room ID is required")
        .refine(
          async (id) => {
            const room = await this.roomService.findByID(id);
            if (room) return id;
            return false;
          },
          { message: "Room does not exist" }
        ),
    });
  }

  public updateDTO(roomId: string) {
    return z
      .object({
        courseOfferingId: z
          .string()
          .min(1, "courseOfferingId is required")
          .refine(
            async (id) => {
              const co = await this.coService.findByID(id);
              return !!co;
            },
            { message: "Course offering does not exist" }
          ),
        dayOfWeek: z.nativeEnum(DayOfWeekEnum, {
          message: "Day of week is required",
        }),
        startTime: z
          .string()
          .min(1, { message: "startTime is required!" })
          .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
            message: "Start time must be in HH:mm format",
          }),
        endTime: z
          .string()
          .min(1, { message: "endTime is required!" })
          .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
            message: "End time must be in HH:mm format",
          }),
        roomId: z
          .string()
          .min(1, "Room ID is required")
          .refine(
            async (id) => {
              const room = await this.roomService.findByID(id);
              return !!room;
            },
            { message: "Room does not exist" }
          ),
      })
      .partial()
      .superRefine(async (data, ctx) => {
        if (Object.keys(data).length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "At least one field must be provided for update",
            fatal: true,
          });
        }
      });
  }
}
