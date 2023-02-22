import type { User } from "@prisma/client";
import { jwtVerify, SignJWT } from "jose";
import { env } from "../../../env/server.mjs";

type JwtUser = {
  username: string;
  userId: number;
};

export function createJwt({ username, userId }: User): Promise<string> {
  const privateKey = new TextEncoder().encode(env.JWT_SECRET);
  const payload: JwtUser = {
    userId,
    username,
  };
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(privateKey);
}

export async function verifyUser(token: string) {
  if (!token) {
    return undefined;
  }
  try {
    const privateKey = new TextEncoder().encode(env.JWT_SECRET);
    const { payload } = await jwtVerify(token, privateKey);
    return payload as JwtUser;
  } catch {
    return undefined;
  }
}
