import { Controller } from "@/lib/core/decorator/controller.decorator";
import { Use } from "@/lib/core/decorator/middleware.decorator";
import {
  DELETE,
  GET,
  PATCH,
  POST,
} from "@/lib/core/decorator/router.decorator";
import { PassportMiddleware } from "@/middleware/passport/passport";
import { UserSchema } from "@/schema/user.schema";
import { UserService } from "@/services/user.service";
import { NextFunction, Request, Response } from "express";
import { autoInjectable, container } from "tsyringe";

const passport = container.resolve(PassportMiddleware);

@autoInjectable()
@Controller("/api/v1/user")
@Use(passport.authenticate)
export class UserController {
  constructor(readonly userService: UserService, readonly schema: UserSchema) {}

  @GET("/")
  @Use(passport.isSuperAdmin)
  async find(req: Request, res: Response, _next: NextFunction) {
    console.log(req.user);

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
      return res.status(201).json(newData);
    } catch (error) {
      return next(error);
    }
  }
  @GET("/:id")
  async single(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      const newData = await this.userService.findByID(id);
      return res.status(200).json(newData);
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
      return res.status(200).json(newData);
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
