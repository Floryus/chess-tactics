"use client";

import Button from "@/components/Button";
import HomeChessboard from "@/components/HomeChessboard";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const { isLoaded, userId, sessionId, getToken } = useAuth();
  useEffect(() => {
    if (isLoaded && userId && sessionId) {
      router.push("/home/");
    }
  }, []);

  return (
    <div className="grid grid-cols-2 border border-gray-300 m-10">
      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-12 text-xl">
          Elevate your chess skills with personalized puzzles using Spaced
          Repetition Flashcards
        </div>
      </div>
      <div className="flex justify-center items-center border border-gray-300 row-span-2">
        <div>
          <HomeChessboard />
        </div>
      </div>
      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-10 flex justify-center items-center h-100">
          <Button
            text="Get started"
            action={() => {
              router.push("/login");
            }}
            width={28}
          />
        </div>
      </div>
    </div>
  );
}
