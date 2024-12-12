import { auth } from "auth";
import React from "react";

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
            <a href="/api/auth/signout">Sign out</a>
          </div>
        ) : (
          <a href="/api/auth/signin">Sign in</a>
        )}
      </div>
    </div>
  );
};

export default Home;
