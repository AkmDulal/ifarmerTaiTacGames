"use client"
import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { resetGame } from '@/store/features/ticTacToe/slice';
import Button from '@/components/common/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Player {
  id: string;
  name: string;
  score: number;
  symbol: 'X' | 'O';
  wins: number;
}


const ResultPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { leaderboard } = useAppSelector((state: { ticTacToe: { leaderboard: Player[] } }) => state.ticTacToe);

  const winner = leaderboard[0].wins > leaderboard[1].wins ? leaderboard[0] : 
                 leaderboard[1].wins > leaderboard[0].wins ? leaderboard[1] : null;

                 console.log(winner, "winnerwinnerwinnerwinner");
                 

  const handleRestartMatch = () => {
    dispatch(resetGame());
    router.push('/tic-tac-toe/game');
  };

  return (
    <div className="min-h-screen games  bg-[#f0f0f0] flex flex-col items-center justify-center">

      <div className=" w-[60%]  rounded-lg ">
        <h1 className="text-2xl font-bold text-center mb-6">Game Results</h1>

        {winner ? (
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-2">Winner!</h2>
            <p className={`text-2xl text-white font-bold`}>
              {winner?.name} ({winner.symbol})  
            </p>
          </div>
        ) : (
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-2">It s a Draw!</h2>
            <p className="text-gray-700">Both players performed equally well.</p>
            888888
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Final Scores</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {leaderboard.map((player) => (
              <div key={player.id} className="bg-gray-100 p-3 rounded-md">
                <h4 className={`font-bold ${player.symbol === 'X' ? 'text-blue-600' : 'text-red-600'}`}>
                  {player.name} ({player.symbol})
                </h4>
                <p className='text-gray-700'>Total Score: {player.score}</p>
                <p className='text-gray-700'>Rounds Won: {player.wins}</p>
              </div>
            ))}
          </div>
        </div>

        {leaderboard.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Leaderboard</h3>
            <ul className="space-y-2">
              {leaderboard.map((player, index) => (
                <li key={player.id} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                  <span>
                    <span className="font-medium text-gray-700">{index + 1}. {player.name}</span>
                    <span className="text-gray-600 ml-2 text-gray-700">({player.symbol})</span>
                  </span>
                  <span className="font-bold text-gray-700">{player.score} pts</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col space-y-3">
          <Button
            onClick={handleRestartMatch}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Play Again with Same Players
          </Button>
          <Link href="/">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Start New Match with Different Players
            </Button>
          </Link>
          <Link href="/tic-tac-toe/leaderboard">
            <Button className="w-full bg-gray-600 hover:bg-gray-700">
              View Leaderboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;