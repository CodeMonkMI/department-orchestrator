import { BaseService } from "@/lib/core/service/BaseService";
import { ReportRepository } from "@/repository/report.repository";
import { ReportSelector } from "@/selectors/report.selector";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class ReportService extends BaseService<Prisma.ReportDelegate> {
  constructor(repository: ReportRepository, selector: ReportSelector) {
    super(repository, selector);
  }
}

export const ReportServiceToken = Symbol("ReportServiceToken");
