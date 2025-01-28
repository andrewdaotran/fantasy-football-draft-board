import Link from "next/link";
import Homepage from "./(root)/Homepage/page";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth/config";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  // console.log("SESSION", session);

  // if (session?.user) {
  //   void api.post.getLatest.prefetch();
  // }

  return <Homepage />;
}
