import { BaseRepository } from "@/lib/core/repository/BaseRepository";
import { DatabaseClientPool } from "@/lib/db/DatabaseClientPool";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class CourseRepository extends BaseRepository<Prisma.CourseDelegate> {
  constructor(database: DatabaseClientPool) {
    super(database, "course");
  }
}
