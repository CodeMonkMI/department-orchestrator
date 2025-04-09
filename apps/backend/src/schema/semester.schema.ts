import { SemesterTypeEnum } from "@prisma/client";
import { singleton } from "tsyringe";
import { z } from "zod";

@singleton()
export class SemesterSchema {
  public createDTO() {
    return z.object({
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
    });
  }

  public updateDTO() {
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
