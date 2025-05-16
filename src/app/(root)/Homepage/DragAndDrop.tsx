// "use client";
// import React, { useEffect, useState } from "react";
// import { APITypes, PositionRanksList } from "typings";
// import PlayerList from "../../_components/PlayerList";
// import PositionRanksByUser from "~/app/_components/PositionRanksByUser";
// import { DndContext, DragEndEvent } from "@dnd-kit/core";
// import { playerListID } from "utils";

// interface Props {
//   players: APITypes[];
//   // positionRanks: APITypes[]
//   positionRanksArray: PositionRanksList[];
// }

// const DragAndDrop = ({ players, positionRanksArray }: Props) => {
//   const [listOfPlayers, setListOfPlayers] = useState<APITypes[]>(players);
//   const [ranksArray, setRanksArray] =
//     useState<PositionRanksList[]>(positionRanksArray);
//   const [activeRanksList, setActiveRanksList] = useState(ranksArray[0]);
//   // const [activeRanksList, setActiveRanksList] = useState(ranksArray[0]);
//   const [draggedPlayer, setDraggedPlayer] = useState<string | null>(null);
//   const [removedPlayer, setRemovedPlayer] = useState<string | null>(null);

//   const handleActiveRanksList = (id: string) => {
//     const activeList = ranksArray.find((list) => list.id === id);
//     if (activeList) setActiveRanksList(activeList);
//   };

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;

//     let isAdded = false;
//     let isRemoved = false;
//     let doesPlayerExist = false;

//     if (!over) return;
//     // if (!active.data.current) return;

//     const getListPos = (id: string) => {
//       return ranksArray.findIndex((item) => item.id === id);
//     };

//     const droppedListID = over.id;
//     console.log("active", active);
//     console.log("ACTIVE LIST", activeRanksList);

//     // if (over.id === active.data.current.playerRanksListId) return;

//     const playerId = active.id as string;

//     // const newStatus = over.id;

//     // Adds player to user's ranks list

//     // Checks if player already exists in the list

//     activeRanksList?.positionRanks.map((player) => {
//       if (String(active.id) === String(player.player_id)) {
//         doesPlayerExist = true;
//       }
//       return player;
//     });
//     // Checks if player already exists in the list end

//     setRanksArray(() => {
//       return ranksArray.map((list, index) => {
//         console.log("LIST ID", list.id);
//         console.log("DROPPED LIST ID", droppedListID);
//         if (
//           list.id === droppedListID &&
//           active.data.current?.position === list.position &&
//           !doesPlayerExist
//         ) {
//           isAdded = true;
//           console.log("HEYYY IM HERE");
//           return {
//             ...list,
//             positionRanks: [
//               ...list.positionRanks,
//               active.data.current as APITypes,
//             ],
//           };
//           // Adds player to user's ranks list end
//           // Removes player from user's ranks list and adds back to player list
//         } else if (
//           droppedListID === playerListID &&
//           active.data.current?.position === list.position
//         ) {
//           isRemoved = true;
//           console.log("JKKKK ITS MEEEE");
//           return {
//             ...list,
//             positionRanks: list.positionRanks.filter(
//               (player) => String(player.player_id) !== playerId,
//             ),
//           };
//         }
//         // Removes player from user's ranks list and adds back to player list end

//         return list;
//       });
//     });

//     // What does this do?
//     setListOfPlayers(() => {
//       return listOfPlayers.filter((player) => {
//         // console.log("PLAYER ID", playerId);
//         // console.log("player.player_id", player.player_id);
//         if (String(player.player_id) === playerId) {
//           console.log("PLAYER", player);
//         }
//         return String(player.player_id) !== playerId;
//       });
//     });

//     // setListOfPlayers(() => {
//     //   return listOfPlayers.map((player) => {
//     //     if (String(player.player_id) === playerId) {
//     //       player.blocked = true;
//     //       console.log("BLOCKED PLAYER", player.blocked, player.full_name);
//     //     }
//     //     return player;
//     //   });
//     // });
//     // What does this do end

//     // Removes dragged player from player list
//     if (isAdded) setDraggedPlayer(playerId);
//     if (isRemoved) setRemovedPlayer(playerId);
//   };

//   // Update active ranks list
//   useEffect(() => {
//     ranksArray.map((list) => {
//       if (activeRanksList?.id === list.id) {
//         setActiveRanksList(list);
//       }
//       return list;
//     });
//   }, [ranksArray]);
//   // Update active ranks list end

//   const handleSetDraggedPlayer = () => {
//     setDraggedPlayer(null);
//   };
//   const handleSetRemovedPlayer = () => {
//     setRemovedPlayer(null);
//   };

//   const handleChangeList = (listId: string) => {
//     handleActiveRanksList(listId);
//   };

//   return (
//     <>
//       <DndContext onDragEnd={handleDragEnd}>
//         {/* <PositionRanksByUser
//           positionRanks={activeRanksList?.positionRanks}
//           // key={positionRanksList.id}
//           playerRanksListId={activeRanksList?.id}
//           ranksArray={ranksArray}
//           handleActiveRanksList={handleActiveRanksList}
//           activeRanksList={activeRanksList}
//         /> */}

