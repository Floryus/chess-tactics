"use client";

import Button from "@/components/Button";
import Chessboard from "chessboardjsx";
import { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";

export default function Solve() {
  const time = new Date().toLocaleTimeString();

  function showSolution() {
    console.log("show solution");
  }

  function showNextPuzzle() {
    console.log("show next puzzle");
  }

  const [width, setWidth] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (divRef.current) {
        const newWidth = divRef.current.offsetWidth;
        setWidth(newWidth);
      }
    };

    updateWidth();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateWidth);

      return () => {
        window.removeEventListener("resize", updateWidth);
      };
    }
  }, []);

  return (
    <main className="grid grid-cols-3 border border-gray-300 m-10">
      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">#629186</div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">Find the correct move for white</div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">{time}</div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">Last seen: 1d</div>
      </div>

      <div className="flex justify-center items-center border border-gray-300 row-span-3">
        <div ref={divRef} style={{ width: "100%", height: "100%" }}>
          <Chessboard width={width} />
        </div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">Time: 10s</div>
      </div>

      <div className="flex justify-center items-center border border-gray-300 row-span-2">
        <div></div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">Tries: 1</div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="m-4">
          <Button text="Show me the solution" action={showSolution} />
        </div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">Tags: Endgame</div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">This was incorrect!</div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">
          <button onClick={showNextPuzzle}> Next &gt;</button>
        </div>
      </div>
    </main>
  );
}
