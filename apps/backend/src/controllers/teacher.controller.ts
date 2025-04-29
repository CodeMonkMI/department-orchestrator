import { Controller } from "@/lib/core/decorator/controller.decorator";
import { Use } from "@/lib/core/decorator/middleware.decorator";
import {
  DELETE,
  GET,
  PATCH,
  POST,
} from "@/lib/core/decorator/router.decorator";
import { authMiddleware } from "@/middleware/passport/passport";
import { TeacherSchema } from "@/schema/teacher.schema";
import { TeacherService } from "@/services/teacher.service";
import { NextFunction, Request, Response } from "express";
import { autoInjectable } from "tsyringe";

@autoInjectable()
@Controller("/api/v1/teacher")
@Use(authMiddleware.authenticate)
export class TeacherController {
  constructor(
    readonly teacherService: TeacherService,
    protected schema: TeacherSchema
  ) {}

  @GET("/")
  async find(_req: Request, res: Response, _next: NextFunction) {
    const data = await this.teacherService.find();
    return res.status(200).json(data);
  }
  @GET("/:id")
  async single(req: Request, res: Response, _next: NextFunction) {
    const data = await this.teacherService.findByID(req.params.id);
    return res.status(200).json(data);
  }

  @POST("/")
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedData = this.schema.createDTO().safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json(parsedData.error.errors);
      }
      const newData = await this.teacherService.create(parsedData.data);
      return res.status(200).json(newData);
    } catch (error) {
      return next(error);
    }
  }
  @PATCH("/:id")
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedData = this.schema.updateDTO().safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json(parsedData.error.errors);
      }
      const id = req.params.id;
      // find if student is exist or not
      const find = await this.teacherService.findByID(id);
      if (!find)
        throw this.teacherService.generateError(
          "Invalid request! Data not found",
          404
        );

      const newData = await this.teacherService.update(id, parsedData.data);
      return res.status(200).json(newData);
    } catch (error) {
      return next(error);
    }
  }
  @DELETE("/:id")
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      // find if student is exist or not
      const find = await this.teacherService.findByID(id);
      if (!find)
        throw this.teacherService.generateError(
          "Invalid request! Data not found!",
          404
        );

      await this.teacherService.delete(req.params.id);
      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  }
}

export const TeacherControllerToken = Symbol("TeacherControllerToken");
