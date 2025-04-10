import { BaseSelector } from "@/lib/core/selector/BaseSelector";
import { Prisma } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
export class ReportSelector extends BaseSelector<Prisma.ReportDelegate> {
  public getBase(): Prisma.Args<Prisma.ReportDelegate, "findMany">["select"] {
    return {
      id: true,
    };
  }
}
