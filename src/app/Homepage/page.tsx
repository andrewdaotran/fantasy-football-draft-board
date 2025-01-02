import Link from "next/link";
import React from "react";
import { auth, signOut, signIn } from "~/server/auth";
import { APITypes } from "apiTypes";

const getData = async () => {
  const data = await fetch("https://api.sleeper.app/v1/players/nfl");

  return data.json() as Promise<Record<string, APITypes>>;

  // return Object.entries(data);
};

const Home = async () => {
  const apiData = await getData();
  const dataArray = Object.entries(apiData);

  console.log(dataArray[4891]);

  const session = await auth();
  return (
    <div>
      <h1>Home</h1>
      <div>
        {dataArray
          .filter((player) => {
            return (
              player[1].status === "Active" &&
              player[1].position === "QB" &&
              player[1].depth_chart_order !== null
            );
          })
          .map((player) => {
            return (
              <div key={player[0]}>
                <p>{player[1].full_name}</p>
                <p>{player[0]}</p>
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

            <button
              onClick={async () => {
                "use server";
                await signOut();
              }}
            >
              <span>Sign OUt</span>
            </button>

            {/* <Link href="/">Sign out</Link> */}

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

            {/* <Link href="/startup/create">Sign in</Link> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
