import { BaseRepository } from "@/lib/core/repository/BaseRepository";
import { DatabaseClientPool } from "@/lib/db/DatabaseClientPool";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class ActivityRepository extends BaseRepository<Prisma.ActivityDelegate> {
  constructor(database: DatabaseClientPool) {
    super(database, "activity");
  }
}
