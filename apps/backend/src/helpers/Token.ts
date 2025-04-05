import jwt from "jsonwebtoken";
import { singleton } from "tsyringe";

type TokenUserDataProps = {
  id: string;
  email: string;
  username: string;
};

const { JWT_SECRET } = process.env; // todo remove this later move to Config.ts

@singleton()
export class Token {
  public generateToken(user: TokenUserDataProps): string {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        iat: new Date().getTime(),
        exp: Date.now() + 1000 * 60 * 60,
      },
      JWT_SECRET ? JWT_SECRET : ""
    );
    return token;
  }
}
