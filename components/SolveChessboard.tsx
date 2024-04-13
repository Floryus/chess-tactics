"use client";

import React from "react";

interface SolveChessboardProps {
  width: number;
  currentFen: string;
  onDrop: any;
  solved: boolean;
}

// Dynamic import for Chessboard component
const Chessboard = React.lazy(() => import("chessboardjsx"));

export default function SolveChessboard({
  width,
  currentFen,
  onDrop,
  solved,
}: SolveChessboardProps) {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Chessboard
        draggable={!solved}
        width={width}
        position={currentFen}
        onDrop={onDrop}
      />
    </React.Suspense>
  );
}
