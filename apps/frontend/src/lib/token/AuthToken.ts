"use client";

import { Token } from "./Token";

class AuthToken extends Token {
  key: string = "authToken";
}

export const authToken = new AuthToken();
