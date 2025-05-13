import { z } from "zod";
export enum SemesterTypeEnum {
  ACADEMIC = "ACADEMIC",
  NONACADEMIC = "NONACADEMIC",
}

export class SemesterSchema {
  public static get createDTO() {
    return z.object({
      name: z
        .string({ message: "Name is required!" })
        .min(1, { message: "Name is required!" }),
      type: z
        .nativeEnum(SemesterTypeEnum)
        .default(SemesterTypeEnum.ACADEMIC)
        .optional(),
      maxStudents: z
        .string({ message: "maxStudents is required!" })
        .min(1, { message: "maxStudents is required!" })
        .refine(
          (data) => {
            return parseInt(data);
          },
          { message: "maxStudents must be a number" }
        ),
      maxCourses: z
        .string({ message: "maxCourses is required!" })
        .min(1, { message: "maxCourses is required!" })
        .refine(
          (data) => {
            return parseInt(data);
          },
          { message: "maxCourses must be a number" }
        ),
    });
  }

  public static get updateDTO() {
    return z
      .object({
        name: z
          .string({ message: "Name is required!" })
          .min(1, { message: "Name is required!" }),
        type: z
          .nativeEnum(SemesterTypeEnum)
          .default(SemesterTypeEnum.ACADEMIC)
          .optional(),
        maxStudents: z
          .number({ message: "maxStudents is required!" })
          .min(1, { message: "maxStudents is required!" }),
        maxCourses: z
          .number({ message: "maxCourses is required!" })
          .min(1, { message: "maxCourses is required!" }),
      })
      .partial();
  }
}
