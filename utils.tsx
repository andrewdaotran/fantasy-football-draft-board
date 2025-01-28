import { APITypes } from "typings";

export const playerPositions = ["QB", "RB", "WR", "TE", "FLEX", "K", "D/ST"];

export const filterPlayers = (
  players: APITypes[],
  playerName: string = "",
  filter: string = "QB",
) => {
  const filteredPlayers = players
    .filter((player) => {
      const finalFilter = () => {
        if (playerName)
          return (
            player.full_name
              ?.toLowerCase()
              .includes(playerName.toLowerCase()) &&
            (player.position === "QB" ||
              player.position === "RB" ||
              player.position === "WR" ||
              player.position === "TE" ||
              player.position === "K" ||
              player.position === "D/ST") &&
            player.depth_chart_order !== null &&
            player.status === "Active"
          );

        // if (filter === "FLEX") {
        //   return (
        //     (player.position === "RB" ||
        //       player.position === "WR" ||
        //       player.position === "TE") &&
        //     player.depth_chart_order !== null &&
        //     player.status === "Active"
        //   );
        // } else {
        return (
          player.position === filter &&
          player.depth_chart_order !== null &&
          player.status === "Active"
        );
        // }
      };

      return finalFilter();
    })
    .sort((a, b) => {
      if (a.search_rank > b.search_rank) {
        return 1;
      }
      if (a.search_rank < b.search_rank) {
        return -1;
      }
      return 0;
    });

  const indexedFilteredPlayers = filteredPlayers.map((player, index) => {
    return { ...player, positionIndex: index };
  });

  return indexedFilteredPlayers;
};
