interface SquareProps {
  value: string | null;
  isWinnerSquare: boolean;
  onClick: () => void;
}

const Square = (props: SquareProps) => {
  return (
    <button
      className={"square" + (props.isWinnerSquare ? " square-highlight" : "")}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Square;
