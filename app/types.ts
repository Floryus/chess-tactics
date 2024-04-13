export interface Tactic {
  id: string;
  title: string;
  questionFen: string;
  answerFen: string;
  difficulty_level: "Easy" | "Intermediate" | "Hard";
  tag: string;
  created_by: string;
  created_at: string;
}

export type PositionObject = { [key: string]: string };

export const startPosition: PositionObject = {
  a1: "wR",
  b1: "wN",
  c1: "wB",
  d1: "wQ",
  e1: "wK",
  f1: "wB",
  g1: "wN",
  h1: "wR",
  a2: "wP",
  b2: "wP",
  c2: "wP",
  d2: "wP",
  e2: "wP",
  f2: "wP",
  g2: "wP",
  h2: "wP",
  a7: "bP",
  b7: "bP",
  c7: "bP",
  d7: "bP",
  e7: "bP",
  f7: "bP",
  g7: "bP",
  h7: "bP",
  a8: "bR",
  b8: "bN",
  c8: "bB",
  d8: "bQ",
  e8: "bK",
  f8: "bB",
  g8: "bN",
  h8: "bR",
};

function createEmptyBoard(): string[][] {
  return Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => ""));
}

export function getPositionFEN(
  position: PositionObject,
  nextToMove: "w" | "b"
): string {
  const board: string[][] = createEmptyBoard();

  for (const square in position) {
    if (position.hasOwnProperty(square)) {
      const piece = position[square];
      const file = square[0].charCodeAt(0) - "a".charCodeAt(0);
      const rank = 8 - parseInt(square[1], 10);
      board[rank][file] = piece;
    }
  }
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const piece = board[rank][file];
      if (piece.length === 2) {
        const color = piece[0];
        const type = piece[1];
        if (color === "w") {
          board[rank][file] = type.toUpperCase();
        } else if (color === "b") {
          board[rank][file] = type.toLowerCase();
        }
      }
    }
  }
  const fenRows = board.map(convertRowToString);
  let fen = "";
  fen = fenRows.join("/");
  fen += ` ${nextToMove} - - 0 1`;
  return fen;
}

function convertRowToString(row: string[]): string {
  let rowString = "";
  let emptyCount = 0;

  for (let i = 0; i < row.length; i++) {
    if (row[i] === "") {
      emptyCount++;
    } else {
      if (emptyCount > 0) {
        rowString += emptyCount;
        emptyCount = 0;
      }
      rowString += row[i];
    }
  }

  if (emptyCount > 0) {
    rowString += emptyCount;
  }

  return rowString;
}
