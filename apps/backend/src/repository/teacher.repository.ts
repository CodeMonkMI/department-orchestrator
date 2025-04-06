import { BaseRepository } from "@/lib/core/repository/BaseRepository";
import { DatabaseClientPool } from "@/lib/db/DatabaseClientPool";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class TeacherRepository extends BaseRepository<Prisma.TeacherDelegate> {
  constructor(database: DatabaseClientPool) {
    super(database, "teacher");
  }
}
