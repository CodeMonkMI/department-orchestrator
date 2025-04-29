import { Token } from "@/helpers/Token";
import { Controller } from "@/lib/core/decorator/controller.decorator";
import { POST } from "@/lib/core/decorator/router.decorator";
import { AuthSchema } from "@/schema/auth.schema";
import { AuthService } from "@/services/auth.service";
import { NextFunction, Request, Response } from "express";
import { autoInjectable } from "tsyringe";

@autoInjectable()
@Controller("/api/v1/auth")
export class AuthController {
  constructor(
    readonly userService: AuthService,
    readonly schema: AuthSchema,
    readonly token: Token
  ) {}

  @POST("/login")
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // validate data
      // validate data
      const parsedData = await this.schema.loginDTO().safeParseAsync(req.body);

      if (!parsedData.success) {
        return res.status(400).json(parsedData.error.errors);
      }

      const token = await this.userService.login(parsedData.data);
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
}

export const AuthControllerToken = Symbol("AuthControllerToken");
