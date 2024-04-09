"use client";

import Button from "@/components/Button";
import HomeChessboard from "@/components/HomeChessboard";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

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
              router.push("/home/solve");
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
