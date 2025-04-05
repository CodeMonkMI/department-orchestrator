import { singleton } from "tsyringe";
import { z } from "zod";

@singleton()
export class StudentSchema {
  private static instance: StudentSchema;
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
      startingDate: z
        .string()
        .min(1, { message: "Enrollment date is required!" })
        .transform((val) => new Date(val))
        .pipe(z.date({ message: "Enrollment date must e valid date" })),
      session: z.string().min(1, { message: "Session is required!" }),
      graduationYear: z
        .number()
        .min(1, { message: "Graduation Year is required!" }),
      userId: z.string().min(1, { message: "User Id is required!" }),
      rollNumber: z.string().min(1, { message: "Roll number is required!" }),
      registrationNo: z
        .string()
        .min(1, { message: "Registration number is required!" }),
    });
  }

  public updateDTO() {
    return z
      .object({
        startingDate: z
          .string()
          .min(1, { message: "Enrollment date is required!" })
          .transform((val) => new Date(val))
          .pipe(z.date({ message: "Enrollment date must e valid date" })),
        session: z.string().min(1, { message: "Session is required!" }),
        graduationYear: z
          .number()
          .min(1, { message: "Graduation Year is required!" }),
        rollNumber: z.string().min(1, { message: "Roll number is required!" }),
        registrationNo: z
          .string()
          .min(1, { message: "Registration number is required!" }),
      })
      .partial();
  }

  public static getInstance() {
    if (!StudentSchema.instance) {
      StudentSchema.instance = new StudentSchema();
    }
    return StudentSchema.instance;
  }
}
