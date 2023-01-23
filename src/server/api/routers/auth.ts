import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { createSecretKey } from "crypto";
import { serverEnv } from "../../../env/schema.mjs";
import { SignJWT } from "jose";
import { compare as comparePassword, hash as hashPassword } from "bcrypt";
import type { User } from "@prisma/client";
import { checkPassword } from "../../../utils/shared_utils";

const SECRET_KEY = createSecretKey(serverEnv.JWT_SECRET!, "utf-8");

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ input: { username, password }, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect username or password",
        });
      }

      const correctPassword = await comparePassword(password, user.password);

      if (!correctPassword) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect username or password",
        });
      }

      return createJwt(user)
    }),
  register: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ input: { username, password }, ctx }) => {
      if(!checkPassword(password).fullyValidated) {
        throw new TRPCError({code: "BAD_REQUEST", message: "Password does not pass validation"})
      }

      const existingUser = await ctx.prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });
      }

      const saltRounds = 10
      const hashedPassword = await hashPassword(password, saltRounds)

      const user = await ctx.prisma.user.create({
        data: {
          username,
          password: hashedPassword
        }
      })

      return createJwt(user)
    }),
});



function createJwt({username, userId}: User): Promise<string> {
  return new SignJWT({ username, userId })
  .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime("2h")
    .sign(SECRET_KEY); 
}