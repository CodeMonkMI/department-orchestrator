import { CourseService } from "@/services/course.service";
import { CourseOfferingService } from "@/services/courseOffering.service";
import { StudentService } from "@/services/student.service";
import { StudentEnrollmentService } from "@/services/StudentEnrollment.service";
import { singleton } from "tsyringe";
import { z } from "zod";

@singleton()
export class StudentEnrollmentSchema {
  constructor(
    protected readonly stdEnrollService: StudentEnrollmentService,
    protected readonly studentService: StudentService,
    protected readonly courseOfferingService: CourseOfferingService,
    protected readonly courseService: CourseService
  ) {}

  public createDTO() {
    return z
      .object({
        studentId: z
          .string()
          .min(1, { message: "Student Id is required!" })
          .refine(
            async (studentId) => {
              const findStudent = await this.studentService.findByID(studentId);
              if (!findStudent) return false;
              return studentId;
            },
            { message: "studentId must be valid" }
          ),
        courseOfferingId: z
          .string()
          .min(1, { message: "Course offering Id is required!" })
          .refine(
            async (courseOfferingId) => {
              const findCourseOffer = await this.courseOfferingService.findByID(
                courseOfferingId
              );
              if (!findCourseOffer) return false;

              return [courseOfferingId, findCourseOffer.courseId];
            },
            {
              message: "courseOfferingId is invalid ",
            }
          )
          .refine(
            async ([courseOfferingId, courseId]) => {
              const findCourse = await this.courseService.findByID(courseId);

              if (findCourse?.type === "ELECTIVE") return false;
              return courseOfferingId;
            },
            {
              message: "This offered course is not elective!",
            }
          ),
        enrollmentDate: z
          .string()
          .min(1, { message: "Enrollment date is required!" })
          .transform((val) => new Date(val))
          .pipe(z.date({ message: "Enrollment date must e valid date" })),
      })
      .refine(
        async (data) => {
          const findEnrolment = await this.stdEnrollService.findOne({
            studentId: data.studentId,
            courseOfferingId: data.courseOfferingId,
          });

          if (findEnrolment) return false;

          return data;
        },
        {
          message: "This user already enrolled in this offered course!",
        }
      );
  }

  public updateDTO(enrollId: string) {
    return z
      .object({
        studentId: z
          .string()
          .min(1, { message: "Student Id is required!" })
          .refine(
            async (studentId) => {
              const findStudent = await this.studentService.findByID(studentId);
              if (!findStudent) return false;
              return studentId;
            },
            { message: "studentId must be valid" }
          ),
        courseOfferingId: z
          .string()
          .min(1, { message: "Course offering Id is required!" })
          .refine(
            async (courseOfferingId) => {
              const findCourseOffer = await this.courseOfferingService.findByID(
                courseOfferingId
              );
              if (!findCourseOffer) return false;

              return [courseOfferingId, findCourseOffer.courseId];
            },
            {
              message: "courseOfferingId is invalid ",
            }
          )
          .refine(
            async ([courseOfferingId, courseId]) => {
              const findCourse = await this.courseService.findByID(courseId);

              if (findCourse?.type === "ELECTIVE") return false;
              return courseOfferingId;
            },
            {
              message: "This offered course is not elective!",
            }
          ),
        enrollmentDate: z
          .string()
          .min(1, { message: "Enrollment date is required!" })
          .transform((val) => new Date(val))
          .pipe(z.date({ message: "Enrollment date must e valid date" })),
      })
      .superRefine(async (data, ctx) => {
        const findEnrolment = await this.stdEnrollService.findByID(enrollId);

        if (findEnrolment) return data;

        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enrollment data not found! aa",
          fatal: true,
        });
      })
      .refine(
        async (data) => {
          const findEnrolment = await this.stdEnrollService.findOne({
            studentId: data.studentId,
            courseOfferingId: data.courseOfferingId,
          });

          if (findEnrolment && findEnrolment.id !== enrollId) return false;

          return data;
        },
        {
          message: "This user already enrolled in this offered course!",
        }
      );
  }
}
