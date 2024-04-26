"use client";

import React, { useEffect } from "react";

interface CreateChessboardProps {
  width: number;
  onDrop: any;
  position: any;
  orientation: "white" | "black";
}

// Dynamic import for Chessboard component
const Chessboard = React.lazy(() => import("chessboardjsx"));

export default function CreateChessboard({
  width,
  onDrop,
  position,
  orientation,
}: CreateChessboardProps) {
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
