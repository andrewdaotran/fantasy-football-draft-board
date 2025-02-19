// "use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { auth, signOut, signIn } from "~/server/auth/config";
import { APITypes, PositionRanksList } from "typings";
import { api } from "~/trpc/server";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import PlayerList from "./PlayerList";
import PositionRanks from "~/app/_components/PositionRanks";
import TempComponent from "./TempComponent";
// import PlayersContext, { PlayersContextType } from "~/context/playersContext";

const getPlayers = async () => {
  const players = await api.sleeperApi.getAllPlayers();

  return players;
};

//  Get PositionRanks from DB
const getPositionRanksListsByUser = async () => {
  // const positionRanks = await api.sleeperApi.getPositionRanks();
  const positionRanks = [] as PositionRanksList[];

  return positionRanks;
};

const Home = async () => {
  const players = await getPlayers();

  const positionRanksLists = await getPositionRanksListsByUser();

  positionRanksLists.push({
    id: "1",
    positionRanks: players.slice(0, 12),
    createdBy: "Andrew",
  });

  const positionRanks = players.slice(0, 10);

  // const { playerSearch, handlePlayerSearchPosition } = useContext(
  //   PlayersContext,
  // ) as PlayersContextType;

  const session = await auth();

  // useDroppable({});

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const playerId = active.id as string;
    const newStatus = over.id;

    // positionRanks
    console.log(event.active);
  };

  return (
    <div>
      <h1>Home</h1>

      <div className="grid grid-cols-2 gap-2">
        <TempComponent
          players={players}
          positionRanksLists={positionRanksLists}
        />
        {/* <DndContext onDragEnd={handleDragEnd}> */}
        {/* {positionRanksLists.map((positionRanksList, index) => {
          return (
            <PositionRanks
              positionRanks={positionRanksList.positionRanks}
              key={positionRanksList.id}
            />
          );
        })} */}
        {/* <PositionRanks positionRanks={positionRanks} /> */}
        {/* <PlayerList players={players} playerRanksListId={"1"} /> */}
        {/* </DndContext> */}
      </div>

      <div>
        <p></p>
      </div>
    </div>
  );
};

export default Home;
