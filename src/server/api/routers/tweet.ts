import { PrismaClient } from "@prisma/client";
import { z } from "zod";



import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const tweetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation( async ({ input: { content }, ctx}) => {
      const tweet = await ctx.prisma.tweet.create({
        data: {
          content, userId: ctx.session.user.id },
  });

  return tweet;
  }),
});
