import { Controller } from "@/lib/core/decorator/controller.decorator";
import { GET } from "@/lib/core/decorator/router.decorator";
import { ReportSchema } from "@/schema/report.schema";
import { ReportService } from "@/services/report.service";
import { NextFunction, Request, Response } from "express";
import { autoInjectable } from "tsyringe";

@autoInjectable()
@Controller("/api/v1/report")
export class ReportController {
  constructor(
    readonly reportService: ReportService,
    protected schema: ReportSchema
  ) {}

  @GET("/")
  async find(_req: Request, res: Response, _next: NextFunction) {
    const data = await this.reportService.find();
    return res.status(200).json(data);
  }

  @GET("/:id")
  async single(req: Request, res: Response, _next: NextFunction) {
    const data = await this.reportService.findByID(req.params.id);
    return res.status(200).json(data);
  }
}

export const ReportControllerToken = Symbol("ReportControllerToken");
