// "use client";
import { auth } from "~/server/auth/config";
import { PositionRanksList } from "typings";
import { api } from "~/trpc/server";

import PlayerList from "../../_components/PlayerList";
import DragAndDrop from "./DragAndDrop";
import { filterPlayers } from "utils";
// import PlayersContext, { PlayersContextType } from "~/context/playersContext";

const getPlayers = async () => {
  const players = await api.sleeperApi.getAllPlayers();

  return players;
};

//  Get PositionRanks from DB
const getPositionRanksListsByUser = async () => {
  // const positionRanks = await api.sleeperApi.getPositionRanks();
  const positionRanks = [] as PositionRanksList[];

  return positionRanks;
};

const Home = async () => {
  const players = await getPlayers();

  const positionRanksArray = await getPositionRanksListsByUser();

  // Temp data until DB is setup

  positionRanksArray.push({
    id: "QB RANKS LIST",
    // positionRanks: players.slice(0, 5),
    positionRanks: filterPlayers(players, "", "QB").slice(0, 5),
    createdBy: "Andrew",
    position: "QB",
    title: "QB Ranks 2025",
  });

  positionRanksArray.push({
    id: "RB RANKS LIST",
    // positionRanks: players.slice(13, 17),
    positionRanks: filterPlayers(players, "", "RB").slice(0, 5),
    createdBy: "Andrew",
    position: "RB",
    title: "RB Ranks 2025",
  });

  const positionRanks = players.slice(0, 10);

  // Temp data until DB is setup end

  // const { playerSearch, handlePlayerSearchPosition } = useContext(
  //   PlayersContext,
  // ) as PlayersContextType;

  const session = await auth();

  return (
    <div>
      <h1>Home</h1>

      <div className="grid grid-cols-2 gap-2">
        <DragAndDrop
          players={players}
          positionRanksArray={positionRanksArray}
        />
      </div>
    </div>
  );
};

export default Home;
