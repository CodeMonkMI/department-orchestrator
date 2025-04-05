import { BaseService } from "@/lib/core/service/BaseService";
import { RoleRepository } from "@/repository/role.repository";
import { RoleSelector } from "@/selectors/role.selector";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class RoleService extends BaseService<Prisma.RoleDelegate> {
  constructor(repository: RoleRepository, selector: RoleSelector) {
    super(repository, selector);
  }
}

export const RoleServiceToken = Symbol("RoleServiceToken");
