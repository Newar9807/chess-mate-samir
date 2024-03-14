// Helper function to convert column characters to integers
const colToIndex = (col) => col.charCodeAt(0) - "a".charCodeAt(0);

// Helper function to convert integers to column characters
const indexToCol = (index) => String.fromCharCode(index + "a".charCodeAt(0));

const calculatePossibleMoves = (pieceType, currentPosition, chessRef) => {
  const col = currentPosition[0];
  const row = parseInt(currentPosition[1]);

  switch (pieceType) {
    case "wp":
    case "bp":
      return calculatePawnMoves(pieceType[0], col, row, chessRef);
    case "wr":
    case "br":
      return calculateRookMoves(col, row, chessRef);
    case "wn":
    case "bn":
      return calculateKnightMoves(col, row, chessRef);
    case "wb":
    case "bb":
      return calculateBishopMoves(col, row, chessRef);
    case "wq":
    case "bq":
      return calculateQueenMoves(col, row, chessRef);
    case "wk":
    case "bk":
      return calculateKingMoves(col, row, chessRef);
    default:
      return [];
  }
};

const calculateBishopMoves = (col, row, chessRef) => {
  const moves = [];
  for (let i = 1; i <= 7; i++) {
    const newCol1 = colToIndex(col) + i;
    const newRow1 = row + i;
    const newCol2 = colToIndex(col) - i;
    const newRow2 = row + i;
    const newCol3 = colToIndex(col) + i;
    const newRow3 = row - i;
    const newCol4 = colToIndex(col) - i;
    const newRow4 = row - i;

    if (isValidMove(colToIndex(col), row, newCol1, newRow1, chessRef))
      moves.push(`${indexToCol(newCol1)}${newRow1}`);
    if (isValidMove(colToIndex(col), row, newCol2, newRow2, chessRef))
      moves.push(`${indexToCol(newCol2)}${newRow2}`);
    if (isValidMove(colToIndex(col), row, newCol3, newRow3, chessRef))
      moves.push(`${indexToCol(newCol3)}${newRow3}`);
    if (isValidMove(colToIndex(col), row, newCol4, newRow4, chessRef))
      moves.push(`${indexToCol(newCol4)}${newRow4}`);
  }
  return moves;
};

const calculateQueenMoves = (col, row, chessRef) => {
  return [
    ...calculateRookMoves(col, row, chessRef),
    ...calculateBishopMoves(col, row, chessRef),
  ];
};

const calculateKingMoves = (col, row, chessRef) => {
  const moves = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = row + i;
      const newCol = colToIndex(col) + j;

      if (isValidMove(colToIndex(col), row, newCol, newRow, chessRef)) {
        moves.push(`${indexToCol(newCol)}${newRow}`);
      }
    }
  }
  return moves;
};

const calculatePawnMoves = (color, col, row, chessRef) => {
  const moves = [];

  // Forward move
  const forwardRow = color === "w" ? row + 1 : row - 1;
  if (
    isValidMove(colToIndex(col), row, colToIndex(col), forwardRow, chessRef)
  ) {
    moves.push(`${col}${forwardRow}`);
  }

  // Two steps forward on the first move
  const initialForwardRow = color === "w" ? row + 2 : row - 2;
  if (
    (color === "w" && row === 1) ||
    (color === "b" && row === 6) // Check if it's the first move
  ) {
    if (
      isValidMove(
        colToIndex(col),
        row,
        colToIndex(col),
        initialForwardRow,
        chessRef
      )
    ) {
      moves.push(`${col}${initialForwardRow}`);
    }
  }

  // Diagonal capturing moves
  const leftDiagonal = colToIndex(col) - 1;
  const rightDiagonal = colToIndex(col) + 1;

  const leftDiagonalRow = color === "w" ? row + 1 : row - 1;
  const rightDiagonalRow = color === "w" ? row + 1 : row - 1;

  // Diagonal one step
  if (
    isValidMove(colToIndex(col), row, leftDiagonal, leftDiagonalRow, chessRef)
  ) {
    moves.push(`${indexToCol(leftDiagonal)}${leftDiagonalRow}`);
  }
  if (
    isValidMove(colToIndex(col), row, rightDiagonal, rightDiagonalRow, chessRef)
  ) {
    moves.push(`${indexToCol(rightDiagonal)}${rightDiagonalRow}`);
  }

  return moves;
};


const calculateRookMoves = (col, row, chessRef) => {
  const moves = [];

  // Horizontal moves
  for (let i = 0; i < 8; i++) {
    if (
      i !== row - 1 &&
      isValidMove(colToIndex(col), row, colToIndex(col), i + 1, chessRef)
    ) {
      moves.push(`${col}${i + 1}`);
    }
  }

  // Vertical moves
  for (let i = 0; i < 8; i++) {
    if (
      i !== colToIndex(col) - colToIndex("a") &&
      isValidMove(colToIndex(col), row, i + colToIndex("a"), row, chessRef)
    ) {
      moves.push(`${indexToCol(i + colToIndex("a"))}${row}`);
    }
  }

  return moves;
};

const calculateKnightMoves = (col, row, chessRef) => {
  const moves = [];

  // Knight moves in an L-shaped pattern
  const possibleMoves = [
    { col: colToIndex(col) + 2, row: row + 1 },
    { col: colToIndex(col) + 1, row: row + 2 },
    { col: colToIndex(col) - 1, row: row + 2 },
    { col: colToIndex(col) - 2, row: row + 1 },
    { col: colToIndex(col) - 2, row: row - 1 },
    { col: colToIndex(col) - 1, row: row - 2 },
    { col: colToIndex(col) + 1, row: row - 2 },
    { col: colToIndex(col) + 2, row: row - 1 },
  ];

  for (const move of possibleMoves) {
    if (
      move.col >= colToIndex("a") &&
      move.col <= colToIndex("h") &&
      move.row >= 1 &&
      move.row <= 8 &&
      isValidMove(colToIndex(col), row, move.col, move.row, chessRef)
    ) {
      moves.push(`${indexToCol(move.col)}${move.row}`);
    }
  }

  return moves;
};

// Validates the Move
const isValidMove = (fromCol, fromRow, toCol, toRow, chessRef) => {
  const from = indexToCol(fromCol) + fromRow.toString();
  const to = indexToCol(toCol) + toRow.toString();
  console.log("here: ",from,to);
  const moves = chessRef.moves({ verbose: true });
  const move = moves.find((m) => m.from === from && m.to === to);
  return move;
};

export default calculatePossibleMoves;
