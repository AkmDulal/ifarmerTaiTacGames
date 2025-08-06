import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, Player, PlayerSetupData } from './types';

const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  players: [
    { id: '1', name: '', score: 0, symbol: 'X', wins: 0 },
    { id: '2', name: '', score: 0, symbol: 'O', wins: 0 },
  ],
  round: 1,
  gameOver: false,
  winner: null,
  draw: false,
  leaderboard: [],
};

const winningPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6], // diagonals
];

const checkWinner = (board: (string | null)[]): string | null => {
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const checkDraw = (board: (string | null)[]): boolean => {
  return board.every(cell => cell !== null);
};

const ticTacToeSlice = createSlice({
  name: 'ticTacToe',
  initialState,
  reducers: {
    initializePlayers: (state, action: PayloadAction<PlayerSetupData>) => {
      const { player1Name, player2Name } = action.payload;
      state.players[0].name = player1Name;
      state.players[1].name = player2Name;
      state.round = 1;
      state.gameOver = false;
      state.winner = null;
      state.draw = false;
    },
    makeMove: (state, action: PayloadAction<number>) => {
      if (state.gameOver) return;

      const index = action.payload;
      if (state.board[index] !== null) return;

      const currentPlayerSymbol = state.currentPlayer;
      state.board[index] = currentPlayerSymbol;

      const winnerSymbol = checkWinner(state.board);
      const isDraw = checkDraw(state.board);

      if (winnerSymbol) {
        const winnerPlayer = state.players.find(p => p.symbol === winnerSymbol)!;
        const loserPlayer = state.players.find(p => p.symbol !== winnerSymbol)!;

        winnerPlayer.score += 2;
        winnerPlayer.wins += 1;
        loserPlayer.score += 1;

        state.winner = winnerPlayer;
        state.gameOver = true;

        // Check if game is over (best of 5)
        if (winnerPlayer.wins >= 3 || state.round >= 5) {
          state.leaderboard = [...state.players].sort((a, b) => b.score - a.score);
        }
      } else if (isDraw) {
        state.draw = true;
        state.gameOver = true;

        if (state.round >= 5) {
          state.leaderboard = [...state.players].sort((a, b) => b.score - a.score);
        }
      } else {
        state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
      }
    },
    nextRound: (state) => {
      if (state.round >= 5) return;

      state.board = Array(9).fill(null);
      state.currentPlayer = state.round % 2 === 1 ? 'X' : 'O';
      state.round += 1;
      state.gameOver = false;
      state.winner = null;
      state.draw = false;
    },
    resetGame: (state) => {
  state.board = Array(9).fill(null);
  state.currentPlayer = 'X';
  state.players.forEach(player => {
    player.score = 0;
    player.wins = 0;
  });
  state.round = 1;
  state.gameOver = false;
  state.winner = null;
  state.draw = false;
},
    resetBoard: (state) => {
      state.board = Array(9).fill(null);
      state.currentPlayer = state.round % 2 === 1 ? 'X' : 'O';
      state.gameOver = false;
      state.winner = null;
      state.draw = false;
    },
    updateLeaderboard: (state, action: PayloadAction<Player[]>) => {
      state.leaderboard = action.payload;
    },
    resetLeaderboard: (state) => {
      state.leaderboard = [];
    },
  },
});

export const {
  initializePlayers,
  makeMove,
  nextRound,
  resetGame,
  resetBoard,
  updateLeaderboard,
  resetLeaderboard,
} = ticTacToeSlice.actions;

export default ticTacToeSlice.reducer;