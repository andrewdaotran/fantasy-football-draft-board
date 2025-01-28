import React from "react";
import { APITypes } from "typings";

interface Props {
  fullName: String;
  position: String;
  playerPosition: String;
  positionIndex?: Number;
  index: number;
}

const PlayerCard = ({
  fullName,
  position,
  index,
  playerPosition,
  positionIndex,
}: Props) => {
  return (
    <div className="flex gap-2 border border-gray-200 p-2">
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
