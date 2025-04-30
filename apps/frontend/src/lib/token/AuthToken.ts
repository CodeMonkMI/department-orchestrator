"use client";
import { jwtDecode } from "jwt-decode";
import { Token } from "./Token";

class AuthToken extends Token {
  key: string = "authToken";
  decode(token: string = this.get()) {
    return jwtDecode(token);
  }
}

export const authToken = new AuthToken();
