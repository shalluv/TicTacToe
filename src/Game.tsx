import React from "react";
import Board from "./Board";

interface GameState {
  history: Array<{
    squares: Array<string | null>;
    squareClicked: number;
  }>;
  stepNumber: number;
  xIsNext: boolean;
  sortHistoryAscending: boolean;
}

class Game extends React.Component<{}, GameState> {
  constructor(props: never) {
    super(props);

    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          squareClicked: -1,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      sortHistoryAscending: true,
    };
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.calculateWinner() || squares[i]) return;
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: [
        ...history,
        {
          squares,
          squareClicked: i,
        },
      ],
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(stepNumber: number) {
    this.setState({
      stepNumber,
      xIsNext: stepNumber % 2 === 0,
    });
  }

  calculateWinner() {
    const squares = this.state.history[this.state.stepNumber].squares;
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; ++i) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return [a, b, c];
      }
    }
    if (!squares.includes(null)) {
      return [-1];
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner();

    const sortButton = (
      <button
        className="sort-button"
        onClick={() =>
          this.setState({
            sortHistoryAscending: !this.state.sortHistoryAscending,
          })
        }
      >
        {this.state.sortHistoryAscending ? "Ascending" : "Descending"}
      </button>
    );

    const moves = history.map((step, idx) => {
      const squareClickedRow = Math.floor(step.squareClicked / 3) + 1;
      const squareClickedCol = (step.squareClicked % 3) + 1;
      const desc =
        idx !== 0
          ? `Go to move #${idx} (${squareClickedRow}, ${squareClickedCol})`
          : "Go to game start";
      if (idx === this.state.stepNumber) {
        return (
          <li key={idx}>
            <button onClick={() => this.jumpTo(idx)}>
              <b>{desc}</b>
            </button>
          </li>
        );
      } else {
        return (
          <li key={idx}>
            <button onClick={() => this.jumpTo(idx)}>{desc}</button>
          </li>
        );
      }
    });

    let olMove = <ol>{moves}</ol>;
    if (!this.state.sortHistoryAscending) {
      moves.reverse();
      olMove = <ol reversed>{moves}</ol>;
    }

    let status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    if (winner) {
      if (winner[0] === -1) status = "Draw!";
      else status = "Winner: " + current.squares[winner[0]];
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerSquares={winner ? winner : []}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>{sortButton}</div>
          <div>{olMove}</div>
        </div>
      </div>
    );
  }
}

export default Game;
