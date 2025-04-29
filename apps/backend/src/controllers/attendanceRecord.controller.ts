import { Controller } from "@/lib/core/decorator/controller.decorator";
import { Use } from "@/lib/core/decorator/middleware.decorator";
import {
  DELETE,
  GET,
  PATCH,
  POST,
} from "@/lib/core/decorator/router.decorator";
import { authMiddleware } from "@/middleware/passport/passport";
import { AttendanceRecordSchema } from "@/schema/attendanceRecord.schema";
import { AttendanceRecordService } from "@/services/attendanceRecord.service";
import { NextFunction, Request, Response } from "express";
import { autoInjectable } from "tsyringe";

@autoInjectable()
@Controller("/api/v1/attendance")
@Use(authMiddleware.authenticate)
export class AttendanceRecordController {
  constructor(
    readonly attendanceRecordService: AttendanceRecordService,
    protected schema: AttendanceRecordSchema
  ) {}

  @GET("/")
  async find(_req: Request, res: Response, _next: NextFunction) {
    const data = await this.attendanceRecordService.find();
    return res.status(200).json(data);
  }

  @GET("/:id")
  async single(req: Request, res: Response, _next: NextFunction) {
    const data = await this.attendanceRecordService.findByID(req.params.id);
    return res.status(200).json(data);
  }

  @POST("/")
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedData = await this.schema.createDTO().safeParseAsync(req.body);

      if (!parsedData.success) {
        return res.status(400).json(parsedData.error.errors);
      }

      const newData = await this.attendanceRecordService.create(
        parsedData.data
      );
      return res.status(201).json(newData);
    } catch (error) {
      return next(error);
    }
  }

  @PATCH("/:id")
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const parsedData = await this.schema
        .updateDTO(id)
        .safeParseAsync(req.body);
      if (!parsedData.success) {
        return res.status(400).json(parsedData.error.errors);
      }

      const newData = await this.attendanceRecordService.update(
        id,
        parsedData.data
      );
      return res.status(202).json(newData);
    } catch (error) {
      return next(error);
    }
  }

  @DELETE("/:id")
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      // find if attendance record exists or not
      const findRecord = await this.attendanceRecordService.findByID(id);
      if (!findRecord)
        throw this.attendanceRecordService.generateError(
          "Invalid request! Attendance record not found!",
          404
        );

      await this.attendanceRecordService.delete(req.params.id);
      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  }
}

export const AttendanceRecordControllerToken = Symbol(
  "AttendanceRecordControllerToken"
);
