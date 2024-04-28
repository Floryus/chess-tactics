"use client";

import Button from "@/components/Button";
import HomeChessboard from "@/components/HomeChessboard";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { loadNextTactic } from "../http";

export default function Home() {
  const router = useRouter();
  const userId = useUser().user?.id;

  async function startLearning() {
    if (!userId) {
      console.log("startLearing: no user id");
      return;
    }
    const tactidId = await loadNextTactic(userId);
    console.log("next tactic", tactidId);
    router.push("/home/solve/" + tactidId);
  }

  return (
    <div className="grid grid-cols-2 border border-gray-300 m-10 w-full">
      <div>
        <div className="justify-center border border-gray-300 p-4">
          <Button
            text="Create a new tactic"
            action={() => {
              router.push("/home/create");
            }}
          />
        </div>
        <div className="justify-center items-center border border-gray-300 p-4">
          <Button
            text="Browse Tactics"
            action={() => {
              router.push("/home/browse");
            }}
          />
        </div>
        <div className="justify-center items-center border border-gray-300 p-4">
          <Button
            text="Solve Tactics"
            action={() => {
              startLearning();
            }}
          />
        </div>
      </div>
      <div className="mx-auto my-auto">
        <Image
          src="/5569495.png"
          alt="Logo"
          width={200}
          height={200}
          className="mr-8"
        />
      </div>
    </div>
  );
}
