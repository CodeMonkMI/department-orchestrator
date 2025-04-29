import { UserService } from "@/services/user.service";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import {
  ExtractJwt,
  Strategy,
  StrategyOptionsWithoutRequest,
  VerifiedCallback,
} from "passport-jwt";
import { autoInjectable, container } from "tsyringe";

const SECRET_KEY = "secret";

type JWTPayloadType = {
  id: string;
  email: string;
  user: string;
  iat: string;
  exp: string;
};

@autoInjectable()
export class PassportMiddleware {
  userService: UserService;
  constructor() {
    this.userService = container.resolve(UserService);
  }

  private getOptions(): StrategyOptionsWithoutRequest {
    return {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEY,
    };
  }

  private verifyUser(userService: UserService) {
    return async (payload: JWTPayloadType, done: VerifiedCallback) => {
      try {
        const id = payload.id;
        if (!id) {
          return done(new Error("invalid user"), null);
        }

        const findUser = await userService.findByID(id);

        if (!findUser) {
          return done(new Error("invalid user"), null);
        }

        return done(null, { user: findUser });
      } catch (error) {
        return done(error, null);
      }
    };
  }

  async init() {
    const opts = this.getOptions();
    passport.use(new Strategy(opts, this.verifyUser(this.userService)));
  }

  async getUserData(id: string): Promise<any> {
    return this.userService.findByID(id);
  }

  async authenticate(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({
          message: "Unauthorized!",
        });
      }
      req.user = user;
      return next();
    })(req, res, next);
  }
}
