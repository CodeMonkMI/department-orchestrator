import { BaseService } from "@/lib/core/service/BaseService";
import { AttendanceRecordRepository } from "@/repository/attendanceRecord.repository";
import { AttendanceRecordSelector } from "@/selectors/attendanceRecord.selector";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class AttendanceRecordService extends BaseService<Prisma.AttendanceRecordDelegate> {
  constructor(repository: AttendanceRecordRepository, selector: AttendanceRecordSelector) {
    super(repository, selector);
  }
}

export const AttendanceRecordServiceToken = Symbol("AttendanceRecordServiceToken");
