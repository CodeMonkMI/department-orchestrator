import { RoomService } from "@/services/room.service";
import { RoomTypeEnum } from "@prisma/client";
import { singleton } from "tsyringe";
import { z } from "zod";

@singleton()
export class RoomSchema {
  constructor(protected roomService: RoomService) {}
  public createDTO() {
    return z.object({
      name: z.string().min(1, { message: "Name is required" }),
      code: z
        .string()
        .min(1, { message: "Code is required" })
        .refine(
          async (code) => {
            const find = await this.roomService.findOne({ code });
            if (find) return false;
            return code;
          },
          { message: "Code must be unique" }
        ),
      description: z.string().optional(),
      capacity: z
        .number()
        .int()
        .min(1, { message: "Capacity must be at least 1" }),
      type: z.nativeEnum(RoomTypeEnum, { message: "Type must be valid" }),
    });
  }

  public updateDTO(roomId: string) {
    return z
      .object({
        name: z.string().min(1, { message: "Name is required" }),
        code: z
          .string()
          .min(1, { message: "Code is required" })
          .refine(
            async (code) => {
              const find = await this.roomService.findOne({ code });
              if (!find || find.id === roomId) return true;
              return false;
            },
            { message: "Code must be unique" }
          ),
        description: z.string().optional(),
        capacity: z
          .number()
          .int()
          .min(1, { message: "Capacity must be at least 1" }),
        type: z.nativeEnum(RoomTypeEnum, { message: "Type must be valid" }),
      })
      .partial()
      .superRefine(async (data, ctx) => {
        const findEnrolment = await this.roomService.findByID(roomId);

        if (findEnrolment) return data;

        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Room data not found!",
          fatal: true,
        });
      });
  }
}
