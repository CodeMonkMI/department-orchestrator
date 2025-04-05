import { Token } from "@/helpers/Token";
import { Controller } from "@/lib/core/decorator/controller.decorator";
import { POST } from "@/lib/core/decorator/router.decorator";
import { AuthSchema } from "@/schema/auth.schema";
import { UserService } from "@/services/user.service";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { autoInjectable } from "tsyringe";

@autoInjectable()
@Controller("/api/v1/auth")
export class AuthController {
  constructor(
    readonly userService: UserService,
    readonly schema: AuthSchema,
    readonly token: Token
  ) {}

  @POST("/login")
  async login(req: Request, res: Response, _next: NextFunction) {
    // validate data
    const parsedData = this.schema.loginDTO().safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json(parsedData.error.errors);
    }

    // check if user exists
    const findUser = await this.userService.findOne({
      email: parsedData.data.email,
    });
    if (!findUser) {
      return res.status(400).json({ message: "Invalid username or password!" });
    }

    const isPasswordValid = bcrypt.compareSync(
      parsedData.data.password,
      findUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password!" });
    }

    const token = this.token.generateToken({
      id: findUser.id,
      email: findUser.email,
      username: findUser.username,
    });

    const resData = {
      message: "Login successful!",
      data: { token },
    };
    return res.status(200).json(resData);
  }
}

export const AuthControllerToken = Symbol("AuthControllerToken");
