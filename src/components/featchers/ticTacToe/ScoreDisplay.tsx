
import { useAppSelector } from '@/store/hooks';

interface Player {
  id: string;
  name: string;
  score: number;
  symbol: 'X' | 'O';
  wins: number;
}

const ScoreDisplay = () => {
  const { players, round } = useAppSelector((state: { ticTacToe: { players: Player[], round: number } }) => state.ticTacToe);

  return (
    <div className="bg-gray-100 p-4 rounded-md mb-4">
      <h2 className="text-lg text-gray-700 font-semibold mb-2">Scores (Round {round}/5)</h2>
      <div className="grid grid-cols-2 gap-4">
        {players.map((player) => (
          <div key={player.id} className="bg-white p-3 rounded-md shadow-sm">
            <h3 className={`font-bold ${player.symbol === 'X' ? 'text-blue-600' : 'text-red-600'}`}>
              {player.name} ({player.symbol})
            </h3>
            <p className="text-gray-700">Score: {player.score}</p>
            <p className="text-gray-700">Wins: {player.wins}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreDisplay;