import { Controller } from "@/lib/core/decorator/controller.decorator";
import {
  DELETE,
  GET,
  PATCH,
  POST,
} from "@/lib/core/decorator/router.decorator";
import { CourseSchema } from "@/schema/course.schema";
import { CourseService } from "@/services/course.service";
import { NextFunction, Request, Response } from "express";
import { autoInjectable } from "tsyringe";

@autoInjectable()
@Controller("/api/v1/course")
export class CourseController {
  constructor(
    readonly courseService: CourseService,
    protected schema: CourseSchema
  ) {}

  @GET("/")
  async find(_req: Request, res: Response, _next: NextFunction) {
    const data = await this.courseService.find();
    return res.status(200).json(data);
  }

  @GET("/:id")
  async single(req: Request, res: Response, _next: NextFunction) {
    const data = await this.courseService.findByID(req.params.id);
    return res.status(200).json(data);
  }

  @POST("/")
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedData = await this.schema.createDTO().safeParseAsync(req.body);
      if (!parsedData.success) {
        return res.status(400).json(parsedData.error.errors);
      }

      const newData = await this.courseService.create(parsedData.data);
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
      // find if enrolment is exist or not
      const findData = await this.courseService.findByID(id);
      if (!findData)
        throw this.courseService.generateError(
          "Invalid request! Data not found",
          404
        );

      const findCourses = await this.courseService.find({
        code: parsedData.data.code,
      });

      if (findCourses.length > 0 && findCourses[0].id !== id) {
        throw this.courseService.generateError(
          "Invalid request! Code is already exist!",
          400
        );
      }

      const newData = await this.courseService.update(id, parsedData.data);
      return res.status(200).json(newData);
    } catch (error) {
      return next(error);
    }
  }

  @DELETE("/:id")
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      // find if enrolment is exist or not
      const findData = await this.courseService.findByID(id);
      if (!findData)
        throw this.courseService.generateError(
          "Invalid request! Data not found!",
          404
        );

      await this.courseService.delete(req.params.id);
      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  }
}

export const CourseControllerToken = Symbol("CourseControllerToken");
