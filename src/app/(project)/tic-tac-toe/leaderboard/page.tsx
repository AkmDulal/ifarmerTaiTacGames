"use client"
import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { resetLeaderboard } from '@/store/features/ticTacToe/slice';
import Button from '@/components/common/Button';
import Link from 'next/link';

interface Player {
  id: string;
  name: string;
  score: number;
  symbol: 'X' | 'O';
  wins: number;
}


const LeaderboardPage = () => {
  const dispatch = useAppDispatch();
  const { leaderboard } = useAppSelector((state: { ticTacToe: { leaderboard: Player[] } }) => state.ticTacToe);
  console.log(leaderboard, "leaderboardleaderboard");
  


  const handleResetLeaderboard = () => {
    if (confirm('Are you sure you want to reset the leaderboard? This cannot be undone.')) {
      dispatch(resetLeaderboard());
    }
  };

  return (
    <div className="min-h-screen games  bg-[#f0f0f0] flex flex-col items-center justify-center">

      <div className=" w-[60%]  rounded-lg ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Leaderboard</h1>
          <div className="flex space-x-2">
            <Button
              onClick={handleResetLeaderboard}
              className="bg-red-500 hover:bg-red-600 text-sm py-1 px-3"
              disabled={leaderboard.length === 0}
            >
              Reset
            </Button>
          </div>
        </div>

        {leaderboard.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">No games played yet!</p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Start New Game
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Player
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Symbol
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaderboard.map((player, index) => (
                    <tr key={player.id}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {player.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`font-bold ${player.symbol === 'X' ? 'text-blue-600' : 'text-red-600'}`}>
                          {player.symbol}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900">
                        {player.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between">
              <Link href="/">
                <Button className="bg-green-600 hover:bg-green-700">
                  New Game
                </Button>
              </Link>
              <Link href="/products/list">
                <Button className="bg-gray-600 hover:bg-gray-700">
                  Go to Products
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;










