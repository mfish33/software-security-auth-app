import { createTRPCRouter, protectedProcedure } from "../trpc";

export const contactsRouter = createTRPCRouter({
    getAll: protectedProcedure.query(({ctx}) => {
        return ctx.prisma.user.findMany({
            select: {
                username: true,
                email: true,
            },
            where: {
                userId: {
                    not: ctx.user.userId
                }
            }
        })
    })
})