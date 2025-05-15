import { z } from "zod";

enum CourseTypeEnum {
  ELECTIVE = "ELECTIVE",
  REQUIRED = "REQUIRED",
}

export class CourseSchema {
  public static createDTO() {
    return z.object({
      code: z
        .string({ message: "code is required" })
        .min(4, { message: "Code must at least 4 characters" }),
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

  public static updateDTO() {
    return z
      .object({
        code: z
          .string({ message: "code is required" })
          .min(4, { message: "Code must at least 4 characters" }),
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
