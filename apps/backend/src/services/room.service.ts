import { BaseService } from "@/lib/core/service/BaseService";
import { RoomRepository } from "@/repository/room.repository";
import { RoomSelector } from "@/selectors/room.selector";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class RoomService extends BaseService<Prisma.RoomDelegate> {
  constructor(repository: RoomRepository, selector: RoomSelector) {
    super(repository, selector);
  }
}

export const RoomServiceToken = Symbol("RoomServiceToken");
