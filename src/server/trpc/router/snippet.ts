import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const snippetRouter = router({
  createSnippet: publicProcedure.input(z.object({ text: z.string() })).mutation(async ({ ctx, input }) => {
    const snippet = await ctx.prisma.snippet.create({
        data: {
            text: input.text,
        },
    });

    return snippet;
  }),
  getSnippet: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const snippet = await ctx.prisma.snippet.findUnique({
      where: {
        id: input.id
      }
    });

    if (!snippet) return;

    return snippet;
  })
});
