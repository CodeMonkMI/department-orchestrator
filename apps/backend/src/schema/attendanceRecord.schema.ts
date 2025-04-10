import { AttendanceRecordService } from "@/services/attendanceRecord.service";
import { CourseOfferingService } from "@/services/courseOffering.service";
import { UserService } from "@/services/user.service";
import { AttendanceStatusEnum } from "@prisma/client";
import { singleton } from "tsyringe";
import { z } from "zod";

@singleton()
export class AttendanceRecordSchema {
  constructor(
    protected coService: CourseOfferingService,
    protected userService: UserService,
    protected atdService: AttendanceRecordService
  ) {}
  public createDTO() {
    return z.object({
      userId: z
        .string({ message: "User ID is required!" })
        .min(1, { message: "User ID is required!" })
        .refine(
          async (userId) => {
            const find = await this.userService.findByID(userId);
            if (!find) return false;
            return userId;
          },
          {
            message: "User must be valid!",
          }
        ),
      date: z
        .string()
        .min(1, { message: "Enrollment date is required!" })
        .transform((val) => new Date(val))
        .pipe(z.date({ message: "Enrollment date must e valid date" })),
      status: z.nativeEnum(AttendanceStatusEnum, {
        message: "Status must be a valid value",
      }),
      checkInTime: z
        .string()
        .min(1, { message: "Enrollment date is required!" })
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
          message: "Check in time must be in HH:mm format",
        }),
      checkOutTime: z
        .string()
        .min(1, { message: "Enrollment date is required!" })
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
          message: "Checkout time must be in HH:mm format",
        }),
      courseOfferingId: z
        .string({ message: "Course Offering ID is required!" })
        .min(1, { message: "Course Offering ID is required!" })
        .refine(
          async (id) => {
            const co = await this.coService.findByID(id);
            return !!co;
          },
          { message: "Course offering does not exist" }
        ),
      notes: z.string().optional(),
    });
  }

  public updateDTO(id: string) {
    return z
      .object({
        date: z
          .string()
          .min(1, { message: "Date is required!" })
          .transform((val) => new Date(val))
          .pipe(z.date({ message: "Date must be valid" })),
        status: z.nativeEnum(AttendanceStatusEnum, {
          message: "Status must be a valid value",
        }),
        checkInTime: z
          .string()
          .min(1, { message: "Check-in time is required!" })
          .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
            message: "Check-in time must be in HH:mm format",
          }),
        checkOutTime: z
          .string()
          .min(1, { message: "Check-out time is required!" })
          .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
            message: "Check-out time must be in HH:mm format",
          }),
        notes: z.string().optional(),
      })
      .partial()
      .refine(
        async () => {
          const attendance = await this.atdService.findByID(id);
          return !!attendance;
        },
        {
          message: "Attendance record does not exist",
        }
      );
  }
}
