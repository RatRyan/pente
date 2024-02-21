import { useWindowSize } from '@vueuse/core';
import { useState } from 'nuxt/app';

const { height } = useWindowSize();

export function useGame() {
  enum Tile {
    Empty = 'empty.png',
    Black = 'black.png',
    White = 'white.png',
  }

  const board = useState<Tile[][]>('board', () => []);
  const boardSize = useState('boardSize', () => 19);
  const tileSize = useState('tileSize', () => '');
  const playerCaptures = useState('playerCaptures', () => 0);
  const computerCaptures = useState('computersCaptures', () => 0);
  const gameStarted = useState('gameStarted', () => false);
  const winner = useState<'player' | 'computer' | null>('winner', () => null);

  function setupBoard(size: number) {
    const newBoard: Tile[][] = [];
    for (let i = 0; i < size; i++) {
      newBoard[i] = [];
      for (let j = 0; j < size; j++) {
        newBoard[i][j] = Tile.Empty;
      }
    }
    board.value = newBoard;
    tileSize.value =
      Math.round((height.value - height.value * 0.3) / size) + 'px';

    boardSize.value = size;
    const center = size / 2 - 0.5;
    board.value[center][center] = Tile.White;
  }

  function placeStone(x: number, y: number) {
    if (board.value[x][y] != Tile.Empty) return;

    // Place player stone
    board.value[x][y] = Tile.Black;

    // Computer randomly chooses a tile
    while (true) {
      const x = Math.floor(Math.random() * boardSize.value);
      const y = Math.floor(Math.random() * boardSize.value);

      if (board.value[x][y] == Tile.Empty) {
        board.value[x][y] = Tile.White;
        break;
      }
    }

    checkForCapture(x, y);
    checkForWin();
  }

  function checkLineWin(col: number, row: number) {
    checkLine(col, row, 1, 0); // Horizontal
    checkLine(col, row, 0, 1); // Vertical
    checkLine(col, row, 1, 1); // First Diagonal
    checkLine(col, row, 1, -1); // Second Diagonal
  }

  function checkLine(col: number, row: number, xDir: number, yDir: number) {
    let stoneColor = board.value[col][row];
    let count = 0;

    for (let i = 0; i < 5; i++) {
      // Get the next column to check by adding 1 to the current column
      // and then multiplying it by the direction to navigate in
      const currentCol = col + i * xDir;
      const currentRow = row + i * yDir;

      // Checks for in-bounds and same stones are the same color
      if (currentCol < 0 || currentCol >= boardSize.value) break;
      if (currentRow < 0 || currentRow >= boardSize.value) break;
      if (board.value[currentCol][currentRow] !== stoneColor) break;

      // If all checks pass, increment the counter
      count++;
    }

    if (stoneColor === Tile.Black && count > 1) {
      console.log(`Found ${count} in a line`);
    }
    if (count === 5) {
      winner.value = stoneColor === Tile.Black ? 'player' : 'computer';
    }
  }

  function checkForCapture(col: number, row: number) {
    checkCapture(col, row, 1, 0); // Right
    checkCapture(col, row, -1, 0); // Left
    checkCapture(col, row, 0, 1); // Down
    checkCapture(col, row, 0, -1); // Up
  }

  function checkCapture(col: number, row: number, xDir: number, yDir: number) {
    let stoneColor = board.value[col][row];
  }

  function checkForWin() {
    // Check for a line win
    for (let i = 0; i < boardSize.value; i++) {
      for (let j = 0; j < boardSize.value; j++) {
        if (board.value[i][j] != Tile.Empty) {
          checkLineWin(i, j);
        }
      }
    }

    // Check for a capture win
    if (playerCaptures.value === 5) {
      winner.value = 'player';
      return;
    }
    if (computerCaptures.value === 5) {
      winner.value = 'computer';
      return;
    }
  }

  return {
    Tile,
    tileSize,
    board,
    gameStarted,
    playerCaptures,
    computerCaptures,
    setupBoard,
    placeStone,
    winner,
    boardSize,
  };
}
