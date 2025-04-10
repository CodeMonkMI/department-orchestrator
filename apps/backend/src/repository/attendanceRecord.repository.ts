import { BaseRepository } from "@/lib/core/repository/BaseRepository";
import { DatabaseClientPool } from "@/lib/db/DatabaseClientPool";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class AttendanceRecordRepository extends BaseRepository<Prisma.AttendanceRecordDelegate> {
  constructor(database: DatabaseClientPool) {
    super(database, "attendanceRecord");
  }
}
