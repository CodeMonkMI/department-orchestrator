import { Controller } from "@/lib/core/decorator/controller.decorator";
import {
  DELETE,
  GET,
  PATCH,
  POST,
} from "@/lib/core/decorator/router.decorator";
import { UserSchema } from "@/schema/user.schema";
import { UserService } from "@/services/user.service";
import { NextFunction, Request, Response } from "express";
import { autoInjectable } from "tsyringe";

@autoInjectable()
@Controller("/api/v1/user")
export class UserController {
  constructor(readonly userService: UserService, readonly schema: UserSchema) {}

  @GET("/")
  async find(_req: Request, res: Response, _next: NextFunction) {
    console.log("user controller find");
    const data = await this.userService.find();
    return res.status(200).json(data);
  }

  @POST("/")
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = this.schema.createUser().safeParse(req.body);

      if (!result.success) {
        return res.status(400).json(result.error.errors);
      }

      const newData = await this.userService.create(result.data);
      return res
        .status(201)
        .json({ message: "User created successfully", data: newData });
    } catch (error) {
      return next(error);
    }
  }
  @GET("/:id")
  async single(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      const newData = await this.userService.findByID(id);
      return res
        .status(200)
        .json({ message: "User find successfully", data: newData });
    } catch (error) {
      return next(error);
    }
  }
  @PATCH("/:id")
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = this.schema.updateUserDTO().safeParse(req.body);
      const id = req.params.id;
      if (!result.success) {
        return res.status(400).json(result.error.errors);
      }

      const newData = await this.userService.update(id, result.data);
      return res
        .status(200)
        .json({ message: "User updated successfully", data: newData });
    } catch (error) {
      return next(error);
    }
  }
  @DELETE("/:id")
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      await this.userService.delete(id);
      return res
        .status(204)
        .json({ message: "User updated successfully", data: null });
    } catch (error) {
      return next(error);
    }
  }
}

export const UserControllerToken = Symbol("UserControllerToken");
