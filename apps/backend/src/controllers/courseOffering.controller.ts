import { Controller } from "@/lib/core/decorator/controller.decorator";
import { Use } from "@/lib/core/decorator/middleware.decorator";
import {
  DELETE,
  GET,
  PATCH,
  POST,
} from "@/lib/core/decorator/router.decorator";
import { authMiddleware } from "@/middleware/passport/passport";
import { CourseOfferingSchema } from "@/schema/courseOffering.schema";
import { CourseOfferingService } from "@/services/courseOffering.service";
import { NextFunction, Request, Response } from "express";
import { autoInjectable } from "tsyringe";

@autoInjectable()
@Controller("/api/v1/course-offering")
@Use(authMiddleware.authenticate)
export class CourseOfferingController {
  constructor(
    readonly courseOfferingService: CourseOfferingService,
    protected schema: CourseOfferingSchema
  ) {}

  @GET("/")
  async find(_req: Request, res: Response, _next: NextFunction) {
    const data = await this.courseOfferingService.find();
    return res.status(200).json(data);
  }

  @GET("/:id")
  async single(req: Request, res: Response, _next: NextFunction) {
    const data = await this.courseOfferingService.findByID(req.params.id);
    return res.status(200).json(data);
  }

  @POST("/")
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedData = await this.schema.createDTO().safeParseAsync(req.body);
      if (!parsedData.success) {
        return res.status(400).json(parsedData.error.errors);
      }

      const findCourse = await this.courseOfferingService.find({
        courseId: parsedData.data.courseId,
        semesterId: parsedData.data.semesterId,
      });

      if (findCourse.length > 0) {
        return res.status(201).json(findCourse[0]);
      }

      const newData = await this.courseOfferingService.create(parsedData.data);
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

      const newData = await this.courseOfferingService.update(
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
      // find if enrolment is exist or not
      const findData = await this.courseOfferingService.findByID(id);
      if (!findData)
        throw this.courseOfferingService.generateError(
          "Invalid request! Data not found!",
          404
        );

      await this.courseOfferingService.delete(req.params.id);
      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  }
}

export const CourseOfferingControllerToken = Symbol(
  "CourseOfferingControllerToken"
);
