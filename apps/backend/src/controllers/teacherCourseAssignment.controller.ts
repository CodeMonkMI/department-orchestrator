import { Controller } from "@/lib/core/decorator/controller.decorator";
import {
  DELETE,
  GET,
  PATCH,
  POST,
} from "@/lib/core/decorator/router.decorator";
import { TeacherCourseAssignmentSchema } from "@/schema/teacherCourseAssignment.schema";
import { TeacherCourseAssignmentService } from "@/services/teacherCourseAssignment.service";
import { NextFunction, Request, Response } from "express";
import { autoInjectable } from "tsyringe";

@autoInjectable()
@Controller("/api/v1/teacher-course-assignment")
export class TeacherCourseAssignmentController {
  constructor(
    readonly teacherCourseAssignmentService: TeacherCourseAssignmentService,
    protected schema: TeacherCourseAssignmentSchema
  ) {}

  @GET("/")
  async find(_req: Request, res: Response, _next: NextFunction) {
    const data = await this.teacherCourseAssignmentService.find();
    return res.status(200).json(data);
  }

  @GET("/:id")
  async single(req: Request, res: Response, _next: NextFunction) {
    const data = await this.teacherCourseAssignmentService.findByID(
      req.params.id
    );
    return res.status(200).json(data);
  }

  @POST("/")
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedData = await this.schema.createDTO().safeParseAsync(req.body);
      if (!parsedData.success) {
        return res.status(400).json(parsedData.error.errors);
      }
      const newData = await this.teacherCourseAssignmentService.create(
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
      const parsedData = this.schema
        .updateTeacherCourseAssignmentDTO()
        .safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json(parsedData.error.errors);
      }
      const id = req.params.id;
      // find if assignment exists or not
      const findAssignment = await this.teacherCourseAssignmentService.findByID(
        id
      );
      if (!findAssignment)
        throw this.teacherCourseAssignmentService.generateError(
          "Invalid request! Assignment not found",
          404
        );

      const newData = await this.teacherCourseAssignmentService.update(
        id,
        parsedData.data
      );
      return res.status(200).json(newData);
    } catch (error) {
      return next(error);
    }
  }

  @DELETE("/:id")
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      // find if assignment exists or not
      const findAssignment = await this.teacherCourseAssignmentService.findByID(
        id
      );
      if (!findAssignment)
        throw this.teacherCourseAssignmentService.generateError(
          "Invalid request! Assignment not found!",
          404
        );

      await this.teacherCourseAssignmentService.delete(req.params.id);
      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  }
}

export const TeacherCourseAssignmentControllerToken = Symbol(
  "TeacherCourseAssignmentControllerToken"
);
