"use client";

import Button from "@/components/Button";
import HomeChessboard from "@/components/HomeChessboard";

export default function Solve() {
  const time = new Date().toLocaleTimeString();

  function showSolution() {
    console.log("show solution");
  }

  function showNextPuzzle() {
    console.log("show next puzzle");
  }

  return (
    <div className="grid grid-cols-3 border border-gray-300 m-10">
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
        <div>
          <HomeChessboard></HomeChessboard>
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
          <Button
            text="Show me the solution"
            action={showSolution}
            width={28}
          ></Button>
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
    </div>
  );
}
