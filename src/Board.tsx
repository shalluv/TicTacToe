import React from "react";
import Square from "./Square";

interface BoardProps {
  squares: Array<string | null>;
  winnerSquares: Array<number>;
  onClick: (i: number) => void;
}

interface BoardState {
  squares: Array<string>;
  winnerSquares: Array<number>;
}

class Board extends React.Component<BoardProps, BoardState> {
  constructor(props: BoardProps) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      winnerSquares: [],
    };
  }

  renderSquare(i: number) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        isWinnerSquare={this.props.winnerSquares.includes(i)}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const board = Array.from(Array(3), (_, i) => {
      return (
        <div key={i} className="board-row">
          {Array.from(Array(3), (_, j) => {
            return this.renderSquare(i * 3 + j);
          })}
        </div>
      );
    });
    return <div>{board}</div>;
  }
}

export default Board;
