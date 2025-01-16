import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { userInput } from "../../../../zodTypings";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(userInput)
    .mutation(async ({ ctx, input }) => {
      // const user = await ctx.db.user.findUnique({
      //   where: { id: input.id },
      // });

      // const findUser = await ctx.db.user.findUnique({
      //   where: { email: input.email },
      // });

      // if (findUser) return

      const newUser = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          image: input.image,
          sub: input.sub,
        },
      });
      return newUser;
    }),
  getUniqueUser: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { sub: input },
      });
      return user;
    }),
  deleteUser: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.delete({
        where: { id: input },
      });
      return user;
    }),

  // createUser: publicProcedure
  //   .input(userInput)
  //   .mutation(async ({ ctx, input }) => {
  //     const johnny = await ctx.prisma.user.findUnique({
  //       where: { id: input.id },
  //     });
  //     if (johnny?.id && johnny?.id === input.id) return;

  //     if (johnny?.id && johnny?.id !== input.id) {
  //       throw new Error("Not Johnny");
  //     }
  //     const user = await ctx.prisma.user.create({
  //       data: {
  //         ...input,
  //       },
  //     });
  //     return user;
  //   }),
  // getJohnny: publicProcedure.query(async ({ ctx }) => {
  //   const johnny = await ctx.prisma.user.findMany();
  //   return johnny[0];
  // }),
  // getAll: publicProcedure.query(async ({ ctx }) => {
  //   const users = await ctx.prisma.user.findMany();
  //   return users;
  // }),
});
