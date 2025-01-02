import { APITypes } from "apiTypes";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const sleeperApiRouter = createTRPCRouter({
  getAllPlayers: publicProcedure.query(async ({ ctx }) => {
    const players = await fetch("https://api.sleeper.app/v1/players/nfl");
    const playersObj = (await players.json()) as Promise<
      Record<string, APITypes>
    >;
    const playersArray = Object.values(playersObj);

    return playersArray;
  }),
});
