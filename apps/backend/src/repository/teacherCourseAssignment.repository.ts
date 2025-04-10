import { BaseRepository } from "@/lib/core/repository/BaseRepository";
import { DatabaseClientPool } from "@/lib/db/DatabaseClientPool";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class TeacherCourseAssignmentRepository extends BaseRepository<Prisma.TeacherCourseAssignmentDelegate> {
  constructor(database: DatabaseClientPool) {
    super(database, "teacherCourseAssignment");
  }
}
