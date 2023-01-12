import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(({ input: { username, password }, ctx }) => {
      if (username == "BOB" && password == "password") {
        return true;
      }
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Incorrect username or password",
      });
    }),
});
