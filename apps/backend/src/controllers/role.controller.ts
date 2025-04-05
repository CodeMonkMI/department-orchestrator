import { Controller } from "@/lib/core/decorator/controller.decorator";
import {
  DELETE,
  GET,
  PATCH,
  POST,
} from "@/lib/core/decorator/router.decorator";
import { RoleSchema } from "@/schema/role.schema";
import { RoleService } from "@/services/role.service";
import { NextFunction, Request, Response } from "express";
import { autoInjectable } from "tsyringe";

@autoInjectable()
@Controller("/api/v1/role")
export class RoleController {
  constructor(readonly roleService: RoleService, readonly schema: RoleSchema) {}

  @GET("/")
  async find(_req: Request, res: Response, _next: NextFunction) {
    const data = await this.roleService.find();
    return res.status(200).json(data);
  }
  @GET("/:id")
  async single(req: Request, res: Response, _next: NextFunction) {
    const data = await this.roleService.findByID(req.params.id);
    return res.status(data ? 200 : 404).json(data);
  }

  @POST("/")
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedData = this.schema.roleDTO().safeParse(req.body);
      if (!parsedData.success)
        return res.status(400).json(parsedData.error.errors);

      const findRole = await this.roleService.findOne({
        role: parsedData.data.role,
      });
      if (findRole)
        throw this.roleService.generateError("Role already exists!", 400);

      const newData = await this.roleService.create(req.body);
      return res.status(201).json(newData);
    } catch (error) {
      return next(error);
    }
  }
  @PATCH("/:id")
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedData = this.schema.roleUpdateDTO().safeParse(req.body);
      if (!parsedData.success)
        return res.status(400).json(parsedData.error.errors);
      const id = req.params.id;
      const findRole = await this.roleService.findByID(id);
      if (!findRole)
        throw this.roleService.generateError("Role not found ss!", 404);

      const newData = await this.roleService.update(id, parsedData.data);
      return res.status(202).json(newData);
    } catch (error) {
      return next(error);
    }
  }
  @DELETE("/:id")
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      const findRole = await this.roleService.findByID(id);
      if (!findRole) throw this.roleService.generateError("Invalid Role!", 400);

      await this.roleService.delete(id);
      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  }
}

export const RoleControllerToken = Symbol("RoleControllerToken");
