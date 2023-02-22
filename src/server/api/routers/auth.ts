import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { compare as comparePassword, hash as hashPassword } from "bcrypt";
import { checkPassword } from "../../../utils/shared_utils";
import { createJwt } from "./auth.service";

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

      return createJwt(user);
    }),
  register: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input: { username, password, email }, ctx }) => {
      if (!checkPassword(password).fullyValidated) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Password does not pass validation",
        });
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

      const saltRounds = 10;
      const hashedPassword = await hashPassword(password, saltRounds);

      const user = await ctx.prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
      });

      return createJwt(user);
    }),
});