//         <div>
//           {/* Ranks List Dropdown */}
//           <div className="dropdown dropdown-hover">
//             <div tabIndex={0} role="button" className="btn">
//               Position
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu dropdown-content z-[1] w-36 gap-1 rounded-box bg-base-100 p-2 shadow"
//             >
//               {ranksArray.map((list) => {
//                 return (
//                   <button
//                     key={list.id}
//                     className="btn-outline btn-primary btn-sm mx-2 rounded-md"
//                     onClick={() => {
//                       console.log("LIST ID", list.id);
//                       handleChangeList(list.id);
//                     }}
//                   >
//                     <a>{list.title}</a>
//                   </button>
//                 );
//               })}
//             </ul>
//           </div>
//           {/* Ranks List Dropdown End */}

//           {/* Ranks List Title */}
//           <div>
//             <h3>
//               {ranksArray
//                 .filter((list) => list.id === activeRanksList?.id)
//                 .map((positionRanksList: PositionRanksList, index) => {
//                   return (
//                     <div key={positionRanksList.id}>
//                       <h3>{positionRanksList.title}</h3>
//                     </div>
//                   );
//                 })}
//             </h3>
//           </div>
//           {/* Ranks List Title End */}

//           {ranksArray
//             .filter((list) => list.id === activeRanksList?.id)
//             .map((positionRanksList: PositionRanksList, index) => {
//               return (
//                 <PositionRanksByUser
//                   positionRanks={positionRanksList.positionRanks}
//                   key={positionRanksList.id}
//                   playerRanksListId={positionRanksList.id}
//                   ranksArray={ranksArray}
//                   handleActiveRanksList={handleActiveRanksList}
//                   activeRanksList={activeRanksList}
//                 />
//               );
//             })}
//         </div>
//         {/* <PositionRanks positionRanks={positionRanks} /> */}
//         <PlayerList
//           players={listOfPlayers}
//           playerRanksListId={playerListID}
//           draggedPlayer={draggedPlayer}
//           removedPlayer={removedPlayer}
//           handleSetDraggedPlayer={handleSetDraggedPlayer}
//           handleSetRemovedPlayer={handleSetRemovedPlayer}
//           activeRanksList={activeRanksList}
//         />
//       </DndContext>
//     </>
//   );
// };

// export default DragAndDrop;

"use client";
import React, { useEffect, useState } from "react";
import { APITypes, PositionRanksList } from "typings";
import PlayerList from "../../_components/PlayerList";
import PositionRanksByUser from "~/app/_components/PositionRanksByUser";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { playerListID } from "utils";
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
  const [removedPlayer, setRemovedPlayer] = useState<string | null>(null);

  const handleActiveRanksList = (id: string) => {
    const activeList = ranksArray.find((list) => list.id === id);
    if (activeList) setActiveRanksList(activeList);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    let isAdded = false;
    let isRemoved = false;
    let doesPlayerExist = false;

    if (!over) return;
    // if (!active.data.current) return;

    const getListPos = (id: string) => {
      return ranksArray.findIndex((item) => item.id === id);
    };

    const droppedListID = over.id;
    console.log("active", active);

    // if (over.id === active.data.current.playerRanksListId) return;

    const playerId = active.id as string;

    // const newStatus = over.id;

    // Adds player to user's ranks list

    ranksArray.map((list) => {
      if (list.id === active.data.current?.playerRanksListId) return;
      list.positionRanks.map((player) => {
        if (String(active.id) === String(player.player_id)) {
          doesPlayerExist = true;
        }
        return player;
      });
    });

    setRanksArray(() => {
      return ranksArray.map((list) => {
        if (
          list.id === droppedListID &&
          active.data.current?.position === list.position &&
          !doesPlayerExist
        ) {
          isAdded = true;
          return {
            ...list,
            positionRanks: [
              ...list.positionRanks,
              active.data.current as APITypes,
            ],
          };

          // Adds player to user's ranks list end
          // Removes player from user's ranks list and adds back to player list
        } else if (
          droppedListID === playerListID &&
          active.data.current?.position === list.position
        ) {
          isRemoved = true;
          return {
            ...list,
            positionRanks: list.positionRanks.filter(
              (player) => String(player.player_id) !== playerId,
            ),
          };
        }

        // Removes player from user's ranks list and adds back to player list end
        return list;
      });
    });

    // What does this do?
    setListOfPlayers(() => {
      return listOfPlayers.filter((player) => {
        // console.log("PLAYER ID", playerId);
        // console.log("player.player_id", player.player_id);
        if (String(player.player_id) === playerId) {
          // console.log("PLAYER", player);
        }
        return String(player.player_id) !== playerId;
      });
    });
    // What does this do end

    // Removes dragged player from player list
    if (isAdded) setDraggedPlayer(playerId);
    if (isRemoved) setRemovedPlayer(playerId);
  };

  const handleSetDraggedPlayer = () => {
    setDraggedPlayer(null);
  };
  const handleSetRemovedPlayer = () => {
    setRemovedPlayer(null);
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

          {/* Ranks List Title */}
          <div>
            <h3>
              {ranksArray
                .filter((list) => list.id === activeRanksList?.id)
                .map((positionRanksList: PositionRanksList, index) => {
                  return (
                    <div key={positionRanksList.id}>
                      <h3>{positionRanksList.title}</h3>
                    </div>
                  );
                })}
            </h3>
          </div>
          {/* Ranks List Title End */}

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
          playerRanksListId={playerListID}
          draggedPlayer={draggedPlayer}
          removedPlayer={removedPlayer}
          handleSetDraggedPlayer={handleSetDraggedPlayer}
          handleSetRemovedPlayer={handleSetRemovedPlayer}
        />
      </DndContext>
    </>
  );
};

export default DragAndDrop;
