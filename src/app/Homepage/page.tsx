// "use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { auth, signOut, signIn } from "~/server/auth";
import { APITypes } from "typings";
import { api } from "~/trpc/server";

import PlayerList from "./PlayerList";
// import PlayersContext, { PlayersContextType } from "~/context/playersContext";

const getPlayers = async () => {
  const players = await api.sleeperApi.getAllPlayers();

  return players;
};

const Home = async () => {
  const players = await getPlayers();

  // const { playerSearch, handlePlayerSearchPosition } = useContext(
  //   PlayersContext,
  // ) as PlayersContextType;

  const session = await auth();

  return (
    <div>
      <h1>Home</h1>

      {/* Auth temp 1:20:16 in JS Mastery Next.js 15 Crash Course*/}
      {/* <div>
        {session && session?.user ? (
          <div>
            <p>Logged in as {session.user.name}</p>

            <Link href="/startup/create">
              <span>Create </span>
            </Link>

            <button
              onClick={async () => {
                "use server";
                await signOut();
              }}
            >
              <span>Sign OUt</span>
            </button>

            <Link href="/">Sign out</Link>

            <Link href={`/user/${session?.user?.id}`}>
              <span>{session?.user?.name}</span>
            </Link>
          </div>
        ) : (
          <div>
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button type="submit">Login</button>
            </form>

            <Link href="/startup/create">Sign in</Link>
          </div>
        )}
      </div> */}

      <PlayerList players={players} />

      <div>
        <p></p>
      </div>
    </div>
  );
};

export default Home;
