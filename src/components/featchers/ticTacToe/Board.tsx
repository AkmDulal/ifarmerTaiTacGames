
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { makeMove } from '@/store/features/ticTacToe/slice';
import Cell from './Cell';

type CellValue = "X" | "O" | null;

interface TicTacToeState {
  board: CellValue[];
  gameOver: boolean;
}

const Board = () => {
  const dispatch = useAppDispatch();
  const { board, gameOver } = useAppSelector(
    (state: { ticTacToe: TicTacToeState }) => state.ticTacToe
  );

  const handleCellClick = (index: number) => {
    if (!gameOver) {
      dispatch(makeMove(index));
    }
  }; 

  return (
    <div className="grid grid-cols-3 gap-2 w-64 h-64 mx-auto my-6">
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => handleCellClick(index)}
          disabled={gameOver || cell !== null}
        />
      ))}
    </div>
  );
};

export default Board;