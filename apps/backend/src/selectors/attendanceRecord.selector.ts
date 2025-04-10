import { BaseSelector } from "@/lib/core/selector/BaseSelector";
import { Prisma } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
export class AttendanceRecordSelector extends BaseSelector<Prisma.AttendanceRecordDelegate> {
  public getBase(): Prisma.Args<
    Prisma.AttendanceRecordDelegate,
    "findMany"
  >["select"] {
    return {
      id: true,
      checkInTime: true,
      checkOutTime: true,
      date: true,
      status: true,
      notes: true,
      userId: true,
    };
  }
}
