import Link from "next/link";
import React from "react";
import { auth, signOut, signIn } from "~/server/auth";

const Home = async () => {
  // const data = fetch("https://api.sleeper.app/v1/players/nfl");

  const session = await auth();
  return (
    <div>
      <h1>Home</h1>
      {/* <p>{data}</p> */}

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

            <Link href={`/user/${session?.id}`}>
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
