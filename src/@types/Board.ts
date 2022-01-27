export interface BoardProps {
  squares: Array<string | null>;
  winnerSquares: Array<number>;
  onClick: (i: number) => void;
}

export interface BoardState {
  squares: Array<string>;
  winnerSquares: Array<number>;
}
