"use client";

import { useDroppable } from "@dnd-kit/core";
import React, { use, useEffect, useState } from "react";
import { APITypes } from "typings";
import { filterPlayers, playerPositions } from "utils";
import PlayerCard from "~/app/_components/PlayerCard";

interface PlayerListProps {
  players: APITypes[];
  playerRanksListId: string;
  draggedPlayer: string | null;
  removedPlayer: string | null;
  handleSetDraggedPlayer: () => void;
  handleSetRemovedPlayer: () => void;
}

const PlayerList = ({
  players,
  playerRanksListId,
  draggedPlayer,
  removedPlayer,
  handleSetDraggedPlayer,
  handleSetRemovedPlayer,
}: PlayerListProps) => {
  const { setNodeRef } = useDroppable({
    id: playerRanksListId,
  });

  const [filteredPlayersList, setFilteredPlayersList] = useState<APITypes[]>(
    filterPlayers(players),
  );

  // useEffect(() => {
  //   setFilteredPlayersList(filterPlayers(players));
  // }, [players]);

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

  // Remove dragged player from list
  const handleDraggedPlayer = (
    draggedPlayer: string | null,
    removedPlayer: string | null,
  ) => {
    // setFilteredPlayersList(
    //   filteredPlayersList.filter(
    //     (player) => String(player.player_id) !== draggedPlayer,
    //   ),
    // );
    console.log("DRAGGED PLAYER", draggedPlayer);
    console.log("REMOVED PLAYER", removedPlayer);
    filteredPlayersList.map((player, index) => {
      if (String(player.player_id) === draggedPlayer) {
        player.blocked = true;
        handleSetDraggedPlayer();
      }
      if (String(player.player_id) === removedPlayer) {
        player.blocked = false;
        handleSetRemovedPlayer();
      }
      return player;
    });
  };

  useEffect(() => {
    handleDraggedPlayer(draggedPlayer, removedPlayer);
    // console.log("DRAGGED PLAYER", draggedPlayer);
  }, [draggedPlayer, removedPlayer]);
  // Remove dragged player from list end

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
          if (player.blocked === true) return null;
          return (
            <div key={String(player.player_id)} className="flex gap-2 p-2">
              <PlayerCard
                position={player.position}
                // fullName={player.full_name}
                playerPosition={playerPosition}
                positionIndex={Number(player?.positionIndex) + 1}
                index={index}
                // playerId={player.player_id}
                // playerRanksListId={playerRanksListId}
                player={player}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerList;
