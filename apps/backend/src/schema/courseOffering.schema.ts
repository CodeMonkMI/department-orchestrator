import { CourseService } from "@/services/course.service";
import { CourseOfferingService } from "@/services/courseOffering.service";
import { SemesterService } from "@/services/semester.service";
import { CourseOfferingStatus } from "@prisma/client";
import { singleton } from "tsyringe";
import { z } from "zod";

@singleton()
export class CourseOfferingSchema {
  constructor(
    protected courseService: CourseService,
    protected semesterService: SemesterService,
    protected courseOfferService: CourseOfferingService
  ) {}
  public createDTO() {
    return z
      .object({
        courseId: z.string({ message: "courseId is required" }).refine(
          async (courseId) => {
            const findCourse = await this.courseService.findByID(courseId);
            if (!findCourse) return false;
            return courseId;
          },
          { message: "courseId must be valid" }
        ),
        semesterId: z.string({ message: "semesterId is required" }).refine(
          async (semesterId) => {
            const findCourse = await this.semesterService.findByID(semesterId);
            if (!findCourse) return false;
            return semesterId;
          },
          { message: "semesterId must be valid" }
        ),
        status: z.nativeEnum(CourseOfferingStatus, {
          message: "status must be valid",
        }),
      })
      .refine(
        async (data) => {
          const findCourse = await this.courseOfferService.find({
            courseId: data.courseId,
            semesterId: data.semesterId,
          });
          console.log(findCourse);
          if (findCourse.length === 0) return true;
          return false;
        },
        {
          message: "Course is already offered in this semester",
          path: ["courseId", "semesterId"],
        }
      );
  }

  public updateDTO(id: string) {
    return z
      .object({
        courseId: z.string({ message: "courseId is required" }).refine(
          async (courseId) => {
            const findCourse = await this.courseService.findByID(courseId);
            if (!findCourse) return false;
            return courseId;
          },
          { message: "courseId must be valid" }
        ),
        semesterId: z.string({ message: "semesterId is required" }).refine(
          async (semesterId) => {
            const findCourse = await this.semesterService.findByID(semesterId);
            if (!findCourse) return false;
            return semesterId;
          },
          { message: "semesterId must be valid" }
        ),
        status: z.nativeEnum(CourseOfferingStatus, {
          message: "status must be valid",
        }),
      })
      .partial()
      .refine(
        async (data) => {
          if (!data.courseId || !data.semesterId) return data;
          const findCourse = await this.courseOfferService.find({
            courseId: data.courseId,
            semesterId: data.semesterId,
          });
          if (findCourse.length === 0) return data;
          if (findCourse.length === 1 && findCourse[0].id === id) return data;
          return false;
        },
        {
          message: "Course is already offered in this semester",
          path: ["courseId", "semesterId"],
        }
      );
  }
}
