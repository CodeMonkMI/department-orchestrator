import { BaseSelector } from "@/lib/core/selector/BaseSelector";
import { Prisma } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
export class ActivitySelector extends BaseSelector<Prisma.ActivityDelegate> {}
