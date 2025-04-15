"use client";
import React, { useState } from "react";
import { APITypes, PositionRanksList } from "typings";
import PlayerList from "../../_components/PlayerList";
import PositionRanksByUser from "~/app/_components/PositionRanksByUser";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { set } from "zod";

interface Props {
  players: APITypes[];
  // positionRanks: APITypes[]
  positionRanksArray: PositionRanksList[];
}

const DragAndDrop = ({ players, positionRanksArray }: Props) => {
  const [listOfPlayers, setListOfPlayers] = useState<APITypes[]>(players);
  const [ranksArray, setRanksArray] =
    useState<PositionRanksList[]>(positionRanksArray);
  const [activeRanksList, setActiveRanksList] = useState(ranksArray[0]);
  // const [activeRanksList, setActiveRanksList] = useState(ranksArray[0]);
  const [draggedPlayer, setDraggedPlayer] = useState<string | null>(null);
  // console.log("RANKS ARRAY", ranksArray);
  // console.log("ACTIVE RANKS LIST", activeRanksList);

  const handleActiveRanksList = (id: string) => {
    const activeList = ranksArray.find((list) => list.id === id);
    if (activeList) setActiveRanksList(activeList);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    // if (!active.data.current) return;

    const getListPos = (id: string) => {
      return ranksArray.findIndex((item) => item.id === id);
    };

    const droppedListID = over.id;

    // if (over.id === active.data.current.playerRanksListId) return;

    const playerId = active.id as string;
    setDraggedPlayer(playerId);
    // const newStatus = over.id;

    setRanksArray(() => {
      return ranksArray.map((list) => {
        console.log("LIST", list);

        if (list.id === droppedListID) {
          return {
            ...list,
            positionRanks: [...list.positionRanks, { ...active.data.current }],
          };
        }
        return list;
      });
    });

    // console.log("TYPE", typeof playerId);

    // Try to remove player from list in future
    setListOfPlayers(() => {
      return listOfPlayers.filter((player) => {
        // console.log("PLAYER ID", playerId);
        // console.log("player.player_id", player.player_id);
        if (String(player.player_id) === playerId) {
          console.log("PLAYER", player);
        }
        return String(player.player_id) !== playerId;
      });
    });
  };

  const handleChangeList = (listId: string) => {
    handleActiveRanksList(listId);
  };
  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        {/* <PositionRanksByUser
          positionRanks={activeRanksList?.positionRanks}
          // key={positionRanksList.id}
          playerRanksListId={activeRanksList?.id}
          ranksArray={ranksArray}
          handleActiveRanksList={handleActiveRanksList}
          activeRanksList={activeRanksList}
        /> */}

        <div>
          {/* Ranks List Dropdown */}
          <div className="dropdown dropdown-hover">
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
                    onClick={() => {
                      console.log("LIST ID", list.id);
                      handleChangeList(list.id);
                    }}
                  >
                    <a>{list.title}</a>
                  </button>
                );
              })}
            </ul>
          </div>
          {/* Ranks List Dropdown End */}

          {ranksArray
            .filter((list) => list.id === activeRanksList?.id)
            .map((positionRanksList: PositionRanksList, index) => {
              return (
                <PositionRanksByUser
                  positionRanks={positionRanksList.positionRanks}
                  key={positionRanksList.id}
                  playerRanksListId={positionRanksList.id}
                  ranksArray={ranksArray}
                  handleActiveRanksList={handleActiveRanksList}
                  activeRanksList={activeRanksList}
                />
              );
            })}
        </div>
        {/* <PositionRanks positionRanks={positionRanks} /> */}
        <PlayerList
          players={listOfPlayers}
          playerRanksListId={"1"}
          draggedPlayer={draggedPlayer}
        />
      </DndContext>
    </>
  );
};

export default DragAndDrop;
