"use client";

import { useDroppable } from "@dnd-kit/core";
import React, { use, useEffect, useState } from "react";
import { APITypes, PositionRanksList } from "typings";
import { filterPlayers, playerPositions } from "utils";
import PlayerCard from "~/app/_components/PlayerCard";

interface PlayerListProps {
  players: APITypes[];
  playerRanksListId: string;
  draggedPlayer: string | null;
  removedPlayer: string | null;
  handleSetDraggedPlayer: () => void;
  handleSetRemovedPlayer: () => void;
  activeRanksList?: PositionRanksList | undefined;
}

const PlayerList = ({
  players,
  playerRanksListId,
  draggedPlayer,
  removedPlayer,
  handleSetDraggedPlayer,
  handleSetRemovedPlayer,
  activeRanksList,
}: PlayerListProps) => {
  const { setNodeRef } = useDroppable({
    id: playerRanksListId,
  });

  // const [filteredPlayersList, setFilteredPlayersList] =
  //   useState<APITypes[]>(players);
  const [filteredPlayersList, setFilteredPlayersList] = useState<APITypes[]>(
    filterPlayers(players),
  );

  // **** Uncomment***
  // const [hashedObj, setHashedObj] = useState<{ string: APITypes } | {}>({});
  // **** Uncomment***

  // console.log("HASHED OBJ", hashedObj);

  // useEffect(() => {
  //   setFilteredPlayersList(filterPlayers(players));
  // }, [players]);

  console.log("FILTERED PLAYER LIST", filteredPlayersList);

  const [playerPosition, setPlayerPosition] = useState<string>("Quarterback");

  const hashIntoObject = (filteredPlayersList: APITypes[]) => {
    const hash: { [key: string]: number } = {};
    filteredPlayersList.forEach((player, index) => {
      // hash[String(player.player_id)] = index;
      hash[player.player_id] = index;
      // hash[player.player_id] = player;
    });
    return hash;
  };

  // const blockPlayerFromList = (ranksList: APITypes[]) => {
  //   for (const player of ranksList) {
  //     filteredPlayersList[hashedObj[player.player_id]].blocked = true;
  //   }
  //   // filteredPlayersList[]
  // };

  // blockPlayerFromList(activeRanksList?.positionRanks);

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

  const handlePlayerPosition = (
    e: React.MouseEvent<HTMLButtonElement> | null,
    position?: string | undefined,
  ) => {
    setFilteredPlayersList(
      filterPlayers(players, "", e?.currentTarget.textContent!, position),
    );
    if (e?.currentTarget.textContent === "QB" || position === "QB") {
      setPlayerPosition("Quarterback");
    }
    if (e?.currentTarget.textContent === "RB" || position === "RB") {
      setPlayerPosition("Runningback");
    }
    if (e?.currentTarget.textContent === "WR" || position === "WR") {
      setPlayerPosition("Wide Receiver");
    }
    if (e?.currentTarget.textContent === "TE" || position === "TE") {
      setPlayerPosition("Tight End");
    }
    if (e?.currentTarget.textContent === "FLEX" || position === "FLEX") {
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
    if (e?.currentTarget.textContent === "K" || position === "K") {
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
    // console.log("DRAGGED PLAYER", draggedPlayer);
    // console.log("REMOVED PLAYER", removedPlayer);
    filteredPlayersList.map((player, index) => {
      if (String(player.player_id) === draggedPlayer) {
        player.blocked = true;
        console.log("BLOCKED PLAYER", player.blocked, player.full_name);
      }

      if (String(player.player_id) === removedPlayer) {
        player.blocked = false;
        console.log("UNBLOCKED PLAYER", player.blocked, player.full_name);
      }
      handleSetDraggedPlayer();
      handleSetRemovedPlayer();
      return player;
    });
  };

  //
  useEffect(() => {
    setFilteredPlayersList(
      filterPlayers(players, "", activeRanksList?.position),
    );
    if (activeRanksList?.position === "QB") {
      setPlayerPosition("Quarterback");
    }
    if (activeRanksList?.position === "RB") {
      setPlayerPosition("Runningback");
    }
    if (activeRanksList?.position === "WR") {
      setPlayerPosition("Wide Receiver");
    }
    if (activeRanksList?.position === "TE") {
      setPlayerPosition("Tight End");
    }
    if (activeRanksList?.position === "FLEX") {
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
    if (activeRanksList?.position === "K") {
      setPlayerPosition("Kicker");
    }

    // **** Uncomment***
    // setHashedObj(hashIntoObject(filteredPlayersList));
    // **** Uncomment***

    handlePlayerPosition(null, activeRanksList?.position);

    // blockPlayerFromList(activeRanksList?.positionRanks);
  }, [activeRanksList]);

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
          if (index < 5) return null;
          // if (player.blocked) console.log(player.blocked, player.full_name);
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
