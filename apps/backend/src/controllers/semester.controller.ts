import { Controller } from "@/lib/core/decorator/controller.decorator";
import {
  DELETE,
  GET,
  PATCH,
  POST,
} from "@/lib/core/decorator/router.decorator";
import { SemesterSchema } from "@/schema/semester.schema";
import { SemesterService } from "@/services/semester.service";
import { NextFunction, Request, Response } from "express";
import { autoInjectable } from "tsyringe";

@autoInjectable()
@Controller("/api/v1/semester")
export class SemesterController {
  constructor(
    readonly semesterService: SemesterService,
    protected schema: SemesterSchema
  ) {}

  @GET("/")
  async find(_req: Request, res: Response, _next: NextFunction) {
    const data = await this.semesterService.find();
    return res.status(200).json(data);
  }

  @GET("/:id")
  async single(req: Request, res: Response, _next: NextFunction) {
    const data = await this.semesterService.findByID(req.params.id);
    return res.status(200).json(data);
  }

  @POST("/")
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedData = this.schema.createDTO().safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json(parsedData.error.errors);
      }

      const newData = await this.semesterService.create(parsedData.data);
      return res.status(201).json(newData);
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
      // find if enrolment is exist or not
      const findData = await this.semesterService.findByID(id);
      if (!findData)
        throw this.semesterService.generateError(
          "Invalid request! Data not found",
          404
        );

      const newData = await this.semesterService.update(id, parsedData.data);
      return res.status(202).json(newData);
    } catch (error) {
      return next(error);
    }
  }

  @DELETE("/:id")
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      // find if enrolment is exist or not
      const findData = await this.semesterService.findByID(id);
      if (!findData)
        throw this.semesterService.generateError(
          "Invalid request! Data not found!",
          404
        );

      await this.semesterService.delete(req.params.id);
      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  }
}

export const SemesterControllerToken = Symbol("SemesterControllerToken");
