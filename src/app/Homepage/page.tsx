import Link from "next/link";
import React, { useContext } from "react";
import { auth, signOut, signIn } from "~/server/auth";
import { APITypes } from "typings";
import { api } from "~/trpc/server";
import { playerPositions } from "utils";

const getPlayers = async () => {
  const players = await api.sleeperApi.getAllPlayers();

  return players;
};

const Home = async () => {
  const players = await getPlayers();

  const session = await auth();

  // console.log("players".includes("plad"));
  // console.log("hello");

  const filteredPlayers = (playerName: string = "", filter: string = "QB") => {
    return players
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
                player.position === "DEF") &&
              player.depth_chart_order !== null &&
              player.status === "Active"
            );

          if (filter === "FLEX") {
            return (
              (player.position === "RB" ||
                player.position === "WR" ||
                player.position === "TE") &&
              player.depth_chart_order !== null &&
              player.status === "Active"
            );
          } else {
            return (
              player.position === filter &&
              player.depth_chart_order !== null &&
              player.status === "Active"
            );
          }
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
  };
  return (
    <div>
      <h1>Home</h1>

      {/* Player Search */}
      <input
        type="text"
        placeholder="Player Name"
        className="input input-bordered input-primary w-full max-w-xs"
      />

      <details className="dropdown">
        <summary className="btn m-1">Position</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          {playerPositions.map((position) => {
            return (
              <li
                key={position}
                // onClick={() => handlePlayerSearchPosition(position)}
              >
                <a>{position}</a>
              </li>
            );
          })}
        </ul>
      </details>

      <div>
        {filteredPlayers().map((player) => {
          return (
            <div key={player.player_id}>
              <p>{player.full_name}</p>
              {/* <p>{player}</p> */}
              <p>{player.search_rank.toString()}</p>
              {/* <p>{player[1].full_name}</p>
                <p>{player[0]}</p>
                <p>{player[1].search_rank.toString()}</p> */}
            </div>
          );
        })}
      </div>

      <div>
        <p></p>
      </div>

      {/* Auth temp 1:20:16 in JS Mastery Next.js 15 Crash Course*/}
      <div>
        {session && session?.user ? (
          <div>
            <p>Logged in as {session.user.name}</p>

            <Link href="/startup/create">
              <span>Create </span>
            </Link>

            {/* <button
              onClick={async () => {
                "use server";
                await signOut();
              }}
            >
              <span>Sign OUt</span>
            </button> */}

            {/* <Link href="/">Sign out</Link> */}

            <Link href={`/user/${session?.user?.id}`}>
              <span>{session?.user?.name}</span>
            </Link>
          </div>
        ) : (
          <div>
            {/* <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button type="submit">Login</button>
            </form> */}

            {/* <Link href="/startup/create">Sign in</Link> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
