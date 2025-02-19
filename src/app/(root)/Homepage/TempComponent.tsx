"use client";
import React from "react";
import { APITypes, PositionRanksList } from "typings";
import PlayerList from "./PlayerList";
import PositionRanks from "~/app/_components/PositionRanks";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

interface Props {
  players: APITypes[];
  // positionRanks: APITypes[]
  positionRanksLists: PositionRanksList[];
}

const TempComponent = ({ players, positionRanksLists }: Props) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const playerId = active.id as string;
    const newStatus = over.id;

    // positionRanks
    console.log(event.active);
  };
  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        {positionRanksLists.map((positionRanksList, index) => {
          return (
            <PositionRanks
              positionRanks={positionRanksList.positionRanks}
              key={positionRanksList.id}
            />
          );
        })}
        {/* <PositionRanks positionRanks={positionRanks} /> */}
        <PlayerList players={players} playerRanksListId={"1"} />
      </DndContext>
    </>
  );
};

export default TempComponent;
