import bcrypt from "bcryptjs";
import { singleton } from "tsyringe";

@singleton()
export class Password {
  public static hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
}
