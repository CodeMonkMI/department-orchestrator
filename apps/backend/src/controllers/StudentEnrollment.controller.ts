import { Controller } from "@/lib/core/decorator/controller.decorator";
import { Use } from "@/lib/core/decorator/middleware.decorator";
import { DELETE, GET, POST, PUT } from "@/lib/core/decorator/router.decorator";
import { authMiddleware } from "@/middleware/passport/passport";
import { StudentEnrollmentSchema } from "@/schema/studentEnrolement.schema";
import { StudentService } from "@/services/student.service";
import { StudentEnrollmentService } from "@/services/StudentEnrollment.service";
import { NextFunction, Request, Response } from "express";
import { autoInjectable } from "tsyringe";

@autoInjectable()
@Controller("/api/v1/student-enrollment")
@Use(authMiddleware.authenticate)
export class StudentEnrollmentController {
  constructor(
    readonly studentEnrollmentService: StudentEnrollmentService,
    protected schema: StudentEnrollmentSchema,
    protected studentService: StudentService
  ) {}

  @GET("/")
  async find(_req: Request, res: Response, _next: NextFunction) {
    const data = await this.studentEnrollmentService.find();
    return res.status(200).json(data);
  }
  @GET("/:id")
  async single(req: Request, res: Response, _next: NextFunction) {
    const data = await this.studentEnrollmentService.findByID(req.params.id);
    return res.status(200).json(data);
  }

  @POST("/")
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedData = await this.schema.createDTO().safeParseAsync(req.body);
      if (!parsedData.success) {
        return res.status(400).json(parsedData.error.errors);
      }

      // todo check if course_offering is exist or not

      const newData = await this.studentEnrollmentService.create(
        parsedData.data
      );
      return res.status(200).json(newData);
    } catch (error) {
      return next(error);
    }
  }

  @PUT("/:id")
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const parsedData = await this.schema
        .updateDTO(id)
        .safeParseAsync(req.body);
      if (!parsedData.success) {
        return res.status(400).json(parsedData.error.errors);
      }

      const newData = await this.studentEnrollmentService.update(
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
      // find if enrolment is exist or not
      const findData = await this.studentEnrollmentService.findByID(id);
      if (!findData)
        throw this.studentEnrollmentService.generateError(
          "Invalid request! Data not found!",
          404
        );

      await this.studentEnrollmentService.delete(req.params.id);
      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  }
}

export const StudentEnrollmentControllerToken = Symbol(
  "StudentEnrollmentControllerToken"
);
