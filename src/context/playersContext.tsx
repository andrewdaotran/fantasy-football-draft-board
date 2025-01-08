"use client";

import { api } from "~/trpc/server";

import { createContext, useContext, useEffect, useState } from "react";

import { APITypes, ChildrenNodeType, PlayerSearch } from "typings";

export type PlayersContextType = {
  // players: APITypes[];
  playerSearch: PlayerSearch;
  handlePlayerSearchPosition: (playerPosition: String) => void;
};

const PlayersContext = createContext<PlayersContextType | null>(null);

export const PlayersProvider = ({ children }: ChildrenNodeType) => {
  // const data = api.sleeperApi.getAllPlayers();
  // const [players, setPlayers] = useState<APITypes[]>([]);

  const [playerSearch, setPlayerSearch] = useState<PlayerSearch>({
    playerName: "",
    playerPosition: "",
  });

  const handlePlayerSearchPosition = (playerPosition: String) => {
    setPlayerSearch({ ...playerSearch, playerPosition });
  };

  // useEffect(() => {
  //   data.then((players) => {
  //     setPlayers(players);
  //   });
  // }, []);

  return (
    <PlayersContext.Provider
      value={{ playerSearch, handlePlayerSearchPosition }}
    >
      {children}
    </PlayersContext.Provider>
  );
};

export default PlayersContext;

export function usePlayersContext() {
  return useContext(PlayersContext) as PlayersContextType;
}
