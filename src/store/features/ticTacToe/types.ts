export interface Player {
  id: string;
  name: string;
  score: number;
  symbol: 'X' | 'O';
  wins: number;
}

export interface GameState {
  board: (string | null)[];
  currentPlayer: 'X' | 'O';
  players: Player[];
  round: number;
  gameOver: boolean;
  winner: Player | null;
  draw: boolean;
  leaderboard: Player[];
}

export interface PlayerSetupData {
  player1Name: string;
  player2Name: string;
}