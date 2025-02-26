"use client";

import { useDroppable } from "@dnd-kit/core";
import React, { useState } from "react";
import { APITypes } from "typings";
import { filterPlayers, playerPositions } from "utils";
import PlayerCard from "~/app/_components/PlayerCard";

interface PlayerListProps {
  players: APITypes[];
  playerRanksListId: string;
}

const PlayerList = ({ players, playerRanksListId }: PlayerListProps) => {
  const { setNodeRef } = useDroppable({
    id: playerRanksListId,
  });

  const [filteredPlayersList, setFilteredPlayersList] = useState<APITypes[]>(
    filterPlayers(players),
  );

  const [playerPosition, setPlayerPosition] = useState<string>("Quarterback");

  const handleFilterPlayers = () => {
    if (playerPosition === "Flex") {
      const flexPlayers = filterPlayers(players, "", "RB")
        .concat(filterPlayers(players, "", "WR"))
        .concat(filterPlayers(players, "", "TE"));
      setFilteredPlayersList(flexPlayers);
    } else {
      setFilteredPlayersList(filterPlayers(players));
    }
  };

  const handlePlayerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredPlayersList(filterPlayers(players, e.target.value));
  };

  const handlePlayerPosition = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFilteredPlayersList(
      filterPlayers(players, "", e.currentTarget.textContent!),
    );
    if (e.currentTarget.textContent === "QB") {
      setPlayerPosition("Quarterback");
    }
    if (e.currentTarget.textContent === "RB") {
      setPlayerPosition("Runningback");
    }
    if (e.currentTarget.textContent === "WR") {
      setPlayerPosition("Wide Receiver");
    }
    if (e.currentTarget.textContent === "TE") {
      setPlayerPosition("Tight End");
    }
    if (e.currentTarget.textContent === "FLEX") {
      setPlayerPosition("Flex");
      const flexPlayers = filterPlayers(players, "", "RB")
        .concat(filterPlayers(players, "", "WR"))
        .concat(filterPlayers(players, "", "TE"))
        .sort((a, b) => {
          if (a.search_rank > b.search_rank) {
            return 1;
          }
          if (a.search_rank < b.search_rank) {
            return -1;
          }
          return 0;
        });
      setFilteredPlayersList(flexPlayers);
    }
    if (e.currentTarget.textContent === "K") {
      setPlayerPosition("Kicker");
    }
  };

  return (
    <div className="">
      {/* Player Search */}
      <div className="flex gap-2 p-2">
        <input
          type="text"
          placeholder="Player Name"
          className="input input-bordered input-primary w-full max-w-xs focus:outline-none"
          onChange={handlePlayerName}
        />

        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn">
            Position
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-36 gap-1 rounded-box bg-base-100 p-2 shadow"
          >
            {playerPositions.map((position) => {
              return (
                <button
                  key={position}
                  className="btn-outline btn-primary btn-sm mx-2 rounded-md"
                  onClick={handlePlayerPosition}
                >
                  <a>{position}</a>
                </button>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Player List */}
      <div ref={setNodeRef}>
        {playerPosition}
        {filteredPlayersList.map((player, index) => {
          return (
            <div key={String(player.player_id)} className="flex gap-2 p-2">
              <PlayerCard
                position={player.position}
                fullName={player.full_name}
                playerPosition={playerPosition}
                positionIndex={Number(player?.positionIndex) + 1}
                index={index}
                playerId={player.player_id}
                playerRanksListId={playerRanksListId}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerList;
