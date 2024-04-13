"use client";

import { loadTactic } from "@/app/http";
import { Tactic } from "@/app/types";
import Button from "@/components/Button";
import FadingText from "@/components/FadingText";
import SolveChessboard from "@/components/SolveChessboard";
import { Chess } from "chess.js";
import React, { useEffect, useRef, useState } from "react";

export default function Solve({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Tactic>();
  const [game, setGame] = useState<Chess>();

  const [currentFen, setCurrentFen] = useState<string>("");
  const [solved, setSolved] = useState(false);

  const [tries, setTries] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [fadingText, setFadingText] = useState(0);

  useEffect(() => {
    if (!solved) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [solved]);

  useEffect(() => {
    const res = loadTactic(params.id);
    console.log(res);
    res.then((data) => setData(data));

    const currGame = new Chess(data?.questionFen);
    console.log("currGame", currGame);
    setGame(currGame);
    setCurrentFen(currGame.fen());
  }, []);

  useEffect(() => {
    setFadingText(tries);
  }, [tries]);

  function showSolution() {
    setSolved(true);
    if (!data) {
      return;
    }
    setCurrentFen(data?.answerFen);
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

  function onDrop({ sourceSquare, targetSquare }: any) {
    if (!game || !data) {
      return;
    }

    try {
      game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
      if (game.fen() == data.answerFen) {
        console.log("Correct move", game.fen());
        setCurrentFen(game.fen());
        setSolved(true);
      } else {
        console.log("Incorrect move");
        setGame(new Chess(data.questionFen));
        setTries(tries + 1);
      }
    } catch (error) {
      console.error("Invalid move ARG", error);
      setTries(tries + 1);
    }
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
            <SolveChessboard
              solved={solved}
              width={width}
              currentFen={currentFen}
              onDrop={onDrop}
            />
          )}
        </div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">{seconds}s</div>
      </div>

      <div className="flex justify-center items-center border border-gray-300 row-span-2">
        <div></div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">Tries: {tries}</div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="m-4">
          {solved ? (
            <div className={` mx-auto  border border-gray-500 py-2 px-2 `}>
              <button className="text-xl items-center flex justify-center text-gray-500 cursor-not-allowed">
                Show me the solution
              </button>
            </div>
          ) : (
            <div className={` mx-auto  border border-gray-300 py-2 px-2 `}>
              <button
                className="text-xl items-center flex justify-center "
                onClick={showSolution}
              >
                Show me the solution
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">Tag: {data?.tag}</div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">
          {fadingText > 0 ? (
            <FadingText tries={tries} text={"This was incorrect!"} />
          ) : (
            <></>
          )}
          {solved ? <>Correct!</> : <></>}
        </div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">
          <button onClick={showNextPuzzle}> Next &gt;</button>
        </div>
      </div>
    </main>
  );
}
