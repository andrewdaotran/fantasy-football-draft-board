import React from "react";

const login = () => {
  return (
    <div>
      <p> this is the login page</p>
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
    </div>
  );
};

export default login;
