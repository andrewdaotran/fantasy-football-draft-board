"use client";

import React, { useState } from "react";
import { APITypes } from "typings";
import { filteredPlayers, playerPositions } from "utils";

interface PlayerListProps {
  players: APITypes[];
}

const PlayerList = ({ players }: PlayerListProps) => {
  const [filteredPlayersList, setFilteredPlayersList] = useState<APITypes[]>(
    filteredPlayers(players),
  );

  const handleFilterPlayers = () => {
    setFilteredPlayersList(filteredPlayers(players));
  };

  const handlePlayerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredPlayersList(filteredPlayers(players, e.target.value));
  };

  const handlePlayerPosition = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFilteredPlayersList(
      filteredPlayers(players, "", e.currentTarget.textContent!),
    );
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
      <div>
        {filteredPlayersList.map((player) => {
          return (
            <div key={String(player.player_id)} className="flex gap-2 p-2">
              <p>{player.full_name}</p>
              <p>{player.position}</p>
              <p>{player.search_rank?.toString()}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerList;
