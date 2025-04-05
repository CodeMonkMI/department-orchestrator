import { BaseRepository } from "@/lib/core/repository/BaseRepository";
import { DatabaseClientPool } from "@/lib/db/DatabaseClientPool";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class RoleRepository extends BaseRepository<Prisma.RoleDelegate> {
  constructor(database: DatabaseClientPool) {
    super(database, "role");
  }
}
