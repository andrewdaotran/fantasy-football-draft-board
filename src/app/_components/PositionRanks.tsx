import React from "react";
import { APITypes } from "typings";
import PlayerCard from "./PlayerCard";

interface PositionRanksProps {
  positionRanks: APITypes[];
}

const PositionRanks = ({ positionRanks }: PositionRanksProps) => {
  return (
    <div>
      {positionRanks.map((player, index) => {
        return (
          <div key={String(player.player_id)} className="flex gap-2 p-2">
            <PlayerCard
              position={player.position}
              fullName={player.full_name}
              // playerPosition={playerPosition}
              positionIndex={Number(player?.positionIndex) + 1}
              index={index}
              playerId={player.player_id}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PositionRanks;
