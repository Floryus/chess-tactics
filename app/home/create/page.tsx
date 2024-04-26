"use client";

import { saveTactic } from "@/app/http";
import {
  PositionObject,
  Tactic,
  getPositionFEN,
  startPosition,
} from "@/app/types";
import Actions from "@/components/Actions";
import AnswerChessboard from "@/components/AnswerChessboard";
import CreateChessboard from "@/components/CreateChessboard";
import Difficulties from "@/components/Difficulties";
import Tags from "@/components/Tags";
import { useUser } from "@clerk/nextjs";
import { Chess } from "chess.js";
import React, { useEffect, useRef, useState } from "react";

export default function Create() {
  const userId = useUser().user?.id;

  const [value, setValue] = useState("");
  const [game, setGame] = useState<Chess>();

  const [position, setPosition] = useState({});
  const [whiteMoves, setWhiteMoves] = useState(true);

  const [orientation, setOrientation] = useState<"white" | "black">("white");

  const [errorString, setErrorString] = useState("");
  const [tag, setTag] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");

  const [creationStep, setCreationStep] = useState(0);
  const [questionFen, setQuestionFen] = useState("");
  const [solutionFen, setSolutionFen] = useState("");
  const [answerFen, setAnswerFen] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleInputApply = () => {
    console.log("Apply input", value);
  };

  function saveFirstStep() {
    let fen = "";
    if (whiteMoves) {
      fen = getPositionFEN(position, "w");
    } else {
      fen = getPositionFEN(position, "b");
    }
    console.log("savePuzzle", fen);
    try {
      const riddle = new Chess(fen);
      setErrorString("");
      console.log(riddle.fen());
      setQuestionFen(riddle.fen());
      setSolutionFen(riddle.fen());
      setCreationStep(1);
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error", error.message);
        if (error.message.includes("Invalid FEN")) {
          setErrorString(error.message.replace("Invalid FEN: ", ""));
        }
      }
    }
  }

  function saveSecondStep() {
    if (questionFen == answerFen) {
      setErrorString("Invalid tactic");
      return;
    }
    console.log("Save tactic", questionFen, answerFen, tag);

    if (!userId) {
      return;
    }
    if (
      difficulty != "Easy" &&
      difficulty != "Intermediate" &&
      difficulty != "Hard"
    ) {
      return;
    }

    const newTactic: Tactic = {
      id: "", // db will generate id
      title: "New tactic",
      questionFen: questionFen,
      answerFen: answerFen,
      difficulty_level: difficulty,
      tag: tag,
      created_by: userId,
      created_at: "", //db will generate timestamp
    };

    saveTactic(newTactic);
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

  useEffect(() => {
    setGame(new Chess());
  }, []);

  function onDropCreate({ sourceSquare, targetSquare, piece }: any) {
    console.log("onDrop", sourceSquare, targetSquare, piece);
    let pos: PositionObject = {};
    if (sourceSquare == "spare") {
      pos = {
        [targetSquare]: piece,
        ...position,
      };
    } else {
      pos = {
        [targetSquare]: piece,
        ...position,
      };
      delete pos[sourceSquare];
    }
    setPosition(pos);
    console.log("position", pos);
  }

  function onDropAnswer({ sourceSquare, targetSquare }: any) {
    if (!questionFen) {
      return;
    }
    const setup = new Chess(questionFen);
    try {
      setup.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
      console.log("Valid move", setup.fen());
      setSolutionFen(setup.fen());
      setAnswerFen(setup.fen());
    } catch (error) {
      console.error("Invalid move ARG", error);
      setErrorString("Invalid move");
    }
  }

  function handleStartPos() {
    setPosition(startPosition);
  }

  function handleClearBoard() {
    setPosition({});
  }

  function handleFlipBoard() {
    setOrientation(orientation === "white" ? "black" : "white");
  }

  return (
    <main className="grid grid-cols-3 border border-gray-300 m-10">
      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">Create tactic</div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2 text-red-400 transition-all duration-500 ">
          {errorString}
        </div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">
          {whiteMoves ? (
            <>
              <button>WHITE</button> -{" "}
              <button
                onClick={() => {
                  setWhiteMoves(false);
                }}
                className="text-gray-500"
              >
                BLACK
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setWhiteMoves(true);
                }}
                className="text-gray-500"
              >
                WHITE
              </button>{" "}
              - <button>BLACK</button>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">
          <Difficulties stateTag={setDifficulty} />
        </div>
      </div>

      <div className="flex justify-center items-center border border-gray-300 row-span-2">
        <div
          ref={divRef}
          style={{ width: "100%", height: "100%" }}
          className="bg-gray-300"
        >
          {/* Conditional rendering of Chessboard component */}
          {typeof window !== "undefined" && (
            <>
              {creationStep === 0 ? (
                <CreateChessboard
                  position={position}
                  width={width}
                  onDrop={onDropCreate}
                  orientation={orientation}
                />
              ) : (
                <AnswerChessboard
                  position={solutionFen}
                  width={width}
                  onDrop={onDropAnswer}
                  orientation={orientation}
                />
              )}
            </>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2 flex flex-col ">
          <Actions text="Start position" emoji="♟️" onClick={handleStartPos} />
          <Actions text="Clear board" emoji="❌" onClick={handleClearBoard} />
          <Actions text="Flip board" emoji="🔁" onClick={handleFlipBoard} />
        </div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">
          <Tags stateTag={setTag} />
        </div>
      </div>

      <div className="flex justify-center items-center border border-gray-300">
        <div className="p-2">
          <div className={` mx-auto  border border-gray-300 py-2 px-2 `}>
            {creationStep === 0 ? (
              <button
                className="text-xl items-center flex justify-center "
                onClick={saveFirstStep}
              >
                Next
              </button>
            ) : (
              <button
                className="text-xl items-center flex justify-center "
                onClick={saveSecondStep}
              >
                Save tactic
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
