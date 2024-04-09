"use client";

import Button from "@/components/Button";
import Chessboard from "chessboardjsx";
import React, { useEffect, useRef, useState } from "react";

export default function Solve({ params }: { params: { id: string } }) {
  const time = new Date().toLocaleTimeString();
  console.log(params.id);

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

    if (window !== undefined) {
      window.addEventListener("resize", updateWidth);

      return () => {
        window.removeEventListener("resize", updateWidth);
      };
    }
  }, []);

  // Dynamic import for Chessboard component
  const Chessboard = React.lazy(() => import("chessboardjsx"));

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
          {/* Conditional rendering of Chessboard component */}
          {typeof window !== "undefined" && (
            <React.Suspense fallback={<div>Loading...</div>}>
              <Chessboard width={width} />
            </React.Suspense>
          )}
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