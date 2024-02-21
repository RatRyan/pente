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

    tileSize.value =
      Math.round((height.value - height.value * 0.3) / size) + 'px';
    board.value = newBoard;
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

  function isWithinBounds(x: number, y: number): boolean {
    return x >= 0 && x < boardSize.value && y >= 0 && y < boardSize.value;
  }

  function isOppositeColor(tile: Tile, stoneColor: Tile): boolean {
    return tile === (stoneColor === Tile.Black ? Tile.White : Tile.Black);
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
      if (!isWithinBounds(currentCol, currentRow)) return;
      if (board.value[currentCol][currentRow] !== stoneColor) break;

      // If all checks pass, increment the counter
      count++;
    }

    if (count === 5) {
      winner.value = stoneColor === Tile.Black ? 'player' : 'computer';
    }
  }

  function checkForCapture(col: number, row: number) {
    // Nested for loop for checking cardinals + intercardinals
    for (let y = -1; y < 2; y++) {
      for (let x = -1; x < 2; x++) {
        checkCapture(col, row, x, y);
      }
    }
  }

  function checkCapture(col: number, row: number, xDir: number, yDir: number) {
    const stoneColor = board.value[col][row];
    const oppositeColor = stoneColor === Tile.Black ? Tile.White : Tile.Black;

    const firstX = col + 1 * xDir;
    const firstY = row + 1 * yDir;
    const secondX = col + 2 * xDir;
    const secondY = row + 2 * yDir;

    if (!isWithinBounds(firstX, firstY)) return;
    if (!isWithinBounds(secondX, secondY)) return;

    if (
      board.value[firstX][firstY] == oppositeColor &&
      board.value[secondX][secondY] == oppositeColor
    ) {
      if (board.value[col + 3 * xDir][row + 3 * yDir] == stoneColor) {
        board.value[firstX][firstY] = Tile.Empty;
        board.value[secondX][secondY] = Tile.Empty;
        stoneColor == Tile.Black
          ? (playerCaptures.value += 2)
          : (computerCaptures.value += 2);
      }
    }
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
    if (playerCaptures.value === 10) {
      winner.value = 'player';
      return;
    }
    if (computerCaptures.value === 10) {
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
