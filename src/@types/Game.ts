export interface GameState {
  history: Array<{
    squares: Array<string | null>;
    squareClicked: number;
  }>;
  stepNumber: number;
  xIsNext: boolean;
  sortHistoryAscending: boolean;
}
