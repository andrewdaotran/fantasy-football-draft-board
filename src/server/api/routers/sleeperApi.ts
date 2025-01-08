import { APITypes } from "typings";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const sleeperApiRouter = createTRPCRouter({
  getAllPlayers: publicProcedure.query(async ({ ctx }) => {
    const players = await fetch("https://api.sleeper.app/v1/players/nfl", {
      next: { revalidate: 60 * 60 * 24 },
    });
    const playersObj = (await players.json()) as Promise<
      Record<string, APITypes>
    >;
    const playersArray = Object.values(playersObj);

    return playersArray;
  }),
});
