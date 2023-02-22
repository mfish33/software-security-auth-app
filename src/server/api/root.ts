import { createTRPCRouter } from "./trpc";
import { authRouter } from "./routers/auth";
import { contactsRouter } from "./routers/contacts";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  contacts: contactsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
