import Chessboard from "chessboardjsx";

const HomeChessboard = () => {
  const calcWidth = ({ screenWidth, screenHeight }: any) => {
    return Math.min(screenWidth, screenHeight) * 0.5;
  };

  return (
    <div className="p-4">
      <Chessboard position="start" calcWidth={calcWidth} />
    </div>
  );
};

export default HomeChessboard;
