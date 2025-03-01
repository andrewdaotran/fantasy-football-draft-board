import React from "react";
import { APITypes } from "typings";
import PlayerCard from "./PlayerCard";
import { useDroppable } from "@dnd-kit/core";

interface PositionRanksProps {
  positionRanks: APITypes[];
  playerRanksListId: string;
}

const PositionRanksByUser = ({
  positionRanks,
  playerRanksListId,
}: PositionRanksProps) => {
  const { setNodeRef } = useDroppable({
    id: playerRanksListId,
    data: { positionRanks },
  });
  return (
    // <div>
    <div ref={setNodeRef}>
      {positionRanks.map((player, index) => {
        return (
          <div key={String(player.player_id)} className="flex gap-2 p-2">
            <PlayerCard
              position={player.position}
              // fullName={player.full_name}
              // playerPosition={playerPosition}
              positionIndex={Number(player?.positionIndex) + 1}
              index={index}
              // playerId={player.player_id}
              // playerRanksListId={playerRanksListId}
              key={player.player_id}
              player={player}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PositionRanksByUser;
