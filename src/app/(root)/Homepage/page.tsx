// "use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { auth, signOut, signIn } from "~/server/auth/config";
import { APITypes } from "typings";
import { api } from "~/trpc/server";

import PlayerList from "./PlayerList";
// import PlayersContext, { PlayersContextType } from "~/context/playersContext";

const getPlayers = async () => {
  const players = await api.sleeperApi.getAllPlayers();

  return players;
};

const Home = async () => {
  const players = await getPlayers();

  // const { playerSearch, handlePlayerSearchPosition } = useContext(
  //   PlayersContext,
  // ) as PlayersContextType;

  const session = await auth();

  return (
    <div>
      <h1>Home</h1>

      <PlayerList players={players} />

      <div>
        <p></p>
      </div>
    </div>
  );
};

export default Home;
