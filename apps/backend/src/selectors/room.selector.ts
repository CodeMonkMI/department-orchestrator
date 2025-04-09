import { BaseSelector } from "@/lib/core/selector/BaseSelector";
import { Prisma } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
export class RoomSelector extends BaseSelector<Prisma.RoomDelegate> {
  public getBase(): Prisma.Args<Prisma.RoomDelegate, "findMany">["select"] {
    return {
      id: true,
      capacity: true,
      code: true,
      type: true,
      name: true,
      description: true,
    };
  }
}
