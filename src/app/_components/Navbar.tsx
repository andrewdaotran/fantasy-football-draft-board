import React from "react";
import { auth, signIn, signOut } from "auth";
import Link from "next/link";
// import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

const Navbar = async () => {
  const session = await auth();
  console.log("session", session);
  return (
    <>
      {/* Auth temp 1:20:16 in JS Mastery Next.js 15 Crash Course*/}
      <header className="bg-white px-5 py-3 shadow-sm">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image src="/logo.png" alt="website logo" width={144} height={40} />
          </Link>
          <div className="flex items-center gap-5 text-black">
            {session && session?.user ? (
              <>
                <p>Logged in as {session.user.name}</p>

                <Link href="/startup/create">
                  <span>Create </span>
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <button type="submit">
                    <span>Sign Out</span>
                  </button>
                </form>

                {/* <Link href="/">Sign out</Link> */}

                <Link href={`/user/${session?.user?.id}`}>
                  <span>{session?.user?.name}</span>
                </Link>
              </>
            ) : (
              <>
                <form
                  action={async () => {
                    "use server";
                    await signIn("google", { redirectTo: "/hello" }); //01/14/2025 fix to redirect to user page
                  }}
                >
                  <button type="submit">Sign In</button>
                </form>

                {/* <Link href="/startup/create">Sign up</Link> */}
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
