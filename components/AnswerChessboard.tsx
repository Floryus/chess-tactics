"use client";

import React, { useEffect } from "react";

interface AnswerChessboardProps {
  width: number;
  onDrop: any;
  position: any;
  orientation: "white" | "black";
}

// Dynamic import for Chessboard component
const Chessboard = React.lazy(() => import("chessboardjsx"));

export default function AnswerChessboard({
  width,
  onDrop,
  position,
  orientation,
}: AnswerChessboardProps) {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Chessboard
        width={width}
        onDrop={onDrop}
        sparePieces
        position={position}
        orientation={orientation}
        dropOffBoard="trash"
      />
    </React.Suspense>
  );
}
