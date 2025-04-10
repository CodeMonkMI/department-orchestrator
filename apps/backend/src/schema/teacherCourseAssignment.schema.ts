import { CourseOfferingService } from "@/services/courseOffering.service";
import { CourseScheduleService } from "@/services/courseSchedule.service";
import { TeacherService } from "@/services/teacher.service";
import { TeacherCourseAssignmentService } from "@/services/teacherCourseAssignment.service";
import { TeacherCourseAssignmentStatusEnum } from "@prisma/client";
import { singleton } from "tsyringe";
import { z } from "zod";

@singleton()
export class TeacherCourseAssignmentSchema {
  constructor(
    protected csService: CourseScheduleService,
    protected tca: TeacherCourseAssignmentService,
    protected teacherService: TeacherService,
    protected coService: CourseOfferingService
  ) {}
  public createDTO() {
    return z
      .object({
        teacherId: z
          .string({ message: "Teacher ID is required!" })
          .min(1, { message: "Teacher ID is required!" })
          .refine(
            async (id) => {
              const find = await this.teacherService.findByID(id);
              if (find) return id;
              return false;
            },
            { message: "teacherId must be valid" }
          ),
        courseOfferingId: z
          .string({ message: "Course Offering ID is required!" })
          .min(1, { message: "Course Offering ID is required!" })
          .refine(
            async (id) => {
              const co = await this.coService.findByID(id);
              if (co) return id;
              return false;
            },
            { message: "courseOfferingId does not exist" }
          ),
        assignDate: z
          .string()
          .min(1, { message: "Assign date is required!" })
          .transform((val) => new Date(val))
          .pipe(z.date({ message: "Assign date must e valid date" })),
        status: z.nativeEnum(TeacherCourseAssignmentStatusEnum, {
          message: "Status must be a valid!",
        }),
        grade: z
          .string({ message: "Grade is required!" })
          .min(1, { message: "Grade is required!" }),
      })
      .refine(
        async (data) => {
          const find = await this.tca.findOne({
            teacherId: data.teacherId,
            courseOfferingId: data.courseOfferingId,
          });
          if (find) return false;
          return false;
        },
        { message: "Teacher is already assigned with the course and date" }
      );
  }

  public updateTeacherCourseAssignmentDTO() {
    return z
      .object({
        teacherId: z
          .string({ message: "Teacher ID is required!" })
          .min(1, { message: "Teacher ID is required!" })
          .refine(
            async (id) => {
              const find = await this.teacherService.findByID(id);
              if (find) return id;
              return false;
            },
            { message: "teacherId must be valid" }
          ),
        courseOfferingId: z
          .string({ message: "Course Offering ID is required!" })
          .min(1, { message: "Course Offering ID is required!" })
          .refine(
            async (id) => {
              const co = await this.coService.findByID(id);
              if (co) return id;
              return false;
            },
            { message: "courseOfferingId does not exist" }
          ),
        assignDate: z
          .string()
          .min(1, { message: "Assign date is required!" })
          .transform((val) => new Date(val))
          .pipe(z.date({ message: "Assign date must e valid date" })),
        status: z.nativeEnum(TeacherCourseAssignmentStatusEnum, {
          message: "Status must be a valid!",
        }),
        grade: z
          .string({ message: "Grade is required!" })
          .min(1, { message: "Grade is required!" }),
      })
      .partial()
      .refine(
        async (data) => {
          if (!data.teacherId || !data.courseOfferingId) return true;
          const find = await this.tca.findOne({
            teacherId: data.teacherId,
            courseOfferingId: data.courseOfferingId,
          });
          if (find) return false;
          return true;
        },
        { message: "Teacher is already assigned with the course and date" }
      );
  }
}
