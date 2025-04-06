import { singleton } from "tsyringe";
import { z } from "zod";

@singleton()
export class TeacherSchema {
  private static instance: TeacherSchema;
  private userBase = z.object({
    id: z.string(),
    fullname: z.string().optional(),
    email: z.string(),
    username: z.string(),
    password: z.string(),
    title: z.string(),
  });

  public getBaseUser() {
    return this.userBase;
  }
  public createDTO() {
    return z.object({
      joinDate: z
        .string()
        .min(1, { message: "Enrollment date is required!" })
        .transform((val) => new Date(val))
        .pipe(z.date({ message: "Enrollment date must e valid date" })),
      officeLocation: z
        .string()
        .min(1, { message: "Office Location is required!" }),
      title: z.string().min(1, { message: "Title Year is required!" }),
      userId: z.string().min(1, { message: "User Id is required!" }),
    });
  }

  public updateDTO() {
    return z
      .object({
        joinDate: z
          .string()
          .min(1, { message: "Enrollment date is required!" })
          .transform((val) => new Date(val))
          .pipe(z.date({ message: "Enrollment date must e valid date" })),
        officeLocation: z
          .string()
          .min(1, { message: "Office Location is required!" }),
        title: z.string().min(1, { message: "Title Year is required!" }),
        userId: z.string().min(1, { message: "User Id is required!" }),
      })
      .partial();
  }

  public static getInstance() {
    if (!TeacherSchema.instance) {
      TeacherSchema.instance = new TeacherSchema();
    }
    return TeacherSchema.instance;
  }
}
