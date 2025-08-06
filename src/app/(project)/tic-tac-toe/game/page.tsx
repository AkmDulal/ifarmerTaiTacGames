
"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { nextRound, resetBoard, resetGame } from '@/store/features/ticTacToe/slice';
import Board from '@/components/featchers/ticTacToe/Board';
import ScoreDisplay from '@/components/featchers/ticTacToe/ScoreDisplay';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

const GamePage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    players,
    currentPlayer,
    round,
    gameOver,
    winner,
    draw,
  } = useAppSelector((state) => state.ticTacToe);

  const currentPlayerName = players.find((p: { symbol: string; }) => p.symbol === currentPlayer)?.name;

  const handleNextRound = () => {
    if (round >= 5) {
      router.push('/tic-tac-toe/result');
    } else {
      dispatch(nextRound());
    }
  };

  const handleResetGame = () => {
    dispatch(resetGame());
    router.push('/');
  };

  return (
    <div className="min-h-screen games  bg-[#f0f0f0] flex flex-col items-center justify-center">

      <div className=" w-[60%]  rounded-lg ">
      <ScoreDisplay />
      
      <div className="text-center my-4">
        <p className="text-lg">
          Round: <span className="font-bold">{round}/5</span>
        </p>
        {!gameOver && (
          <p className="text-lg">
            Current Turn: <span className="font-bold">{currentPlayerName}</span>
          </p>
        )}
        {winner && (
          <p className="text-xl font-bold text-green-600">
            {winner.name} wins this round!
          </p>
        )}
        {draw && (
          <p className="text-xl font-bold text-yellow-600">Its a draw!</p>
        )}
      </div>
      
      <Board />
      
      <div className="flex flex-col space-y-2 mt-6">
        {gameOver && round < 5 && (
          <Button
            onClick={handleNextRound}
            className="bg-green-600 hover:bg-green-700"
          >
            Next Round
          </Button>
        )}
        {gameOver && round >= 5 && (
          <Button
            onClick={() => router.push('/tic-tac-toe/result')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            View Final Results
          </Button>
        )}
        {!gameOver && (
          <Button
            onClick={() => dispatch(resetBoard())}
            className="bg-yellow-500 hover:bg-yellow-600"
          >
            Reset Current Round
          </Button>
        )}
        <Button
          onClick={handleResetGame}
          className="bg-red-500 hover:bg-red-600"
        >
          Reset Entire Game
        </Button>
      </div>

      </div>

      
    </div>
  
  );
};

export default GamePage;