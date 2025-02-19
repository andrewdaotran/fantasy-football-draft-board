"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";

interface Props {
  fullName: string;
  position: string;
  playerPosition?: string;
  positionIndex?: number;
  index: number;
  playerId: number;
}

const PlayerCard = ({
  fullName,
  position,
  index,
  playerPosition,
  positionIndex,
  playerId,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: playerId,
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
      <p>{fullName}</p>
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
