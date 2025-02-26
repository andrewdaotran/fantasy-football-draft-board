"use client";
import React, { useState } from "react";
import { APITypes, PositionRanksList } from "typings";
import PlayerList from "../../_components/PlayerList";
import PositionRanksByUser from "~/app/_components/PositionRanksByUser";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { set } from "zod";

interface Props {
  players: APITypes[];
  // positionRanks: APITypes[]
  positionRanksArray: PositionRanksList[];
}

const DragAndDrop = ({ players, positionRanksArray }: Props) => {
  const [list, setList] = useState<PositionRanksList[]>(positionRanksArray);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    // if (!active.data.current) return;

    const getListPos = (id: string) => {
      return list.findIndex((item) => item.id === id);
    };

    const hoveredListID = over.id;

    // if (over.id === active.data.current.playerRanksListId) return;

    const playerId = active.id as string;
    // const newStatus = over.id;

    // setList(() =>
    //   // const originalPos = getListPos(active.id)
    //   // const newPos = getListPos(over.id)
    //   list.map((item) =>
    //     item.id === hoveredListID
    //       ? {
    //           ...item,
    //           positionRanks: [...item.positionRanks, active.data.current],
    //         }
    //       : item,
    //   ),
    // );

    // positionRanks
    console.log(active);
    console.log(over);
  };
  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        {list.map((positionRanksList, index) => {
          return (
            <PositionRanksByUser
              positionRanks={positionRanksList.positionRanks}
              key={positionRanksList.id}
              playerRanksListId={positionRanksList.id}
            />
          );
        })}
        {/* <PositionRanks positionRanks={positionRanks} /> */}
        <PlayerList players={players} playerRanksListId={"1"} />
      </DndContext>
    </>
  );
};

export default DragAndDrop;
