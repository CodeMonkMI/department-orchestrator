import { BaseService } from "@/lib/core/service/BaseService";
import { SemesterRepository } from "@/repository/semester.repository";
import { SemesterSelector } from "@/selectors/semester.selector";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class SemesterService extends BaseService<Prisma.SemesterDelegate> {
  constructor(repository: SemesterRepository, selector: SemesterSelector) {
    super(repository, selector);
  }
}

export const SemesterServiceToken = Symbol("SemesterServiceToken");
