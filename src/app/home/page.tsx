import Link from "next/link";
import React from "react";
import { auth } from "~/server/auth";

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
            <Link href="/api/auth/signout">Sign out</Link>
          </div>
        ) : (
          <Link href="/api/auth/signin">Sign in</Link>
        )}
      </div>
    </div>
  );
};

export default Home;
