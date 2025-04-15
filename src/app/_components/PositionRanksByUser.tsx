import React from "react";
import { APITypes, PositionRanksList } from "typings";
import PlayerCard from "./PlayerCard";
import { useDroppable } from "@dnd-kit/core";

interface PositionRanksProps {
  positionRanks: APITypes[] | null;
  // playerRanksListId?: string;
  playerRanksListId: string;
  ranksArray: PositionRanksList[];
  handleActiveRanksList: (id: string) => void;
  activeRanksList?: PositionRanksList;
}

const PositionRanksByUser = ({
  positionRanks,
  playerRanksListId,
  ranksArray,
  handleActiveRanksList,
  activeRanksList,
}: PositionRanksProps) => {
  const { setNodeRef } = useDroppable({
    id: playerRanksListId,
    // id: 4,
    data: { positionRanks },
  });
  // const handleChangeList = (listId: string) => {
  //   handleActiveRanksList(listId);
  // };

  // console.log("activeRanksList", activeRanksList?.length);
  return (
    // <div>
    <div ref={setNodeRef}>
      {/* <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="btn">
          Position
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] w-36 gap-1 rounded-box bg-base-100 p-2 shadow"
        >
          {ranksArray.map((list) => {
            return (
              <button
                key={list.id}
                className="btn-outline btn-primary btn-sm mx-2 rounded-md"
                onClick={() => handleChangeList(list.id)}
              >
                <a>{list.title}</a>
              </button>
            );
          })}
        </ul>
      </div> */}
      {/* {activeRanksList?.positionRanks?.map( */}
      {positionRanks?.map((player: APITypes, index: number) => {
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
      {/* {positionRanks.map((player, index) => {
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
      })} */}
    </div>
  );
};

export default PositionRanksByUser;
