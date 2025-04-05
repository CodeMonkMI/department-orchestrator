import { BaseRepository } from "@/lib/core/repository/BaseRepository";
import { DatabaseClientPool } from "@/lib/db/DatabaseClientPool";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class StudentRepository extends BaseRepository<Prisma.StudentDelegate> {
  constructor(database: DatabaseClientPool) {
    super(database, "student");
  }
}
