"use client";

import { loadTactic } from "@/app/http";
import { Tactic } from "@/app/types";
import Button from "@/components/Button";
import Timer from "@/components/Timer";
import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import React, { useEffect, useRef, useState } from "react";

export default function Solve({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Tactic>();
  const [game, setGame] = useState<Chess>();

  const [tries, setTries] = useState(0);

  useEffect(() => {
    const res = loadTactic(params.id);
    console.log(res);
    res.then((data) => setData(data));

    setGame(new Chess());
  }, []);

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

  function onDrop({ sourceSquare, targetSquare }: any) {
    console.log("onDrop", { sourceSquare, targetSquare });

    const expGame = game;

    console.log(expGame);

    try {
      let move = expGame?.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
    } catch (error) {
      console.error("Invalid move ARG", error);
      setTries(tries + 1);
    }

    console.log(expGame);
  }

  return (
    <main className="grid grid-cols-3 border border-gray-300 m-10">
      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">{data?.id}</div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">{data?.title}</div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">{data?.created_by}</div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">{data?.difficulty_level}</div>
      </div>

      <div className="flex justify-center items-center border border-gray-300 row-span-3">
        <div ref={divRef} style={{ width: "100%", height: "100%" }}>
          {/* Conditional rendering of Chessboard component */}
          {typeof window !== "undefined" && (
            <React.Suspense fallback={<div>Loading...</div>}>
              <Chessboard
                width={width}
                position={data?.questionFen}
                onDrop={onDrop}
              />
            </React.Suspense>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">
          <Timer />
        </div>
      </div>

      <div className="flex justify-center items-center border border-gray-300 row-span-2">
        <div></div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">Tries: {tries}</div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="m-4">
          <Button text="Show me the solution" action={showSolution} />
        </div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">Tag: {data?.tag}</div>
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
