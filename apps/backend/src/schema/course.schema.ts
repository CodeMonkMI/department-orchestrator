import { CourseService } from "@/services/course.service";
import { CourseTypeEnum } from "@prisma/client";
import { singleton } from "tsyringe";
import { z } from "zod";

@singleton()
export class CourseSchema {
  constructor(protected courseService: CourseService) {}
  public createDTO() {
    return z.object({
      code: z
        .string({ message: "code is required" })
        .min(4, { message: "Code must at least 4 characters" })
        .refine(
          async (code) => {
            const findCourse = await this.courseService.findOne({ code });
            if (findCourse) return false;
            return code;
          },
          { message: "Course already exist" }
        ),
      type: z
        .nativeEnum(CourseTypeEnum, { message: "type must be valid" })
        .default(CourseTypeEnum.REQUIRED),
      name: z
        .string({ message: "name is required" })
        .min(1, { message: "name is required" })
        .min(6, { message: "name must at least 6 characters" }),
      description: z
        .string({ message: "description is required" })
        .min(1, { message: "description is required" })
        .max(200, { message: "description must be less than 200 chars" })
        .optional(),
      credits: z
        .number({ message: "credits is required" })
        .min(1, {
          message: "credits must be greater than 0",
        })
        .max(4, { message: "credits must be less than 4" }),
    });
  }

  public updateDTO(courseId: string) {
    return z
      .object({
        code: z
          .string({ message: "code is required" })
          .min(4, { message: "Code must at least 4 characters" })
          .refine(
            async (code) => {
              const findCourses = await this.courseService.find({ code });
              if (findCourses.length === 0) return code;
              if (findCourses?.length > 1) return false;

              if (findCourses?.[0].id !== courseId) return false;
              return code;
            },
            { message: "Course already exist " }
          ),
        type: z.nativeEnum(CourseTypeEnum, { message: "type must be valid" }),
        name: z
          .string({ message: "name is required" })
          .min(1, { message: "name is required" })
          .min(6, { message: "name must at least 6 characters" }),
        description: z
          .string({ message: "description is required" })
          .min(1, { message: "description is required" })
          .max(200, { message: "description must be less than 200 chars" })
          .optional(),
        credits: z
          .number({ message: "credits is required" })
          .min(1, {
            message: "credits must be greater than 0",
          })
          .max(4, { message: "credits must be less than 4" }),
      })
      .partial();
  }
}
