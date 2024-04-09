import React from "react";

// Dynamic import for Chessboard component
const Chessboard = React.lazy(() => import("chessboardjsx"));

const HomeChessboard = () => {
  const calcWidth = ({ screenWidth, screenHeight }: any) => {
    return Math.min(screenWidth, screenHeight) * 0.5;
  };

  return (
    <div className="p-4">
      {typeof window !== "undefined" && (
        <React.Suspense fallback={<div>Loading...</div>}>
          <Chessboard position="start" calcWidth={calcWidth} />
        </React.Suspense>
      )}
    </div>
  );
};

export default HomeChessboard;
