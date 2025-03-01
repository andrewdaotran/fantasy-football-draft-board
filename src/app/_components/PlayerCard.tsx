"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { APITypes } from "typings";

interface Props {
  // fullName: string;
  position: string;
  playerPosition?: string;
  positionIndex?: number;
  index: number;
  // playerId: number;
  // playerRanksListId?: string;
  player: APITypes;
}

const PlayerCard = ({
  // fullName,
  position,
  index,
  playerPosition,
  positionIndex,
  // playerId,
  // playerRanksListId,
  player,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: player.player_id,
    data: {
      ...player,
    },
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;
  return (
    <div
      className="flex gap-2 border border-gray-200 p-2"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      <p>{String(index + 1)} </p>
      <p>{player.full_name}</p>
      {playerPosition === "Flex" && (
        <>
          <p>
            {position}
            {String(positionIndex)}
          </p>
        </>
      )}
    </div>
  );
};

export default PlayerCard;
